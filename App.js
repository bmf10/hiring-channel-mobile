import React, {Component} from "react";
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import LoginScreen from "./src/pages/LoginScreen";
import RegisterScreen from "./src/pages/RegisterScreen";
import HomeScreen from "./src/pages/HomeScreen";
import DetailScreen from "./src/pages/DetailScreen"

import {Root} from "native-base";

import {Provider} from "react-redux";
import store from "./src/Redux/store";
import SplashScreen from "./src/pages/SplashScreen";

const AuthNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Register: {
    screen: RegisterScreen
  }
}, {headerMode: 'none'});

const SplashNavigator = createStackNavigator({
  Splash: {
    screen: SplashScreen
  }
},{headerMode: 'none'})

const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Detail: {
    screen: DetailScreen
  }
}, {headerMode: 'none'})

const MainNavigator = createSwitchNavigator({
  Splash: {
    screen: SplashNavigator
  },
  Auth: {
    screen: AuthNavigator
  },
  Home: {
    screen: HomeNavigator
  }
})

const Navigation = createAppContainer(MainNavigator);

export default class App extends Component {
  render() {
    return (
      <Root>
        <Provider store={store}>
          <Navigation/>
        </Provider>
      </Root>
    )
  }
};