/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Platform } from 'react-native';
import Router from './src/Router';

const platformRouter = Platform.select({
  ios: "ios",
  android: "android",
});

export default class App extends React.Component {
  render() {
    return (
      <Router os={platformRouter} />
    )
  }
}
