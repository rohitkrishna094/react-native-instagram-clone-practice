import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserFollowing, fetchUser, fetchUserPosts } from '../../redux/actions';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feed from './Feed';
import Profile from './Profile';
import Search from './Search';
import firebase from 'firebase';

const Tab = createMaterialBottomTabNavigator();

const Empty = () => {
  return null;
};

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchUserPosts();
    this.props.fetchUserFollowing();
  }

  render() {
    return (
      <Tab.Navigator initialRouteName="Feed" labeled={false}>
        <Tab.Screen
          name="Feed"
          component={Feed}
          options={{
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          navigation={this.props.navigation}
          options={{
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="magnify" color={color} size={26} />,
          }}
        />
        <Tab.Screen
          name="AddContainer"
          component={Empty}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('Add');
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="plus-box" color={color} size={26} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('Profile', { uid: firebase.auth().currentUser.uid });
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-circle" color={color} size={26} />,
          }}
        />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = (state) => ({ currentUser: state.userState.currentUser });
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUser, fetchUserPosts, fetchUserFollowing }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
