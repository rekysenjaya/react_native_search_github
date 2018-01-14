import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import {
  selectAction, searchAction, clearAction
} from '../actions/repoActions';
import Row from '../components/Row';
import Header from '../common/Header';

const D = Dimensions.get('window')

const style = {
  row: {
    backgroundColor: 'white',
    padding: 2,
    margin: 1,
    borderWidth: 2,
    borderColor: '#24292e',
    flexDirection: 'column'
  },
  rowImage: {
    padding: 3,
    flexDirection: 'row'
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 5
  },
  full_name: {
    color: '#0366d6',
    fontWeight: '900'
  },
  language: {
    color: '#f1e05a',
    fontWeight: '500'
  },
  description: {
    padding: 3,
    color: '#586069'
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    padding: 12
  },
  buttonColor: {
    backgroundColor: '#586069'
  },
  spinner: {
    color: '#FFF'
  },
  flatList: {
    flex: 1,
    marginHorizontal: 5
  }
}

export class List extends Component {
  constructor(props) {
    super(props);
  }

  handleSelect(selectedRepo) {
    this.props.dispatch(selectAction(selectedRepo));
  }

  handleSearch() {
    if (this.refs.search._lastNativeText !== null && this.refs.search._lastNativeText !== '') {
      this.props.dispatch(searchAction(this.refs.search._lastNativeText));
    }
  }

  handleClear() {
    this.refs.search.clear()
    this.props.dispatch(clearAction())
  }

  render() {
    const { data, loading, selectedRepo } = this.props;

    return (
      <View style={{ flex: 1 }} >
        <Header />
        <Spinner visible={loading} textContent={"Loading..."} textStyle={style.spinner} />
        <View style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          borderBottomColor: 'grey',
          elevation: 2
        }} >
          <TextInput style={{ flex: 1 }} placeholder="Search" ref="search" onBlur={(e) => this.handleSearch()} />
          <TouchableOpacity style={style.buttonColor}
            onPress={() => this.handleClear()}>
            <Text style={style.buttonText} >Clear</Text>
          </TouchableOpacity>
        </View>
        {!loading &&
          <FlatList
            style={style.flatList}
            data={data}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => this.handleSelect(item)}>
                  <View style={style.row}>
                    <View style={style.rowImage} >
                      {(item.owner && item.owner.avatar_url) &&
                        <Image source={{ uri: item.owner.avatar_url }} resizeMode="cover" style={style.image} />
                      }
                      <View>
                        <Text style={style.full_name} >{item.full_name ? item.full_name.length >= 35 ? `${item.full_name.substring(0, 35)}...` : item.full_name : ''}</Text>
                        <Text style={style.language} >{item.language || ''}</Text>
                      </View>
                    </View>
                    <Text style={style.description} >{item.description || ''}</Text>
                  </View>
                </TouchableOpacity>
              )
            }}
            keyExtractor={(item, index) => index}
          />
        }
      </View>
    );
  }
}

/* Subscribe component to redux store and merge the state into component\s props */
const mapStateToProps = (state) => {
  return ({
    data: state.repo.data,
    loading: state.repo.loading,
    selectedRepo: state.repo.selectedRepo
  })
};

/* connect method from react-router connects the component with redux store */
export default connect(mapStateToProps)(List);
