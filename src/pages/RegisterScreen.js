import React, {Component} from "react";
import {
  Container,
  Tab,
  Tabs,
  Text,
  Form,
  Item,
  Label,
  Input,
  Button,
  Toast
} from "native-base";
import styles from "../styles/register";
import {ScrollView} from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import {RegisterCompanyAction, RegisterEngineerAction} from "../Redux/Actions/auth";
import {connect} from "react-redux";


class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      date_of_birth: '',
      show: false,
      company_name: '',
      company_logo: '',
      company_location: '',
      company_description: '',
      company_username: '',
      company_password: '',
      engineer_name: '',
      engineer_date_of_birth: '',
      engineer_location: '',
      engineer_description: '',
      engineer_username: '',
      engineer_password: ''
    };

    this.setDate = this
      .setDate
      .bind(this);
  }

  handleRegisterCompany = async() => {
    if (this.state.company_name.length < 1) {
      Toast.show({text: "Name cannot be null", type: "warning"})
    } else if (this.state.company_location.length < 1) {
      Toast.show({text: "Location cannot be null", type: "warning"})
    } else if (this.state.company_description.length < 1) {
      Toast.show({text: "Description cannot be null", type: "warning"})
    } else if (this.state.company_username.length <= 5) {
      Toast.show({text: "Username minimum length 6 characters", type: "warning"})
    } else if (this.state.company_password.length <= 5) {
      Toast.show({text: "Password minimum length 6 characters", type: "warning"})
    } else {

      let data = {
        company_name: this.state.company_name,
        logo: this.state.company_logo,
        location: this.state.company_location,
        description: this.state.company_description,
        username: this.state.company_username,
        password: this.state.company_password
      }

      await this
        .props
        .dispatch(RegisterCompanyAction(data));
      const registerCompany = await this.props.registerCompany;
      let msg = registerCompany.RegisterCompanyData.msg

      if (msg === "error") {
        Toast.show({text: registerCompany.RegisterCompanyData.errors, buttonText: 'Okay', type: "danger"})
      } else if (msg === "success") {
        Toast.show({text: "Redirecting... ", buttonText: 'Okay', type: "success"})
        this
          .props
          .navigation
          .navigate('Login')
      }
    }
  }

  handleRegisterEngineer = async() => {
    let date_of_birth = this.state.date_of_birth;
    if (this.state.engineer_name.length < 1) {
      Toast.show({text: "Name cannot be null", type: "warning"})
    } else if (this.state.engineer_location.length < 1) {
      Toast.show({text: "Location cannot be null", type: "warning"})
    } else if (this.state.engineer_description.length < 1) {
      Toast.show({text: "Description cannot be null", type: "warning"})
    } else if (this.state.engineer_username.length <= 5) {
      Toast.show({text: "Username minimum length 6 characters", type: "warning"})
    } else if (this.state.engineer_password.length <= 5) {
      Toast.show({text: "Password minimum length 6 characters", type: "warning"})
    }else if (date_of_birth.length == 8) {
      Toast.show({text: "Date of Birth Not Valid", type: "warning"})
    } 
    else {

      let data = {
        name: this.state.engineer_name,
        date_of_birth: date_of_birth,
        location: this.state.engineer_location,
        description: this.state.engineer_description,
        username: this.state.engineer_username,
        password: this.state.engineer_password
      }

      await this
      .props
      .dispatch(RegisterEngineerAction(data));
    const registerEngineer = await this.props.registerEngineer;
    let msg = registerEngineer.RegisterEngineerData.msg

      if (msg === "error") {
        Toast.show({text: registerEngineer.RegisterEngineerData.errors, buttonText: 'Okay', type: "danger"})
      } else if (msg === "success") {
        Toast.show({text: "Redirecting... ", buttonText: 'Okay', type: "success"})
        this
          .props
          .navigation
          .navigate('Login')
      }
    }
  }

  CompanyForm = () => {
    const {navigate} = this.props.navigation;
    return (
      <Form style={styles.form}>
        <Item floatingLabel>
          <Label>Company Name</Label>
          <Input
            value={this.state.company_name}
            onChangeText={text => {
            this.setState({company_name: text});
          }}/>
        </Item>
        <Item floatingLabel>
          <Label>Logo</Label>
          <Input
            value={this.state.company_logo}
            onChangeText={text => {
            this.setState({company_logo: text});
          }}/>
        </Item>
        <Item floatingLabel>
          <Label>Location</Label>
          <Input
            value={this.state.company_location}
            onChangeText={text => {
            this.setState({company_location: text});
          }}/>
        </Item>
        <Item floatingLabel>
          <Label>Description</Label>
          <Input
            value={this.state.company_description}
            onChangeText={text => {
            this.setState({company_description: text});
          }}/>
        </Item>
        <Item floatingLabel>
          <Label>Username</Label>
          <Input
            value={this.state.company_username}
            onChangeText={text => {
            this.setState({company_username: text});
          }}/>
        </Item>
        <Item floatingLabel style={styles.password}>
          <Label>Password</Label>
          <Input
            secureTextEntry={true}
            value={this.state.company_password}
            onChangeText={text => {
            this.setState({company_password: text});
          }}/>
        </Item>
        <Button onPress={this.handleRegisterCompany} block style={styles.regBtn}>
          <Text>
            Register
          </Text>
        </Button>
        <Text style={styles.LoginText}>Have an account?</Text>
        <Button onPress={() => navigate('Login')} block style={styles.loginBtn}>
          <Text>
            Login
          </Text>
        </Button>
      </Form>
    )
  }

  show = mode => {
    this.setState({show: true, mode});
  }

  datepicker = () => {
    this.show('date');
  }

  setDate = (event, date) => {
    console.log('ok');
    this.setState({chosenDate: date})
    console.log(this.state.chosenDate);
    this.setState({
      date_of_birth: this
        .state
        .chosenDate
        .getFullYear() + "-" + (this.state.chosenDate.getMonth() + 1) + "-" + this
        .state
        .chosenDate
        .getDate()
    })
  }

  EngineerForm = () => {
    const {show, mode} = this.state;
    const {navigate} = this.props.navigation;
    return (
      <Form style={styles.form}>
        <Item floatingLabel>
          <Label>Engineer Name</Label>
          <Input value={this.state.engineer_name}
            onChangeText={text => {
            this.setState({engineer_name: text});
          }}/>
        </Item>
        <Item floatingLabel>
          <Label style={styles.dateLabel}>Date of Birth</Label>
          <Input
            placeholder="Select date"
            onFocus={this.datepicker}
            value={this.state.date_of_birth}
            style={styles.date}/>
        </Item>
        {show && <DateTimePicker
          value={new Date()}
          mode={mode}
          onChange={(event, date) => {
          this.setState({chosenDate: date, show: false});
          this.setState({
            date_of_birth: this
              .state
              .chosenDate
              .getFullYear() + "-" + ('0' + (this.state.chosenDate.getMonth() + 1)).slice(-2) + "-" + ('0' + this.state.chosenDate.getDate()).slice(-2)
          });
        }}/>}
        <Item floatingLabel>
          <Label>Location</Label>
          <Input value={this.state.engineer_location}
            onChangeText={text => {
            this.setState({engineer_location: text});
          }}/>
        </Item>
        <Item floatingLabel>
          <Label>Description</Label>
          <Input value={this.state.engineer_description}
            onChangeText={text => {
            this.setState({engineer_description: text});
          }}/>
        </Item>
        <Item floatingLabel>
          <Label>Username</Label>
          <Input value={this.state.engineer_username}
            onChangeText={text => {
            this.setState({engineer_username: text});
          }}/>
        </Item>
        <Item floatingLabel style={styles.password}>
          <Label>Password</Label>
          <Input secureTextEntry={true} value={this.state.engineer_password}
            onChangeText={text => {
            this.setState({engineer_password: text});
          }}/>
        </Item>
        <Button onPress={this.handleRegisterEngineer} style={styles.regBtn}>
          <Text>
            Register
          </Text>
        </Button>
        <Text style={styles.LoginText}>Have an account?</Text>
        <Button onPress={() => navigate('Login')} block style={styles.loginBtn}>
          <Text>
            Login
          </Text>
        </Button>
      </Form>
    )
  }

  render() {

    return (
      <Container style={styles.container}>
        <ScrollView>
          <Text style={styles.registerText}>Register As</Text>
          <Text style={styles.registerDesc}>Company or Engineer</Text>
          <Tabs>
            <Tab
              style={styles.tab}
              tabStyle={{
              backgroundColor: '#5B7C7F'
            }}
              textStyle={{
              color: '#fff'
            }}
              activeTabStyle={{
              backgroundColor: '#5B7C7F'
            }}
              activeTextStyle={{
              color: '#fff',
              fontWeight: 'normal'
            }}
              heading="Company">
              <this.CompanyForm/>
            </Tab>
            <Tab
              style={styles.tab}
              tabStyle={{
              backgroundColor: '#5B7C7F'
            }}
              textStyle={{
              color: '#fff'
            }}
              activeTabStyle={{
              backgroundColor: '#5B7C7F'
            }}
              activeTextStyle={{
              color: '#fff',
              fontWeight: 'normal'
            }}
              heading="Engineer">
              <this.EngineerForm/>
            </Tab>
          </Tabs>
        </ScrollView>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {registerCompany: state.registerCompany, registerEngineer: state.registerEngineer}
}

export default connect(mapStateToProps)(RegisterScreen);