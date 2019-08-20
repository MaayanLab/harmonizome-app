import PropTypes from 'prop-types';
import React from 'react';
import { Image, ListView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import NavBar from './NavBar';
import { colorBackground, colorBorderBottom, colorBorderSide, colorBorderTop, colorUrl, fontFamily } from './StyleVars';
import TermList from './TermList';
import WebV from './WebView';

export default class LibraryResults extends React.Component {
  static propTypes = {
    categoryName: PropTypes.string,
    categoryObj: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = {
      libraryDataSrc: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }).cloneWithRows([
        { text: 'Select a library to view its related terms'},
        ...this.props.categoryObj.libraries
      ]),
    }
  }

  render() {
    return (
      <ListView
        dataSource={this.state.libraryDataSrc}
        renderRow={this._renderLibrary}
        style={styles.listView}
        automaticallyAdjustContentInsets={false}
      />
    );
  }

  _goToTerms = (libObj) => {
    this.props.navigator.push({
      name: 'Term List',
      component: TermList,
      passProps: {
        terms: libObj.terms,
        libraryName: libObj.name,
        idName: libObj.idName,
        idRegExp: libObj.idRegExp,
        idRegExpFlag: libObj.idRegExpFlag,
        useFirstTerm: libObj.useFirstTerm,
        splitChar: libObj.splitChar,
        baseUrl: libObj.baseUrl,
        useTermName: libObj.useTermName,
        libraryDesc: libObj.description,
      },
      navigationBar: (
        <NavBar
          gene={this.props.gene}
          category={this.props.categoryObj.name}
          library={libObj.name}
        />
      )
    });
  }

  _goToUrl = (libName, libUrl) => {
    this.props.navigator.push({
      name: 'Library View',
      component: WebV,
      configureScene: Navigator.SceneConfigs.FloatFromBottom,
      passProps: { url: libUrl },
      navigationBar: (
        <NavBar
          useXBtn={true}
          hideInfoBtn={true}
          library={libName}
        />
      )
    });
  }

  _renderLibrary = (libObj) => {
    if (libObj.text && libObj.text.length) {
      return <Text style={styles.libText}>{libObj.text}</Text>;
    }
    return (
      <TouchableOpacity
        style={styles.rowWrapper}
        onPress={() => this._goToTerms(libObj)}>
        <View style={styles.rowInner}>
          <View style={styles.rowInfo}>
            <Text style={[
              styles.libraryTitle,
              { fontSize: libObj.name.length < 30 ? 16 : 15 },
            ]}>
              {libObj.name}
            </Text>
            <Text style={styles.libraryDesc}>
              {libObj.description}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.rowNav}
            onPress={() => this._goToTerms(libObj)}>
            <Image
              source={require('./img/nav_forward.png')}
              resizeMode={'contain'}
              style={{height: 80, width: 20}}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
};

var styles = StyleSheet.create({
  libText: {
    fontFamily: fontFamily,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 0,
  },
  listView: {
    backgroundColor: colorBackground,
    flex: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  rowWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 8,
  },
  rowInfo: {
    flexDirection: 'column',
    flex: 4,
  },
  rowInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: colorBorderSide,
    borderTopColor: colorBorderTop,
    borderBottomColor: colorBorderBottom,
    backgroundColor: 'white',
    padding: 10,
  },
  libraryDesc: {
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: fontFamily,
  },
  libraryTitle: {
    flex: 1,
    fontWeight: 'bold',
    fontFamily: fontFamily,
  },
  gene: {
    fontSize: 13,
    fontFamily: fontFamily,
  },
  rowNav: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  url: {
    fontFamily: fontFamily,
    color: colorUrl,
  }
});
