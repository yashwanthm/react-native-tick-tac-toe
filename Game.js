import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Button, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const GRID_LENGTH = 3;
let turn = 'X';

const colors = {
  primary1: "red",
  primary2: "blue",
  dark: "#333",
  white: '#fff',
  black: "#000"
}

const makeWinningLines = GRID_LENGTH => {
  let d1 = [];
  let d2 = [];
  let rows = [];
  let cols = [];
  for (let i = 0; i < GRID_LENGTH; i++) {
    for (let j = 0; j < GRID_LENGTH; j++) {
      //diagonals
      if (i == j) {
        d1.push([i, j]);
      }
      if (i == GRID_LENGTH - j - 1) {
        d2.push([i, j]);
      }

      //rows
      if (!rows[i]) {
        rows[i] = [];
      }
      rows[i].push([i, j]);

      //cols
      if (!cols[i]) {
        cols[i] = [];
      }
      cols[i].push([GRID_LENGTH - j - 1, i]);
    }
  }
  return [d1, d2, ...rows, ...cols];
};

const winningLines = makeWinningLines(GRID_LENGTH);

const calculateWinner = grid => {
  for(var i=0; i<winningLines.length; i++){
    let sample = grid[winningLines[i][0][0]][winningLines[i][0][1]];
    let isSampleWinner = true; 
    for(var j = 0; j<winningLines[i].length; j++){
      if(sample != grid[winningLines[i][j][0]][winningLines[i][j][1]]){
        isSampleWinner = false;
      }
    }
    if(isSampleWinner && sample){
      return sample;
    }
  }
};

const Game = () => {
  const [grid, setGrid] = useState([]);
  const [isXNext, setIsXNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const reset = () => {
    setStepNumber(0);
    setIsXNext(true);
    initializeGrid();
  }
  const initializeGrid = () => {
    const tempGrid = [];
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
      const tempArray = [];
      for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
        tempArray.push(0);
      }
      tempGrid.push(tempArray);
    }
    setGrid(tempGrid);
  };

  const handleMove = (index, colIdx, rowIdx) => {
    let gridValueMap = {
      X: 1,
      O: 2,
    };
    let nextGrid = grid.slice();
    if(calculateWinner(nextGrid)){
      return;
    }
    if(!nextGrid[colIdx][rowIdx]){
      nextGrid[colIdx][rowIdx] = isXNext ? 1: 2;
    }
    setIsXNext(!isXNext);
    setGrid(nextGrid);
    setStepNumber(stepNumber + 1);
  };

  const renderStatus = () => {
    const winner = calculateWinner(grid.slice());
    console.log('winner is ', winner);
    const declareTie = stepNumber === Math.pow(GRID_LENGTH, 2);
    let status = `Next turn : ${isXNext ? 'Player 1' : 'Player 2'}`;
    if (declareTie) {
      status = 'The game ends as a draw. Start Over!';
    }
    if (winner) {
      status = `Player ${winner} has won`;
    }
    if(stepNumber === 0){
      status = `Start by pressing on the grid. The first player to press gets X`
    }
    return (
      <View style={styles.status}>
        <Text>{status}</Text>
      </View>
    );
  };
  
  const getBox = (index, colIdx, rowIdx) => {
    let backgroundColor = colors.primary1;
    const sum = colIdx + rowIdx;
    if (sum % 2 === 0) {
      backgroundColor = colors.primary2;
    }
    const gridValue = grid[colIdx][rowIdx];
    let content = '-';
    if (gridValue === 1) {
      content = 'X';
    } else if (gridValue === 2) {
      content = 'O';
    }
    return (
      <TouchableOpacity
        onPress={e => {
          handleMove(index, colIdx, rowIdx);
        }}
        key={index}
        style={{
          backgroundColor, 
          ...styles.boxStyle }}>
        <Text style={styles.boxContent}>{content}</Text>
      </TouchableOpacity>
    );
  };
  
  
  const getRow = (row, colIdx) => {
    return row.map((item, index) => {
      return getBox(index, colIdx, index);
    });
  };

  const getColumns = () => {
    return grid.map((row, index) => {
      return (
        <View style={styles.rowStyle} key={index}>
          {getRow(row, index)}
        </View>
      );
    });
  };

  const renderMainGrid = () => {
    console.log(grid);
    return (
      <View style={styles.gameContainer}>
        {renderStatus()}
        <View style={styles.columnsStyle}>{getColumns()}</View>
        <Button onPress={e=>{reset()}} title="Reset Game"/>
      </View>
    );
  };

  useEffect(() => {
    initializeGrid();
  }, []);

  if (grid.length === 0) {
    return <Text> initializing </Text>;
  }
  return renderMainGrid();
};

const styles = StyleSheet.create({
  columnsStyle: {
    flexDirection: 'column',
    // flex: 1,
    // borderColor: '#ddd'
  },
  rowStyle: {
    flexDirection: 'row',
    // flex: 1,
    // justifyContent: 'space-between'
  },
  boxStyle: {
    borderWidth: 1,
    borderColor: '#ddd',
    // flex: 1,
    width: 72,
    height: 72,
    alignItems: 'center', 
    justifyContent: 'space-around'
  },
  boxContent: {
    color: colors.white,
    fontSize: 24
  },
  status: {
    height: 72,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  gameContainer: {
    flex: 1, alignItems : 'center'
  }

});

export default Game;
