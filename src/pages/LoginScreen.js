import React, {Component} from "react";
import {
  Container,
  Item,
  Content,
  Input,
  Label,
  Form,
  Button,
  Text,
  Toast
} from 'native-base';
import styles from "../styles/login";
import {LoginUser} from "../Redux/Actions/auth";
import {connect} from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
import jwtdecode from "jwt-decode";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  handleLogin = async() => {
    let data = {
      username: this.state.email,
      password: this.state.password
    }

    await this
      .props
      .dispatch(LoginUser(data));
    const loginUser = await this.props.loginUser;
    let msg = loginUser.LoginUserData.msg

    if (msg === "error") {
      Toast.show({text: loginUser.LoginUserData.errors, type: "danger"})
    } else if (msg === "success") {
      Toast.show({text: "Login Success", type:"success"})
      await AsyncStorage.setItem('@token', loginUser.LoginUserData.data.token);
      this.props.navigation.navigate('Home')
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    
    return (
      <Container style={styles.container}>
        <Content padder>
          <Text style={styles.loginText}>Login As</Text>
          <Text style={styles.loginDesc}>Company or Engineer</Text>
          <Form style={styles.form}>
            <Item floatingLabel style={{width:"90%"}}>
              <Label>Username</Label>
              <Input
                value={this.state.email}
                onChangeText={text => {
                this.setState({email: text});
              }}/>
            </Item>
            <Item floatingLabel style={styles.password}>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={text => {
                this.setState({password: text});
              }}/>
            </Item>
            <Button onPress={this.handleLogin} block style={styles.loginBtn}>
              <Text>
                Login
              </Text>
            </Button>
            <Text style={styles.textReg}>Don't have an account yet?</Text>
            <Button onPress={() => navigate('Register')} block style={styles.regBtn}>
              <Text>
                Register
              </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {loginUser: state.loginUser}
}

export default connect(mapStateToProps)(LoginScreen);