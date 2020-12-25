import React, { Component } from 'react';
import { Button, TextInput, View } from 'react-native';
import firebase from 'firebase';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onSignUp = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => console.log(result))
      .catch((err) => console.log('hello', err));
  };

  render() {
    return (
      <View style={{ marginTop: 100 }}>
        <TextInput placeholder="email" onChangeText={(email) => this.setState({ email })} />
        <TextInput placeholder="password" onChangeText={(password) => this.setState({ password })} secureTextEntry={true} />
        <Button onPress={() => this.onSignUp()} title="Sign In" />
      </View>
    );
  }
}

export default Login;
