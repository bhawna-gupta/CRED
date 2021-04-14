import React from 'react';
import { Helmet } from 'react-helmet';
import { useState } from "react";
import useStyles from './styles';
import { Paper, Button, TextField, Dialog, DialogTitle, Grid, Box, InputLabel} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import  VisibilityIcon from '@material-ui/icons/Visibility';
import  PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Avatar from "@material-ui/core/Avatar";
import { Link } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import axios from 'axios';

const Signup = () => {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pass, setPass] = useState("");
    const [repass, setRepass] = useState("");
    const [errEmail, setErremail] = useState(false);
    const [errPhone, setErrphone] = useState(false);
    const [errPassMatch, setErrpassmatch] = useState(false);
    const [errPass, setErrpass] = useState(false);
    const [duplicate, setDuplicate] = useState(false);
    const [passwordShown,setPasswordShown] = useState(false);
    const [open, setOpen] = useState(false)

    const EmailErr = () => (
        <div >
          <Alert style={{width:'70%',margin:'10px auto'}} severity="error">Please enter valid Email</Alert>
        </div>
      )

    const PhoneErr = () => (
        <div >
          <Alert style={{width:'90%',margin:'10px auto'}} severity="error">Please enter valid phone number</Alert>
        </div>
      )

    const PassMatchErr = () => (
        <div >
          <Alert style={{width:'70%',margin:'10px auto'}} severity="error">Passwords do not match</Alert>
        </div>
      )
    
    const PassErr = () => (
        <div >
          <Alert style={{width:'90%',margin:'10px auto'}} severity="error">Must be minimum 8 characters long</Alert>
        </div>
      )


    const Duplicate = () => (
        <div >
          <Alert style={{width:'100%',margin:'10px auto'}} severity="error">Account with given Email/Phone already exists</Alert>
        </div>
      )

    const Success = () => (
        <Dialog className={classes.dialog} open={open}>
            <DialogTitle ><CheckCircleOutlineIcon style={{color:"green",fontSize:"100px"}}/> <br/>
            Successfully Created!
            </DialogTitle>
            <Link to='/' style={{textDecoration:"none",color:"white"}}><Button style={{width:"100%"}} variant="contained" color="primary">Okay</Button></Link>
        </Dialog>
    )

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };


    const validate = () => {
        let valid = true;
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
            setErremail(true);
            valid = false;
        }
        if (!(/^\d{10}$/.test(phone))){
            setErrphone(true);
            valid = false;
        }
        if (pass!=repass){
            setErrpassmatch(true)
            valid = false;
        }
        if (pass.length<8){
            setErrpass(true)
            valid=false;
        }
        return valid
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setErremail(false);
        setErrphone(false);
        setErrpass(false)
        setErrpassmatch(false)
        if (validate()){


            const userObject = {
                name: name,
                email: email,
                mobile: phone,
                password: pass
            };

            

            await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_BACKEND_URL}/signup`,
                headers: {
                  'Content-Type': 'application/json',
                },
                data: userObject
                })
                .then((res) => {
                    if(res.status==201){
                        setOpen(true);
                    }
                }).catch((error) => {
                    if(error.response.status==409){
                        setDuplicate(true);
                       }
                });
            
            
        }
    }

    return(
        <>
        <Helmet><title>User Signup</title></Helmet>
        <div className={classes.main}>
        <div className={classes.paper_container}>
        <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
            <PeopleAltIcon className={classes.icon} />
          </Avatar>
            <form onSubmit={onSubmit} className={classes.form}>

                <div className={classes.input}>
                <InputLabel htmlFor="name" className={classes.labels}>
                Full Name
                </InputLabel>
                <TextField className={classes.fields}
                    id = "name"
                    onChange={(e) => {setName(e.target.value)}}
                    size="small"
                    required
                />
                </div>
                <div className={classes.input}>
                <InputLabel htmlFor="email" className={classes.labels}>
                Email
                </InputLabel>

                <TextField className={classes.fields}
                    id = "email"
                    onChange={(e) => {setEmail(e.target.value)}}
                    size="small"
                    required
                />

                { errEmail ? <EmailErr /> : null }
                </div>
                <div className={classes.input}>
                <InputLabel htmlFor="phone" className={classes.labels}>
                Phone
                </InputLabel>
                <TextField className={classes.fields}
                    id = "phone"
                    onChange={(e) => {setPhone(e.target.value)}}
                    size="small"
                    required
                />

                { errPhone ? <PhoneErr /> : null }

                </div>
                <div className={classes.input}>
                <InputLabel htmlFor="pass" className={classes.labels}>
                Password
                </InputLabel>

                <TextField className={classes.fields}
                    id = "pass"
                    type={passwordShown ? "text" : "password"}
                    onChange={(e) => {setPass(e.target.value)}}
                    size="small"
                    required
                />
                <i className={classes.eyeicon} onClick={togglePasswordVisiblity}> <VisibilityIcon/> </i>
                { errPass ? <PassErr /> : null }
                </div>
                <div className={classes.input}>
                <InputLabel htmlFor="pass2" className={classes.labels}>
                Confirm Password
                </InputLabel>

                <TextField className={classes.fields}
                    id = "pass2"
                    type={passwordShown ? "text" : "password"}
                    onChange={(e) => {setRepass(e.target.value)}}
                    size="small"
                    required
                />

                { errPassMatch ? <PassMatchErr /> : null }

                { duplicate ? <Duplicate /> : null }
                </div>

                <div className={classes.submitbuttondiv}>
                <Button className={classes.submitbutton} type="submit"  variant="contained">Create Account</Button>
                </div>
                
            </form>
            <div className={classes.backbutton}>
            <Link  style={{textDecoration:"none",color:"black"}}  to='/'><Button  variant="contained" size="small">Back</Button></Link>
            </div>
            <Success open={open}/>
        </Paper>
        </div>
        </div>
        </>
    )
}

export default Signup;