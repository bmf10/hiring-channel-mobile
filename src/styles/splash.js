import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: "100%",
        height: "100%"
    },
    image:{
        resizeMode: "contain",
        height: "45%",
        alignSelf: "center"
    },
    header:{
        marginTop: '10%',
        borderWidth: 1,
        borderColor: '#DBDFDF',
        backgroundColor: '#DBDFDF',
        borderRadius: 10,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    textTitle:{
        alignSelf: "center",
        fontWeight: 'bold'
    },
    text:{
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        textAlign:'center',
        alignSelf: "center",
        fontWeight: 'bold'
    },
    textExtend:{
        fontSize: 12,
        textAlign:'center',
        alignSelf: "center",
        bottom: 3,
        position:'absolute'
    }
})