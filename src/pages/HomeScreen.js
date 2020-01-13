import React, {Component} from "react";
import {
  Text,
  View,
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Content,
  Item,
  Input,
  Grid,
  Card,
  CardItem,
  Fab,
  Spinner,
  H2
} from 'native-base';
import {Image} from "react-native";
import logo from "../images/logo.png";
import DefaultPicture from "../images/DefaultPicture.png"
import styles from "../styles/home";
import {TouchableHighlight, Alert} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
import jwtdecode from "jwt-decode";
import {connect} from "react-redux";
import {searchGetData} from "../Redux/Actions/search";
import {getRequestProject, executeRequestProject, getProjectEngineer} from "../Redux/Actions/engineeruser";
import {addProjectCompany} from "../Redux/Actions/companyuser";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Modal from "react-native-modal";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decode: '',
      token: '',
      name: '',
      sort_by: 'date_update' || '',
      order_by: '',
      skill: '',
      total: '',
      per_page: '',
      current_page: '',
      limit: '',
      engineerlist: [],
      orderIcon: 'sort-amount-down',
      sortIcon: 'calendar-day',
      modalVisible: false,
      modalVisible1: false,
      project_of_request: [],
      project_of_engineer: [],
      active: false,
      promptVisible: false,
      addProject_name: '',
      addProject_desc: ''
    }
  }

  handleToken = async() => {
    let token = await AsyncStorage.getItem('@token');
    this.setState({decode: jwtdecode(token), token: token})
  }

  handleLogout = async() => {
    await AsyncStorage.removeItem('@token');
    this
      .props
      .navigation
      .navigate('Login')
  }

  handleListEngineer = async(pageNumbers) => {
    let token = await AsyncStorage.getItem('@token')
    try {
      let headers = {
        'Authorization': 'Bearer '.concat(token)
      }
      let params = {
        name: this.state.name || '',
        limit: this.state.limit || 8,
        page: pageNumbers,
        sort: this.state.sort_by,
        order: this.state.order_by || 'asc',
        skill: this.state.skill || null
      }
      await this
        .props
        .dispatch(searchGetData(headers, params));
      const search = await this.props.search;

      if (search.searchData.msg === 'error') {
        this
      .props
      .navigation
      .navigate('Login')
      } else if (search.searchData.message == "invalid signature") {
        this.setState({user: ''})
      } else if (search.searchData.message == "jwt expired") {
        this
      .props
      .navigation
      .navigate('Login')
      } else {
        this.setState({
          engineerlist: search.searchData.data,
          total: search.searchData.paginate
            ? search.searchData.paginate.total
            : '',
          per_page: search.searchData.paginate
            ? search.searchData.paginate.per_page
            : '',
          current_page: search.searchData.paginate
            ? search.searchData.paginate.page
            : ''
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.handleToken();
    this.handleRequestEngineer();
    this.handleListEngineer();
    this.handleEngineerProject();
  }

  handleAddProject = async() => {
    if (this.state.addProject_name == '' || this.state.addProject_desc == '') {
      Alert.alert('Error', 'Names and descriptions should not be empty')
    }else{
      try {
        let token = await AsyncStorage.getItem('@token')
        let data = {
          project_name: this.state.addProject_name,
          description: this.state.addProject_desc
        }
        let headers = {
          'Authorization': 'Bearer '.concat(token)
        }
  
        await this
          .props
          .dispatch(addProjectCompany(headers, data));
        const companyAddProject = await this.props.companyAddProject;
  
        if (companyAddProject.companyProjectAddData.msg == "success") {
          Alert.alert('Success', "Data updated successfully")
          this.setState({project_name: '', project_desc: ''});
        } else {
          Alert.alert('Failed', "Data failed to add")
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  handleLoginAs2 = () => {
    let {decode} = this.state;
    if (decode.login_as == 'company') {
      return (
        <View>
          <Fab
            active='true'
            style={{
            backgroundColor: '#D19895'
          }}
            position="bottomLeft"
            onPress={() => {
            this.setState({modalVisible1: true})
          }}>
            <FontAwesome5 name="plus"/>
          </Fab>
          <Modal
            isVisible={this.state.modalVisible1}
            backdropColor="transparent"
            onBackdropPress={() => {
            this.setState({modalVisible1: false})
          }}>
            <View
              style={{
              height: 200,
              marginBottom: 20
            }}>
              <Input
                value={this.state.addProject_name}
                onChangeText={text => {
                this.setState({addProject_name: text});
              }}
                placeholder="Project Name..."
                style={styles.projectAddModalFirst}/>
              <Input
                value={this.state.addProject_desc}
                onChangeText={text => {
                this.setState({addProject_desc: text});
              }}
                placeholder="Description Project..."
                style={styles.projectAddModal}/>
              <Button
                onPress={() => {
                this.handleAddProject();
                this.setState({modalVisible1: false});
              }}
                style={styles.buttonModal}>
                <Text>Add Project</Text>
              </Button>
            </View>
          </Modal>

          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={{
            backgroundColor: '#D19895'
          }}
            position="bottomRight"
            onPress={() => this.setState({
            active: !this.state.active
          })}>
            <FontAwesome5 name="filter"/>
            <Button
              onPress={async() => {
              if (this.state.orderIcon === "sort-amount-down") {
                await this.setState({orderIcon: "sort-amount-up", order_by: 'desc'});
                this.handleListEngineer();
              } else {
                await this.setState({orderIcon: "sort-amount-down", order_by: 'asc'});
                this.handleListEngineer();
              }
            }}
              style={{
              backgroundColor: '#5B7C7F'
            }}>
              <FontAwesome5 color="#fff" name={this.state.orderIcon}/>
            </Button>
            <Button
              onPress={async() => {
              if (this.state.sortIcon == 'calendar-day') {
                await this.setState({sortIcon: "font", sort_by: 'name'})
              } else if (this.state.sortIcon == 'font') {
                await this.setState({sortIcon: "user-check", sort_by: 'skill_name'})
              } else if (this.state.sortIcon == 'user-check') {
                await this.setState({sortIcon: "calendar-day", sort_by: 'date_update'})
              }
              this.handleListEngineer();
            }}
              style={{
              backgroundColor: '#5B7C7F'
            }}>
              <FontAwesome5 color="#fff" name={this.state.sortIcon}/>
            </Button>
            <Button
              small
              onPress={async() => {
              if (this.state.per_page == 8) {
                await this.setState({limit: 5})
              } else if (this.state.per_page == 5) {
                await this.setState({limit: 10})
              } else if (this.state.per_page == 10) {
                await this.setState({limit: 15})
              } else if (this.state.per_page == 15) {
                await this.setState({limit: 5})
              }
              this.handleListEngineer();
            }}
              style={{
              backgroundColor: '#5B7C7F'
            }}>
              <Text
                style={{
                fontSize: 15,
                fontWeight: 'bold'
              }}>{this.state.per_page}</Text>
            </Button>
            <Button
              onPress={() => {
              this.setState({modalVisible: true})
            }}
              style={{
              backgroundColor: '#5B7C7F'
            }}><FontAwesome5 color="#fff" name="search"/>
            </Button>
          </Fab>
          <Modal
            isVisible={this.state.modalVisible}
            backdropColor="transparent"
            onBackdropPress={() => {
            this.setState({modalVisible: false})
          }}>
            <View
              style={{
              height: 100,
              marginBottom: 20
            }}>
              <Input
                value={this.state.skill}
                onChangeText={text => {
                this.setState({skill: text});
              }}
                placeholder="Skill Name..."
                style={styles.inputModal}/>
              <Button
                onPress={() => {
                this.setState({modalVisible: false});
                this.handleListEngineer();
              }}
                style={styles.buttonModal}>
                <Text>Search By Skill</Text>
              </Button>
            </View>
          </Modal>
        </View>
      )
    } else {
      return (
        <View></View>
      )
    }
  }

  handleLoginAs = () => {
    let {decode} = this.state;
    if (decode.login_as == 'company') {
      const {engineerlist} = this.state;

      let renderPageNumbers;

      const pageNumbers = [];
      if (this.state.total !== null) {
        for (let i = 1; i <= Math.ceil(this.state.total / this.state.per_page); i++) {
          pageNumbers.push(i);
        }
      }

      let total_page = Math.ceil(this.state.total / this.state.per_page);

      renderPageNumbers = pageNumbers.map(number => {
        let classes = this.state.current_page === number
          ? styles.paginationActive
          : '';

        return (
          <Button
            small
            key={number}
            style={classes,
          styles.paginationView}
            onPress={() => this.handleListEngineer(number)}>
            <Text>{number}</Text>
          </Button>
        )
      })

      return (
        <View>
          <ScrollView>
            <Item style={styles.searchInput}>
              <Icon active name='search'/>
              <Input
                onChangeText={async(text) => {
                await this.setState({name: text});
                this.handleListEngineer()
              }}
                placeholder='Search...'/>
            </Item>
            <View style={styles.container}>
              {engineerlist.length > 0
                ? engineerlist.map(({
                  id,
                  name,
                  description,
                  skill_list,
                  success_rate,
                  accept_project
                }, index) => {
                  return (
                    <TouchableHighlight
                      underlayColor="#fff"
                      key={index}
                      onPress={() => {
                      this
                        .props
                        .navigation
                        .navigate("Detail", {index: index})
                    }}>
                      <Card key={index} style={styles.card}>
                        <CardItem cardBody>
                          <Image
                            source={DefaultPicture}
                            style={{
                            height: 150,
                            width: null,
                            flex: 1
                          }}/>
                        </CardItem>
                        <CardItem>
                          <Body
                            style={{
                            alignItems: "center"
                          }}>
                            <Text
                              style={{
                              fontWeight: "bold"
                            }}>{name}</Text>
                            <Text>{description}</Text>
                          </Body>
                        </CardItem>
                        <CardItem
                          cardBody
                          style={{
                          backgroundColor: "#DBDFDF",
                          marginRight: '20%',
                          marginLeft: "5%"
                        }}>
                          <Text
                            style={{
                            fontWeight: "bold"
                          }}>Skill:&nbsp;
                          </Text>
                          <Text
                            style={{
                            textAlign: 'center'
                          }}>{skill_list}</Text>
                        </CardItem>
                        <CardItem>
                          <Left>
                            <Text
                              style={{
                              textAlign: "center"
                            }}>
                              Success Rate
                            </Text>
                          </Left>
                          <Right>
                            <Text
                              style={{
                              textAlign: "center"
                            }}>
                              Project Accepted
                            </Text>
                          </Right>
                        </CardItem>
                        <CardItem
                          style={{
                          backgroundColor: "#DBDFDF"
                        }}>
                          <Left>
                            <Text
                              style={{
                              textAlign: "center",
                              fontWeight: "bold",
                              marginLeft: "30%"
                            }}>{success_rate == null
                                ? '0'
                                : success_rate}%</Text>
                          </Left>
                          <Right>
                            <Text
                              style={{
                              textAlign: "center",
                              alignItems: "center",
                              fontWeight: "bold"
                            }}>{accept_project}
                              Projects</Text>
                          </Right>
                        </CardItem>
                      </Card>
                    </TouchableHighlight>
                  )
                })
                : <Spinner color="#5B7C7F"/>}
            </View>
            <View style={styles.pagination}>
              <Button
                onPress={() => this.handleListEngineer(this.state.current_page - 1)}
                style={styles.paginationView}>
                <Text>&laquo;</Text>
              </Button>
              <Text style={styles.paginationText}>&nbsp;{this.state.current_page}&nbsp;of&nbsp;{total_page}&nbsp;</Text>
              <Button
                onPress={() => {
                if (this.state.current_page != total_page) {
                  this.handleListEngineer(this.state.current_page + 1)
                }
              }}
                style={styles.paginationView}>
                <Text>&raquo;</Text>
              </Button>
            </View>
          </ScrollView>
        </View>
      )
    } else if (decode.login_as === 'engineer') {
      const {project_of_request, project_of_engineer} = this.state;
      return (
        <View>
          <ScrollView>
            <Card>
              <CardItem header>
                <H2>List Request Project</H2>
              </CardItem>
              {project_of_request.length > 0
                ? project_of_request.map(({
                  project_name
                }, index) => {
                  return (
                    <CardItem key={index}>
                      <Icon active name="briefcase"/>
                      <Text style={{
                        width: "30%"
                      }}>{project_name.length > 15
                          ? project_name.substring(0, 15) + '...'
                          : project_name}</Text>
                      <Right
                        style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginRight: "-15%"
                      }}>
                        <TouchableHighlight
                          style={{
                          marginRight: 20,
                          width: 20
                        }}
                          onPress={() => {
                          this.handleInfo(index)
                        }}>
                          <FontAwesome5
                            color="blue"
                            style={{
                            fontSize: 15
                          }}
                            name="info"/>
                        </TouchableHighlight>
                        <TouchableHighlight
                          style={{
                          marginRight: 20,
                          width: 20
                        }}
                          onPress={() => {
                          this.handleAccept(index);
                        }}>
                          <FontAwesome5
                            color="green"
                            style={{
                            fontSize: 15
                          }}
                            name="check"/>
                        </TouchableHighlight>
                        <TouchableHighlight
                          style={{
                          width: 20
                        }}
                          onPress={() => {
                          this.handleReject(index)
                        }}>
                          <FontAwesome5
                            color="red"
                            style={{
                            fontSize: 15
                          }}
                            name="times"/>
                        </TouchableHighlight>
                      </Right>
                    </CardItem>
                  )
                })
                : <Text style={{
                  textAlign: "center"
                }}>No request</Text>}
            </Card>
            <Card>
              <CardItem header>
                <H2>List Project</H2>
              </CardItem>
              {project_of_engineer.length > 0
                ? project_of_engineer.map(({
                  project_name,
                  status
                }, index) => {
                  return (
                    <CardItem key={index}>
                      <Icon active name="briefcase"/>
                      <Text style={{
                        width: "50%"
                      }}>{project_name.length > 20
                          ? project_name.substring(0, 20) + '...'
                          : project_name}</Text>
                      <Right
                        style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginRight: "-15%"
                      }}>
                        <View
                          style={{
                          marginRight: 20,
                          width: 20
                        }}>
                          <FontAwesome5
                            color={status == "Finish"
                            ? 'green'
                            : 'blue'}
                            name={status == "Finish"
                            ? 'check-square'
                            : 'sync'}
                            style={{
                            fontSize: 15
                          }}/>
                        </View>
                        <TouchableHighlight
                          style={{
                          marginRight: 20,
                          width: 20
                        }}
                          onPress={() => {
                          this.handleInfo2(index)
                        }}>
                          <FontAwesome5
                            color="blue"
                            style={{
                            fontSize: 15
                          }}
                            name="info"/>
                        </TouchableHighlight>
                      </Right>
                    </CardItem>
                  )
                })
                : <Text></Text>}
            </Card>
          </ScrollView>
        </View>
      )
    } else {
      return (
        <Text>401</Text>
      )
    }
  }

  handleRequestEngineer = async() => {
    let token = await AsyncStorage.getItem('@token')
    try {
      let headers = {
        'Authorization': 'Bearer '.concat(token)
      }
      await this
        .props
        .dispatch(getRequestProject(headers));
      const engineerRequest = await this.props.engineerRequest;

      this.setState({
        project_of_request: engineerRequest.requestEngineerData.data
          ? engineerRequest.requestEngineerData.data
          : ''
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleEngineerProject = async() => {
    let token = await AsyncStorage.getItem('@token')
    let headers = {
      'Authorization': 'Bearer '.concat(token)
    }
    await this
      .props
      .dispatch(getProjectEngineer(headers));
    const engineerProject = await this.props.engineerProject;

    this.setState({
      project_of_engineer: engineerProject.engineerProjectData.data
        ? engineerProject.engineerProjectData.data
        : ''
    })
  }

  handleInfo = (index) => {
    const {engineerRequest} = this.props;
    Alert.alert('Detail', engineerRequest.requestEngineerData.data[index].project_name + '\n' + engineerRequest.requestEngineerData.data[index].description + "\n\n\n" + engineerRequest.requestEngineerData.data[index].company_name)
  }

  handleInfo2 = (index) => {
    const {engineerProject} = this.props;
    Alert.alert('Detail', engineerProject.engineerProjectData.data[index].project_name + '\n' + engineerProject.engineerProjectData.data[index].description + "\n\n\n" + engineerProject.engineerProjectData.data[index].status)
  }

  executeAccept = async(index, is_accept) => {
    if (is_accept === true) {
      let token = await AsyncStorage.getItem('@token');
      const {engineerRequest} = this.props;
      let params = {
        is_accept: 1,
        id_project: engineerRequest.requestEngineerData.data[index].id_project,
        id_request: engineerRequest.requestEngineerData.data[index].id
      }

      let headers = {
        'Authorization': 'Bearer '.concat(token)
      }

      await this
        .props
        .dispatch(executeRequestProject(headers, params));
      const executeRequest = await this.props.executeRequest;
      let msg = executeRequest.executeRequestData.msg

      if (msg == 'failed') {
        Alert.alert('Failed', "You have two projects with ongoing status")
      } else if (msg == 'success') {
        this.handleRequestEngineer();
        Alert.alert('Success', "Request received successfully")
      }
    } else if (is_accept === false) {
      let token = await AsyncStorage.getItem('@token');
      const {engineerRequest} = this.props;
      let params = {
        is_accept: 0,
        id_project: engineerRequest.requestEngineerData.data[index].id_project,
        id_request: engineerRequest.requestEngineerData.data[index].id
      }

      let headers = {
        'Authorization': 'Bearer '.concat(token)
      }

      await this
        .props
        .dispatch(executeRequestProject(headers, params));
      const executeRequest = await this.props.executeRequest;
      let msg = executeRequest.executeRequestData.msg
      console.log(executeRequest)

      if (msg == 'failed') {
        Alert.alert('Failed', "You have two projects with ongoing status")
      } else if (msg == 'success') {
        this.handleRequestEngineer();
        Alert.alert('Success', "Request succeeded in reject")
      }
    }
  }

  handleAccept = (index) => {
    Alert.alert('Project', 'Are you sure accept this project?', [
      {
        text: "Yes",
        onPress: () => {
          this.executeAccept(index, true)
        }
      }, {
        text: "No"
      }
    ])
  }

  handleReject = (index) => {
    Alert.alert('Project', 'Are you sure reject this project?', [
      {
        text: "Yes",
        onPress: () => {
          this.executeAccept(index, false)
        }
      }, {
        text: "No"
      }
    ])
  }

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left style={{
            flex: 1
          }}>
            <Button transparent>
              <Icon style={styles.iconHeader} name='menu'/>
            </Button>
          </Left>
          <Body style={{
            flex: 1
          }}>
            <Image style={styles.logo} source={logo}/>
          </Body>
          <Right style={{
            flex: 1
          }}>
            <Button transparent>
              <Icon style={styles.iconHeader} onPress={this.handleLogout} name='log-out'/>
            </Button>
          </Right>
        </Header>
        <Content>
          <this.handleLoginAs/>
        </Content>
        <this.handleLoginAs2/>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {search: state.search, companyAddProject: state.companyAddProject, executeRequest: state.executeRequest, engineerRequest: state.engineerRequest, engineerProject: state.engineerProject}
}

export default connect(mapStateToProps)(HomeScreen);