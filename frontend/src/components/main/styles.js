import {  makeStyles } from '@material-ui/core/styles';
import Image from '../../assets/images/bg1.jpg'
export default makeStyles(() => ({
    grid:{
    },
    heading:{
        color: "white",
        position: "relative",
        textAlign:"center",
        top: "20%",
        left: "20%",
        width:"60%",
        fontFamily: "Lato,sans-serif",
    },

    left:{
        display: "block",
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        
    },
    right:{
        textAlign: "center",
        borderLeft: "1px solid black",
        backgroundColor:"#D8D8D8"
    },

    loginbutton:{
        marginTop: "10px",
        marginBottom: "30px",
    },


    label:{
        fontSize: "1.3rem",
        color: "black",
        margin: "5px 0",
        display: "block",
    },

    fields:{
        margin:"20px 0"
    },
    eyeicon:{
        position:"absolute",
        marginTop:"27px",
        marginLeft:"-27px",
        color:"grey",
        cursor:"pointer"
    },

    createbutton:{
        fontWeight: "bold",
        backgroundColor: "#D0D0D0",
        "&:hover":{
            backgroundColor: "#D0D0D0",
            filter: "brightness(120%)",
        }
    },
    
}));