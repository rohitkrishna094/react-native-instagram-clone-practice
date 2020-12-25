import React, { Component } from 'react';
import { Button, TextInput, View } from 'react-native';
import firebase from 'firebase';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
    };
    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp = () => {
    const { email, password, name } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({ name, email });
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <View style={{ marginTop: 100 }}>
        <TextInput placeholder="name" onChangeText={(name) => this.setState({ name })} />
        <TextInput placeholder="email" onChangeText={(email) => this.setState({ email })} />
        <TextInput placeholder="password" onChangeText={(password) => this.setState({ password })} secureTextEntry={true} />
        <Button onPress={() => this.onSignUp()} title="Sign Up" />
      </View>
    );
  }
}

export default Register;
