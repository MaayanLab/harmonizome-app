import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, Dimensions, Image, ListView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import LibraryList from './LibraryList';
import NavBar from './NavBar';
import { colorBackground, colorBorderBottom, colorBorderSide, colorBorderTop, fontFamily } from './StyleVars';

var lastResult = [];
var windowDim = Dimensions.get('window');
var smallHeight = windowDim.width < 325;

export default class Results extends React.Component {
  static propTypes = {
    gene: PropTypes.string,
    useLastResult: PropTypes.bool,
  }

  constructor(props) {
    super(props)

    this.state = {
      networkError: false,
      resultsLoaded: false,
      categoryDataSrc: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
    }
  }

  componentWillMount() {
    if (this.props.useLastResult) {
      this.setState({
        resultsLoaded: true,
        categoryDataSrc: this.state.categoryDataSrc.cloneWithRows(lastResult)
      });
    } else {
      this._getGSLibraries(this.props.gene);
    }
  }

  render() {
    if (this.state.networkError) {
      return (
        <View style={styles.centerWrapper}>
          <Image
            source={require('./img/hazard.png')}
            resizeMode={'contain'}
            style={styles.errorIcon}
          />
          <Text style={styles.errorText}>No Network Connection</Text>
          <TouchableOpacity
            style={styles.errorButton}
            onPress={() => { this._getGSLibraries(this.props.gene); }}>
            <Text style={styles.bold}>Try Again?</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (!this.state.resultsLoaded) {
      return (
        <View style={styles.centerWrapper}>
          <ActivityIndicator
            animating={true}
            color='#808080'
            size='large' />
        </View>
      );
    } else {
      return (
        <ListView
          dataSource={this.state.categoryDataSrc}
          renderRow={this._renderCategories}
          style={styles.listView}
          contentContainerStyle={styles.listViewContainer}
          automaticallyAdjustContentInsets={false}
        />
      );
    }
  }

  _renderCategories = (catObj) => {
    var icons = {
      'Cell Types': require('./img/cell_types.png'),
      Crowd: require('./img/crowd.png'),
      'Disease/Drugs': require('./img/drugs.png'),
      Legacy: require('./img/legacy.png'),
      Misc: require('./img/misc.png'),
      Ontologies: require('./img/ontologies.png'),
      Pathways: require('./img/pathways.png'),
      Transcription: require('./img/dna.png'),
    };
    return (
      <View style={styles.rowWrapper}>
        <TouchableHighlight onPress={() => this._goToLibraries(catObj)}>
          <View style={styles.rowInner}>
            <Image
                source={icons[catObj.type]}
                resizeMode={'contain'}
                style={styles.optionIcon}
              />
            <Text style={styles.option}>
              {catObj.type}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  _goToLibraries = (categoryObj) => {
    this.props.navigator.push({
      name: 'Library List',
      component: LibraryList,
      passProps: {
        gene: this.props.gene,
        categoryObj: categoryObj
      },
      navigationBar: (
        <NavBar
          gene={this.props.gene}
          category={categoryObj.type}
        />
      )
    });
  }

  _getGSLibraries = (inputGene) => {
    var _this = this;
    var termsUrl = 'http://amp.pharm.mssm.edu/ha-libraries/results?' +
      'gene=' + inputGene;
    fetch(termsUrl)
      .then((tResponse) => tResponse.json())
      .then((response) => {
        lastResult = response;
        _this.setState({
          networkError: false,
          resultsLoaded: true,
          categoryDataSrc: this.state.categoryDataSrc.cloneWithRows(response)
        });
      })
      .catch((err) => {
        console.log(err);
        _this.setState({ networkError: true });
      })
      .done();
  }
};

var styles = StyleSheet.create({
  bold: {
    fontFamily: fontFamily,
    fontWeight: 'bold',
  },
  errorIcon: {
    height: 42,
    width: 60,
  },
  centerWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorButton: {
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 5,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    borderWidth: 1,
    borderColor: colorBorderSide,
    borderTopColor: colorBorderTop,
    borderBottomColor: colorBorderBottom,
  },
  errorText: {
    fontFamily: fontFamily,
    marginTop: 5,
  },
  listView: {
    backgroundColor: colorBackground,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  listViewContainer: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: colorBackground,
  },
  option: {
    marginTop: 10,
    fontFamily: fontFamily,
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionIcon: {
    height: 100,
    width: 100,
  },
  rowWrapper: {
    marginTop: 5,
    height: 155,
    width: (windowDim.width - 11) / 2,
    marginBottom: 10,
  },
  rowInner: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: colorBorderSide,
    borderTopColor: colorBorderTop,
    borderBottomColor: colorBorderBottom,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 20,
  }
});

