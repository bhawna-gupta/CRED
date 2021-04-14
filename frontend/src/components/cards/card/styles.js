import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(() => ({

    card_container: {
       //borderRadius: "5px",
       boxShadow: "2px 2px 2px 2px #242424",
       textAlign: "center",
       paddingTop: "5px",
       backgroundColor: "#1c1c1c",
        //backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23dddddd' fill-opacity='1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
    
    },


    cards:{
        width:"100%",
    },

    heading:{
        marginBottom:"20px"
    },

    deletebutton:{
        minWidth:"35px",
        width:"35px",
        display: "inline",
        position:"absolute",
        marginLeft:"60px",
        marginTop:"-3px",
        "&:hover":{
            backgroundColor:"1c1c1c",
            filter: "brightness(80%)"
        }
        //float:"right"
    },

    paybutton:{
        borderRadius: "15px",
        marginRight: "40px",
        backgroundColor: "#36454F",
        "&:hover":{
            backgroundColor: "#36454F",
            filter: "brightness(90%)",
        }
    },

    trbutton:{
        borderRadius: "15px",
        display:"inline",
        backgroundColor: "#36454F",
        "&:hover":{
            backgroundColor: "#36454F",
            filter: "brightness(90%)",
        }
    },

    dialog:{
        textAlign:"center",
    }


}));
