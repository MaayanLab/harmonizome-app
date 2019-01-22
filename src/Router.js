import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import GeneModal from './GeneModal';
import Home from './Home';

export default class Router extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.os === 'android') {
      DEVICE_IS_ANDROID = true;
    }
  }

  render() {
    var _this = this;
    return (
      <Navigator
        style={styles.nav}
        initialRoute={{
          name: 'Home',
          component: Home
        }}
        configureScene={this._configureScene}
        renderScene={this._renderScene}
      />
    );
  }

  _configureScene = (route) => {
    return route.configureScene
    ? route.configureScene
    : Navigator.SceneConfigs.FloatFromRight;
  }

  _renderScene = (route, navigator) => {
    var Component = route.component;
    var navBar = route.navigationBar;
    var modal = route.modal;
    var routeProps = route.passProps;
    var os = this.props.os;

    if (navBar) {
      navBar = React.cloneElement(navBar, {
        navigator, route, os,
      });
    }

    return (
      <View style={{ flex: 1 }}>
        {navBar}
        <Component
          {...routeProps}
          os={this.props.os}
          navigator={navigator}
          route={route}
        />
        { route.modalVisible
          ? <GeneModal
              navigator={navigator}
              gene={route.gene}
              os={this.props.os}
              onClose={() => {

                navigator.replace(
                  Object.assign(
                    {},
                    route,
                    {
                      passProps: {
                        ...routeProps,
                        useLastResult: true,
                      },
                      modalVisible: false
                    }
                  )
                );
              }}
            />
          : null
        }
      </View>
    );
  }
};

var styles = StyleSheet.create({
  nav: {
    flex: 1,
    borderBottomWidth: 0
  }
});
