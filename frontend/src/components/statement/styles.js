import { withStyles, makeStyles } from '@material-ui/core/styles';
import Image from '../../assets/images/bg3.svg'
export default makeStyles(() => ({

    main:{
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height:"100vh"
    },
    paper_container:{
        display: "block",
        width: "90%",
        margin:"0 auto",
        
        
    },
    heading:{
        paddingTop:"20px"
    },
    paper:{
        textAlign:"center",
        //backgroundColor:"#FAF9F6",
        height:"95vh",
        color:"whitesmoke",
        backgroundColor:"#303030"
        
    },

    grid:{
        height: "440px",
        width: "68%",
        margin: "auto",
        color:"#FAF9F6"
        
    },
    

    form:{
        marginBottom: "20px"
    },

    notrans_div:{
       height:"65.5vh",
    },

    notrans:{
        position:"absolute",
        top:"40%",
        left:"40%"
    },

    label:{
        marginRight: "20px"
    },
    select:{
        width: "100px",
        marginRight:"20px",
        color:"whitesmoke"
    },
    fields:{
        width:"100px",
        color:"whitesmoke"
    },
    button:{
        marginLeft: "20px",
    },
    
    icon:{
        height:"20px",
        margin:"0",
        width:"80px"
    },

    pollicon:{
        position:"relative",
        fontSize:"50px",
        left:"12%",
        marginBottom:"-25px",
        "&:hover":{
            filter: "brightness(80%)",
            cursor:"pointer"
        }
    },

    backbutton:{
        display: "inline",
        position:"absolute",
        marginLeft:"-44%",
        marginTop:"1%"
    },


}));