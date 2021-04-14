import { makeStyles } from '@material-ui/core/styles';
import BgImage from '../../assets/images/bg5.jpg'
export default makeStyles(() => ({


    main:{
        backgroundImage: `url(${BgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height : '100vh'
    },

    paper_container:{
        display: "block",
        width: "auto",
        height:"80vh",
        marginRight: "25%",
        marginLeft: "25%",
        paddingTop:"20px",
        
    },

    paper:{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        color:"whitesmoke",
        alignItems: "center",
        backgroundColor:"#353839"
       
    },

    label:{
        fontSize: "2rem",
        marginRight:"10px"
    },

    line:{
        color:"black",
        width:"100%"
    },

    input:{
        marginBottom: "20px"
    },

    fields:{
        color:"whitesmoke"
    },

    button:{
        margin:"20px auto",
        textAlign:"center",
    },

    paybutton:{
        backgroundColor: "#36454F",
        "&:hover":{
            backgroundColor: "#36454F",
            filter: "brightness(90%)",
        }
    }

}));