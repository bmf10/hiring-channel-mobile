import {StyleSheet} from "react-native";

export default StyleSheet.create({
  logo: {
    width: 83,
    height: 38,
    alignSelf:"center"
  },
  header: {
    backgroundColor: "#DBDFDF",
  },
  iconHeader: {
    color: "#000"
  },
  searchInput: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  card: {
    marginLeft: 5,
    marginRight: 5,
    width: 190,
    backgroundColor: "#DBDFDF",
  },
  container: {
    display: "flex",
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent:"center"
  },
  pagination: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    display: "flex",
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  paginationView: {
    backgroundColor: "#5B7C7F",
    color: "#000",
    borderColor: "#ddd"
  },
  paginationActive: {
    color: "#000",
    borderColor: "#ddd"
  },
  paginationText: {
    borderColor: "#000",
    borderStyle: "solid",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlignVertical: "center",
    borderRadius: 3,
    marginLeft: 3,
    marginRight: 3
  },
  inputModal: {
    backgroundColor: "#7D9294",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    color: "#fff"
  },
  buttonModal: {
    backgroundColor: "#D19895",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center"
  },
  projectAddModalFirst:{
    height: 80,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#7D9294",
    color: "#fff"
  },
  projectAddModal:{
    height: 80,
    backgroundColor: "#7D9294",
    color: "#fff"
  },
})