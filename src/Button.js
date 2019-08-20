import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { fontFamily } from './StyleVars';


export default class Button extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false,
    }
  }

  _onHighlight = () => {
    this.setState({active: true});
  }

  _onUnhighlight = () => {
    this.setState({active: false});
  }

  render() {
    var colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[styles.button, this.props.style]}>
          <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
};

var styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: fontFamily,
    margin: 5,
    textAlign: 'center',
  },
});
