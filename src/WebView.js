import React from 'react';
import { StyleSheet, WebView } from 'react-native';

export default class WebV extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <WebView
        automaticallyAdjustContentInsets={true}
        javaScriptEnabledAndroid={true}
        scalesPageToFit={true}
        startInLoadingState={true}
        style={styles.webView}
        url={this.props.url}
      />
    );
  }
};

var styles = StyleSheet.create({
  webView: {
    flex: 1,
  }
});
