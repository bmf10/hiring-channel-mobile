import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        backgroundColor: "#0D2573",
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
        borderRadius: 10,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: '#fff',
    },
    textTitle:{
        alignSelf: "center",
        color: '#fff',
        fontWeight: 'bold'
    },
    text:{
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        textAlign:'center',
        color: '#fff',
        alignSelf: "center",
        fontWeight: 'bold'
    },
    textExtend:{
        fontSize: 12,
        textAlign:'center',
        color: '#fff',
        alignSelf: "center",
        bottom: 3,
        position:'absolute'
    }
})