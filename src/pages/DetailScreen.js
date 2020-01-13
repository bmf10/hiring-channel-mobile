import React, {Component} from "react";
import {Text, Button, View, H1} from 'native-base';
import {connect} from "react-redux";
import styles from "../styles/detail";
import {Image, Alert} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DefaultPicture from "../images/DefaultPicture.png"
import {ScrollView} from "react-native-gesture-handler";
import Modal, {ModalContent} from 'react-native-modals';
import {getAvailableProject, sendRequestData} from "../Redux/Actions/companyuser";
import AsyncStorage from "@react-native-community/async-storage";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      project: [],
      project_id: ''
    }
  }

  componentDidMount() {
    this.handleListProject();
  }

  handleListProject = async() => {
    let token = await AsyncStorage.getItem('@token');
    try {
      let headers = {
        'Authorization': 'Bearer '.concat(token)
      }
      await this
        .props
        .dispatch(getAvailableProject(headers));
      const companyAvailableProject = await this.props.companyAvailableProject;

      if (companyAvailableProject.companyAvailableProjectData.msg === 'error') {
        this
          .props
          .navigation
          .navigate('Login')
      } else if (companyAvailableProject.companyAvailableProjectData.message == "jwt expired") {
        this
          .props
          .navigation
          .navigate('Login')
      } else {
        this.setState({project: companyAvailableProject.companyAvailableProjectData.data})
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleSendRequest = async() => {
    let token = await AsyncStorage.getItem('@token');
    const {search, navigation} = this.props;
    let index = navigation.getParam('index');
    let dataengineer = search.searchData.data[index];
    try {
      console.log(index, this.state.project_id)

      let data = {
        id_project: this.state.project_id,
        id_engineer: dataengineer.id
      }

      let headers = {
        'Authorization': 'Bearer '.concat(token)
      }
      await this
        .props
        .dispatch(sendRequestData(headers, data));
      const sendRequest = await this.props.sendRequest;
      console.log(sendRequest);

      this.setState({list_project: false});
      this.props.navigation.goBack()
      Alert.alert('Success', 'Request successfully sent')
    } catch (error) {
      console.log(error)
    }

  }

  render() {
    const {search, navigation} = this.props;
    const {project} = this.state;
    let index = navigation.getParam('index');
    let data = search.searchData.data[index];
    return (
      <View>
        <ScrollView>
          <Button
            onPress={() => {
            navigation.goBack();
          }}
            transparent
            style={{
            width: "15%"
          }}>
            <FontAwesome5 color="#D19895" style={styles.backIcon} name="times"/>
          </Button>
          <H1 style={styles.title}>Detail Engineer</H1>
          <Image style={styles.image} source={DefaultPicture}/>
          <H1 style={styles.h1}>{data.name}</H1>
          <Text style={styles.desc}>{data.description}</Text>
          <Text style={styles.skill}>Skill</Text>
          <Text style={styles.skill_list}>{data.skill_list}</Text>
          <View style={styles.project}>
            <Text style={styles.projectText}>Success Rate</Text>
            <Text style={styles.projectText}>Accepted Project</Text>
          </View>
          <View style={styles.dataProject}>
            <Text
              style={data.success_rate > 50
              ? styles.successRate1
              : styles.successRate2}>{data.success_rate}
              %</Text>
            <Text
              style={data.accept_project > 5
              ? styles.accept_project1
              : styles.accept_project2}>{data.accept_project}</Text>
          </View>
          <Button
            style={styles.hireBtn}
            block
            onPress={() => {
            this.setState({visible: true})
          }}>
            <Text>Hire</Text>
          </Button>
        </ScrollView>
        <Modal
          visible={this.state.visible}
          onHardwareBackPress={() => {
          this.setState({visible: false});
        }}
          onTouchOutside={() => {
          this.setState({visible: false});
        }}>
          <ModalContent>
            {project && project.length > 0
              ? project.map(({
                id_project,
                project_name
              }, index) => {
                return (
                  <Button onPress={()=>{
                    this.setState({project_id: id_project, visible: false})
                    this.handleSendRequest();
                  }} transparent block key={index}>
                    <Text style={{
                      fontSize: 17
                    }}>{project_name}</Text>
                  </Button>
                )
              })
              : <Text></Text>}
          </ModalContent>
        </Modal>
      </View>
    )
  }

}
const mapStateToProps = state => {
  return {search: state.search, companyAvailableProject: state.companyAvailableProject, sendRequest: state.sendRequest}
}

export default connect(mapStateToProps)(Detail);
