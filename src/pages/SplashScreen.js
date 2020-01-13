import AsyncStorage from '@react-native-community/async-storage';
import jwtdecode from "jwt-decode";
import React, {Component} from "react";
import {View, H1, Text, H3} from 'native-base';
import {Image} from "react-native";
import styles from "../styles/splash";
import Picture from "../images/splash.png"

class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async() => {
    try {
      let token = await AsyncStorage.getItem('@token')
      let decode = jwtdecode(token);
      let expired = decode.exp * 1000

      if (Date.now() <= expired) {
        setTimeout(() => {
          this
            .props
            .navigation
            .navigate('Home')
        }, 2000)
      } else {
        setTimeout(() => {
          this
            .props
            .navigation
            .navigate('Login')
        }, 2000)
      }
    } catch (error) {
      setTimeout(() => {
        this
          .props
          .navigation
          .navigate('Login')
      }, 2000)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <H1 style={styles.header}>Hiring App Mobile</H1>
          <Image style={styles.image} source={Picture}/>
          <H3 style={styles.textTitle}>Hire expert freelancers for any job, online</H3>
          <Text style={styles.text}>Millions of small businesses use Freelancer to turn their ideas into reality.</Text>
          <Text style={styles.textExtend}>Hiring App ©2020</Text>
      </View>
    )
  }
}

export default SplashScreen;