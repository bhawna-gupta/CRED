import React from 'react';
import useStyles from './styles';
import { useState } from 'react';
import { Container, Button, TextField, Dialog, DialogTitle, Paper } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserProfile from '../UserProfile';

const Pay = (props) => {
    const classes = useStyles();
    const [card_id,setCardID] = useState(props.location.state.id);
    const [balance,setBalance] = useState(props.location.state.balance);
    const token = UserProfile.getToken();
    const [amount, setAmount] = useState(0);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFailure, setOpenFailure] = useState(false);
    const [invalid, setInvalid] = useState(false);

    const Success = () => (
        <Dialog className={classes.dialog} open={openSuccess}>
            <DialogTitle style={{textAlign:"center"}} ><CheckCircleOutlineIcon style={{color:"green",fontSize:"100px"}}/> <br/>
            Success!
            </DialogTitle>
            <Link to='/cards' style={{textDecoration:"none",color:"white"}}><Button style={{width:"100%"}} variant="contained" color="primary">Okay</Button></Link>
        </Dialog>
    )

    const Failure = () => (
        <Dialog className={classes.dialog} open={openFailure}>
            <DialogTitle style={{textAlign:"center"}}><CancelOutlinedIcon style={{color:"red",fontSize:"100px"}}/> <br/>
            Payment Failed!
            </DialogTitle>
            <Link to='/cards' style={{textDecoration:"none",color:"white"}}><Button style={{width:"100%"}} variant="contained" color="primary">Okay</Button></Link>
        </Dialog>
    )

    const Invalid = () => (
        <div >
          <Alert style={{width:'20%',margin:'auto'}} severity="error">Enter valid amount</Alert>
        </div>
      )

    const handlePay = async(e) =>{
        e.preventDefault();
        if (Number(amount)>0 && Number(amount)<= balance){

            const userObject = {
            amount_to_pay:Number(amount),
            };

            await axios({
            method: 'POST',
            url: `${process.env.REACT_APP_BACKEND_URL}/cards/${card_id}/pay`,
            headers: {
              'Content-Type': 'application/json',
              'token': `${token}`
            },
            data: userObject
            })
            .then((res) => {
                if(res.status==200){
                    setOpenSuccess(true)
                }
            }).catch((error) => {
                console.log(error)
                setOpenFailure(true)
            });
        

        }
        else{
            setInvalid(true);
        }
    }



    return(
        <>
        <div className={classes.main}>
        <div className={classes.paper_container}>
        <Paper className={classes.paper}>
        <h3 >Due</h3>
        <h1>&#8377; {balance}</h1>
        <hr className={classes.line}/>
        <h2>Amount you want to pay</h2>
        <form onSubmit={handlePay}>
        <div className={classes.input}>
            <label className={classes.label} htmlFor="amount" >&#8377;</label>
            <TextField 
                id = "amount"
                variant="outlined"
                size="small"
                onChange={(e) => {setAmount(e.target.value)}}
                InputProps={{
                    className : classes.fields
                }}
                error={invalid}
                helperText={invalid ? "Enter valid amount" : "" }
                required
            />
        </div>
        
        <div className={classes.button}>
        <Button  className={classes.paybutton} style={{width:"80%"}} type="submit" color="primary" variant="contained" >Pay</Button>
        </div>
        <div className={classes.button}>
        <Link  style={{textDecoration:"none",color:"black"}}  to='/cards'><Button  variant="contained" >Cancel</Button></Link>
        </div>
        </form>
        <Success open={openSuccess}/>
        <Failure open={openFailure}/>
        </Paper>
        </div>
        </div>
        </>
    )
}

export default Pay;