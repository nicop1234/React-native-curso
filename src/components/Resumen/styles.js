import { StyleSheet } from "react-native";
import codegenNativeCommands from "react-native/Libraries/Utilities/codegenNativeCommands";

export const styles = StyleSheet.create({
    listados:{
        flexDirection:"row",
        margin:5,
        borderColor:"#BBBBBB",
        borderRadius:2,
        borderWidth:1.1,
        padding:7,
        borderStartColor:"#0E8A13",
        borderStartWidth:10

    },
    listadosGasto:{
        flexDirection:"row",
        margin:5,
        borderColor:"#BBBBBB",
        borderRadius:2,
        borderWidth:1.1,
        padding:7,
        borderStartColor:"#FF2C00",
        borderStartWidth:10
    },
    title:{
        marginRight:30
    },
    title2:{
        marginRight:42
    },
    monto:{
        marginHorizontal:220,
        marginTop:6,
        position:"absolute"
    },
    letras:{
        marginTop:20,
        marginBottom:10,
        marginHorizontal:2,
        fontSize:16,
        borderBottomColor: "#857976",
        borderBottomWidth: 1,
    },
    contRes:{
        flexDirection:"row",
        borderTopWidth:1,
        borderTopColor: "#857976",
        marginTop:10,
    
    },
    separ:{
        position:"absolute",
        marginTop:10,
        marginHorizontal:200
    },
    separ2:{
        marginHorizontal:"10%",
        marginTop:10,
    },
    btnStyle:{
        backgroundColor:"#0E8A13",
        marginBottom:20
    },
 
});
