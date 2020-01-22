/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Text, StatusBar, View} from 'react-native';

// import {Colors} from 'react-native/Libraries/NewAppScreen';
const {Colors} = {
  Colors: {
  white: '#fff',
  lighter: '#ddd',
  dark: '#000',
  black: '#333'
  }
  
}
import Game from './Game';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeContainer}>
        <View styles={styles.sectionContainer}>
          <Text style={styles.sectionDescription}>
            Tick Tac Toe Hiver Assignment
          </Text>
          <Game />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  safeContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  sectionContainer: {
    flex: 1,
    marginTop: 50,
    backgroundColor: 'blue',
    paddingHorizontal: 24,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 30,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
