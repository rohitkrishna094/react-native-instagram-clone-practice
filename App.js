import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './components/auth/Landing';
import firebase from 'firebase';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';
import Main from './components/main/Main';
import { Provider } from 'react-redux';
import Add from './components/main/Add';
import Save from './components/main/Save';
import { LogBox } from 'react-native';
import { firebaseConfig } from './firebaseConfig';

LogBox.ignoreLogs(['Setting a timer']);
const store = createStore(rootReducer, applyMiddleware(thunk));

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) this.setState({ loggedIn: false, loaded: true });
      else this.setState({ loggedIn: true, loaded: true });
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;

    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={Main} />
            {/* <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} /> */}
            <Stack.Screen name="Add" component={Add} navigation={this.props.navigation} />
            <Stack.Screen name="Save" component={Save} navigation={this.props.navigation} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
