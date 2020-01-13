import {StyleSheet} from "react-native";

export default StyleSheet.create({
  backIcon: {
    marginLeft: 20,
    marginTop: 15,
    fontSize: 20,
    zIndex: 3
  },
  containerImage: {
    display: "flex",
    width: "100%",
    height: "50%",
    alignSelf: "center"
  },
  image: {
    resizeMode: "contain",
    alignSelf: "center",
    width: "90%",
    borderRadius: 5
  },
  title: {
    alignSelf: "center",
    fontSize: 30
  },
  h1: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 30
  },
  desc: {
    alignSelf: "center"
  },
  skill: {
    fontSize: 20,
    alignSelf: "center",
    marginTop: 20
  },
  skill_list: {
    color: "#7D9294",
    marginTop: 10,
    alignSelf: "center"
  },
  project: {
    marginTop: 30,
    display: "flex",
    flexDirection: "row"
  },
  projectText: {
    flex: 1,
    textAlign: "center",
    fontSize: 18
  },
  dataProject: {
    marginTop: 10,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row"
  },
  successRate1: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    color: "#5B7C7F"
  },
  successRate2: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    color: "#D19895"
  },
  accept_project1: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    color: "#5B7C7F"
  },
  accept_project2: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    color: "#D19895"
  },
  hireBtn: {
    backgroundColor: '#5B7C7F'
  }
})