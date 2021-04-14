import React from 'react';
import {useState, useEffect } from 'react';
import axios from 'axios';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Button, Select, MenuItem, TextField, Paper } from '@material-ui/core';
import PollIcon from '@material-ui/icons/Poll';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Image from '../../assets/images/no_trans.png'
import { DataGrid, GridToolbarContainer,GridToolbarExport} from '@material-ui/data-grid';
import UserProfile from '../UserProfile';
import Graphs from './graphs/graphs';

const useStyle = makeStyles({
    datagrid: {
        color:"#F2F9F6",
        '&.MuiDataGrid-footer':{
            color:"#F2F9F6"
        }
    },
});

const Statement = (props) =>{
    const classes = useStyles();
    const grid_class = useStyle();
    const [id,setCardID] = useState(props.location.state.id);
    const [noTrans, setNoTrans] = useState(false)
    const [graphs,setGraphs] = useState(false);
    const token = UserProfile.getToken();
    const [page,setPage] = useState(0);
    const curdate = new Date();
    let curmonth = (curdate.getMonth())+1;
    if (curmonth<10){
        curmonth = '0'+curmonth;
    }
    else{
        curmonth = curmonth.toString();
    }
    const curyear = curdate.getFullYear().toString();
    const [month,setMonth] = useState(curmonth);
    const [year,setYear] = useState(curyear);
    const [newmonth,setNewMonth] = useState('');
    const [newyear,setNewYear] = useState('');
    const [filter_err,setFilterErr] = useState(false);
    const month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {

        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/cards/${id}/statements/${year}/${month}`,
                {headers:{"token":`${token}`}}
            )
            .then((response) => response.data)
            .then((transactionsData) => {
                console.log(transactionsData);
                setTransactions(transactionsData.data);
                setNoTrans(false);
            })
          .catch((error) => {
            if(error.response.status===404){
                setTransactions([]);
                setNoTrans(true);
            }              
          });
    }, []);

    


    const No_Transactions = () => (
        <>
            <div className={classes.notrans_div}>
                <div className={classes.notrans}>
                <div className={classes.imgdiv}>
                <img src={Image} height="100px"/>
                </div>
                <h3>No transactions</h3>
                <h5>Couldn't fetch any transactions for this month</h5>
                </div>
            </div>
        </>
        )
    
    


    const Validate = () => {
        let valid = true;
        if ((newyear>curyear) || (newmonth>curmonth && newyear===curyear)){
            valid = false
        }
        return valid;
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (Validate()){
            setFilterErr(false)
            axios
                .get(`${process.env.REACT_APP_BACKEND_URL}/cards/${id}/statements/${newyear}/${newmonth}`,
                {headers:{"token":`${token}`}}
                
                )
                .then((response) => response.data)
                .then((transactionsData) => {
                    console.log(transactionsData);
                    setTransactions(transactionsData.data);
                    setNoTrans(false);
                })
            .catch((error) => {
                if(error.response.status===404){
                    setTransactions([]);
                    setNoTrans(true);
                }
            });

            setMonth(newmonth);
            setYear(newyear)
        }
        else{
            setFilterErr(true)
        }
    }

    const handleGraph = (e) =>{
        setGraphs(!graphs)
    }

    const ExportToolbar = () => (
        <>
            <GridToolbarContainer >
              <GridToolbarExport  />
            </GridToolbarContainer>
        </>
    )
        



    return (
        <>
        <div className={classes.main}>
        <div className={classes.paper_container}>
        <Paper className={classes.paper}>
        <div className={classes.backbutton} >
        <Link style={{textDecoration:"none",color:"black"}}  to='/cards'>
            <Button  variant="contained"  size="small"><KeyboardBackspaceIcon /></Button>
        </Link>
        </div>
        <h2 className={classes.heading}> Transactions in {month_names[month-1]} {year}</h2>
        <form className={classes.form} onSubmit={handleSubmit}>
        <label className={classes.label} htmlFor="select_month" >Month</label>
        <Select
          className={classes.select} 
          id="select_month"
          onChange={(e) => {setNewMonth(e.target.value)}}
          placeholder="Month"
          required
        >
          <MenuItem value={"01"}>January</MenuItem>
          <MenuItem value={"02"}>February</MenuItem>
          <MenuItem value={"03"}>March</MenuItem>
          <MenuItem value={"04"}>April</MenuItem>
          <MenuItem value={"05"}>May</MenuItem>
          <MenuItem value={"06"}>June</MenuItem>
          <MenuItem value={"07"}>July</MenuItem>
          <MenuItem value={"08"}>August</MenuItem>
          <MenuItem value={"09"}>September</MenuItem>
          <MenuItem value={"10"}>October</MenuItem>
          <MenuItem value={"11"}>November</MenuItem>
          <MenuItem value={"12"}>December</MenuItem>
        </Select>
        <label className={classes.label} htmlFor="year" >Year</label>
        <TextField className={classes.fields}
                id = "year"
                variant="outlined"
                onChange={(e) => {setNewYear(e.target.value)}}
                inputProps={{ 
                    className: classes.fields,
                    maxLength: 4 }}
                size="small"
                placeholder="Year"
                required
        />
         <Button className={classes.button} disabled={graphs} type="submit"  color="primary" size="small" variant="contained">Search</Button>
         <div className={classes.icon} style={{display: noTrans ? "none" : "inline" }}>
         <i>
         <PollIcon className={classes.pollicon} onClick={handleGraph} />
         </i>
        </div>
        </form>

        { filter_err ? <p style={{color:"red", marginTop:"-15px",marginBottom:"0"}}>Enter valid month and year</p> : null }
        
        <div className={classes.grid} style={{display: (noTrans || graphs) ? "none" : "block" }}>
        <DataGrid
        className={grid_class.datagrid}
        page={page}
        onPageChange={(params) => {
          setPage(params.page);
        }}
        Footer = {{
            color:"whitesmoke"
        }}
        pageSize={5}
        pagination
        getRowId = {(row) => row.transaction_id}
        columns = {[{ field: 'date', headerName: 'Date', width: 150}, 
        { field: 'vendor', headerName: 'Vendor', width: 200 }, 
        { field: 'credit_debit', headerName: 'Credit/Debit', width: 120 }, 
        { field: 'amount', headerName: 'Amount', width: 150 },
        { field: 'category', headerName: 'Category', width: 130 }]}
        rows = {transactions}
        components={{
            Toolbar: ExportToolbar,
        }}
        />
        </div>

        {noTrans ? <No_Transactions/> : null }

        
        {graphs ? <Graphs id={id} month={month} year={year} /> : null}


        
        
        </Paper>
        </div>
        </div>
        </>
    )
}

export default Statement;