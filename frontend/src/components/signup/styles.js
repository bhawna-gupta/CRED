import { makeStyles } from '@material-ui/core/styles';
import Image from '../../assets/images/bg2.jpg'
export default makeStyles(() => ({
    

    main:{
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    },

    paper_container:{
        display: "block",
        
        width: "auto",
        marginRight: "25%",
        marginLeft: "25%",
        padding:"20px 0",
    },

    paper:{
        position: "relative",
        display: "flex",
        width:"50vw",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor:"whitesmoke"
        //boxShadow: ".2px 12px 18px rgba(131,153,167,0.6)",
        //background:"linear-gradient(180deg, #616161 15%, #9bc5c3 95%)",
    },

    avatar:{
        marginTop: 20,
        background: "rgba(255,255,255,0.85)",
        position: "relative",
        width: "100px",
        height: "100px",
        
    },

    icon:{
        width: "80px",
        height: "80px",
        color: "rgba(131,153,167,0.79)"
    },


    labels:{
        fontSize: "1.2rem",
        fontWeight:"bold",
        color: "rgba(0,0,0,0.7)",
        display:"block",
        marginTop:"30px"

    },
    
    input:{
        textAlign:"center"
    },

    fields:{
        marginTop:"10px",
        display:"block"
    },

    eyeicon:{
        position:"absolute",
        marginTop:"-25px",
        marginLeft:"60px",
        cursor:"pointer"
    },

    submitbuttondiv:{
        margin: "20px auto",
        textAlign: "center",
    },

    submitbutton:{
        color:"white",
        backgroundColor: "#36454F",
        "&:hover":{
            backgroundColor: "#36454F",
            filter: "brightness(90%)",
        }
    },

    backbutton:{
        marginBottom: "10px"
    },

    dialog:{
        textAlign:"center",
    }

}));