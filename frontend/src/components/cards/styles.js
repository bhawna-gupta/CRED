import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(() => ({

    main:{
        height:"100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight:"100vh",
        backgroundColor: " #303030",
        paddingBottom:"10px"
        //backgroundColor: "#c3cbdc",
       // background: "linear-gradient(147deg, #c3cbdc 0%, #edf1f4 74%)",

    },

    appBar:{
        height: "10%",
        backgroundColor: "rgba(0,0,0,0.9)",
        color:"white",
    },

    container:{
       maxWidth: "98%",
       marginLeft: "10px",
       marginRight:"10px",
       marginTop: "4.8%",
    },

    drawer:{
        //backgroundColor:"rgba(48,48,48,0.8)",
        backgroundColor:"#181818",
        color:"whitesmoke",
        height:"100%",
        width:"200px",
        textAlign:"center"
    },

    menuicon:{
        '&:hover':{
            cursor:"pointer"
        }
    },

    heading:{
        flex: 1,
    },
    
    addButton:{
        color:"whitesmoke",
        backgroundColor: "#303030",
        "&:hover":{
            backgroundColor: "#303030",
            filter: "brightness(90%)",
        }
    },

    logoutButton:{
        color:"whitesmoke",
        backgroundColor: "#3b444b",
        "&:hover":{
            backgroundColor: "#3b444b",
            filter: "brightness(90%)",
        }
    },


    backdrop_container:{
        height: "20%",
        width: "50%",
        borderRadius: "5px",
        boxShadow: "2px 2px 2px 2px #cccccc",
        backgroundColor: "white"
    },
    backdrop_text:{
        color:"black"
    },
    backdrop_buttons:{
        display:"flex",
        justifyContent: "space-around"
    },
    nocard_div:{
        textAlign: "center",
        color:"whitesmoke",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },


}));