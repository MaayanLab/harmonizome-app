import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import AutoComplete from './Autocomplete';
import CategoryList from './CategoryList';
import NavBar from './NavBar';
import { addSearch } from './recentSearches';
import { colorBackground, colorBorderBottom, colorBorderSide, colorBorderTop, colorDarkGray, colorPrimary, fontFamily, titleFontAndroid, titleFontIOS } from './StyleVars';

var windowDim = Dimensions.get('window');
var smallScreen = windowDim.height < 500;

export default class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      input: '',
      atHome: true
    }
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.atHome ?
            <View style={styles.titleContainer}>
              {<Image
                source={require('./img/logo_lg.png')}
                resizeMode={'contain'}
                style={styles.titleIcon}
              />}
              <Text style={[
                styles.title,
                { fontFamily: this.props.os === 'ios'
                  ? titleFontIOS
                  : titleFontAndroid}
              ]}>
                Harmonizome
              </Text>
            </View>
          :
            null
        }
        <View style={[
          styles.searchWrapper,
          { flex: this.state.atHome ? 1 : 0 },
          { justifyContent: this.state.atHome ? 'flex-start' : 'center' },
        ]}>
          <View
            style={[
              styles.searchContainer,
              { backgroundColor: this.state.atHome ? colorBackground : 'white' },
              { borderWidth: this.state.atHome ? 0 : 1 },
              { alignItems: this.state.atHome ? 'flex-start' : 'center' },
              { shadowOpacity: this.state.atHome ? 0 : .8 },
            ]}>
            <TextInput
              ref="geneSearchBar"
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
              returnKeyType="done"
              style={[
                styles.searchBar,
                { shadowOpacity: this.state.atHome ? .8 : 0 },
              ]}
              onFocus={() => {
                if (smallScreen) {
                  this.setState({
                    atHome: false,
                  });
                }
              }}
              onChangeText={(input) => {
                this.setState({
                  atHome: false,
                  input: input,
                });
              }}
              onSubmitEditing={() => {}}
              value={this.state.input}
              placeholder={'Enter Entrez gene symbol...'}
            />
            { !this.state.atHome ?
                <Text
                  onPress={() => {
                    this.setState({
                      atHome: true,
                      input: '',
                    });
                  }}
                  style={styles.cancel}
                >
                  Cancel
                </Text>
              :
                <View style={styles.cancelPlaceholder}></View>
            }
          </View>
          { this.state.atHome ?
              <Text style={styles.examples}>
                <Text>Examples: </Text>
                <Text style={styles.exOption} onPress={() => {
                  this._goToCategories('TP53');
                }}>TP53</Text>
                <Text>, </Text>
                <Text style={styles.exOption} onPress={() => {
                  this._goToCategories('STAT3');
                }}>STAT3</Text>
                <Text>, </Text>
                <Text style={styles.exOption} onPress={() => {
                  this._goToCategories('CREB1');
                }}>CREB1</Text>
                <Text>, </Text>
                <Text style={styles.exOption} onPress={() => {
                  this._goToCategories('MAPK3');
                }}>MAPK3</Text>
                <Text>, </Text>
                <Text style={styles.exOption} onPress={() => {
                  this._goToCategories('SRC');
                }}>SRC</Text>
              </Text>
            :
              null
            }
        </View>
        { !this.state.atHome ?
            <AutoComplete
              input={this.state.input}
              onSelect={(selectedGene) => {
                this._goToCategories(selectedGene);
              }}
            />
          :
            null
        }
      </View>
    );
  }

  _goToCategories = (inputGene) => {
    this.refs.geneSearchBar.blur();
    this.props.navigator.push({
      name: 'CategoryList',
      component: CategoryList,
      passProps: { gene: inputGene },
      navigationBar: (
        <NavBar
          gene={inputGene}
        />
      )
    });
    addSearch(inputGene);
  }
};

var styles = StyleSheet.create({
  examples: {
    color: colorPrimary,
    fontSize: 16,
    fontFamily: fontFamily,
    textAlign: 'center',
    flex: 1,
  },
  exOption: {
    fontWeight: 'bold',
  },
  cancel: {
    color: colorPrimary,
    fontSize: 16,
    fontFamily: fontFamily,
    textAlign: 'center',
    flex: 1,
  },
  cancelPlaceholder: {
    width: 10,
  },
  container: {
    paddingTop: 25,
    flex: 1,
    backgroundColor: colorBackground
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: colorPrimary,
    fontSize: 36,
    textAlign: 'center',
  },
  titleIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  searchWrapper: {
    flexDirection: 'column',
  },
  searchContainer: {
    borderColor: colorBorderSide,
    borderTopColor: colorBorderTop,
    borderBottomColor: colorBorderBottom,
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    height: 50,
    shadowColor: colorDarkGray,
    shadowOffset: { width: 0, height: 0 },
  },
  searchBar: {
    flex: 3,
    fontFamily: fontFamily,
    marginTop: 5,
    paddingLeft: 15,
    height: 40,
    backgroundColor: 'white',
    shadowColor: colorDarkGray,
    shadowOffset: { width: 0, height: 0 },
  }
});
