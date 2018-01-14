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

export class List extends Component {
  constructor(props) {
    super(props);
  }

  handleSelect(selectedRepo) {
    this.props.dispatch(selectAction(selectedRepo));
  }

  handleSearch() {
    if (this.refs.search._lastNativeText !== null) {
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
        <Spinner visible={loading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        <View style={{ flexDirection: 'row' }} >
          <TextInput style={{ flex: 1 }} placeholder="Search" ref="search" onBlur={(e) => this.handleSearch()} />
          <TouchableOpacity style={{ backgroundColor: '#586069' }}
            onPress={() => this.handleClear()}>
            <View style={{ padding: 12 }} >
              <Text style={{ color: 'white', fontWeight: '600' }} >Clear</Text>
            </View>
          </TouchableOpacity>
        </View>
        {!loading &&
          <FlatList
            style={{ flex: 1, margin: 5 }}
            data={data}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => this.handleClear()}>
                  <View style={{ backgroundColor: 'white', padding: 2, margin: 1, borderWidth: 2, borderColor: '#24292e', flexDirection: 'column' }}>
                    <View style={{ padding: 3, flexDirection: 'row' }} >
                      {(item.owner && item.owner.avatar_url) &&
                        <Image source={{ uri: item.owner.avatar_url }} resizeMode="cover" style={{ width: 40, height: 40, marginRight: 10, borderRadius: 5 }} />
                      }
                      <View>
                        <Text style={{ color: '#0366d6', fontWeight: '900' }} >{item.full_name ? item.full_name.length >= 35 ? `${item.full_name.substring(0, 35)}...` : item.full_name : ''}</Text>
                        <Text style={{ color: '#f1e05a', fontWeight: '500' }} >{item.language || ''}</Text>
                      </View>
                    </View>
                    <Text style={{ padding: 3, color: '#586069' }} >{item.description || ''}</Text>
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
