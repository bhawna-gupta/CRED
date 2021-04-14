import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import CanvasJSReact from '../../../assets/canvasjs/canvasjs.react';
import { Grid } from '@material-ui/core';
import UserProfile from '../../UserProfile';
import useStyles from './styles';


const Graphs = (props) =>{
    const [summary_data,setData] = useState([]);
    const token = UserProfile.getToken();
    const classes = useStyles();
    const id = props.id;
    const month = props.month;
    const year = props.year;
    const CanvasJS = CanvasJSReact.CanvasJS;
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;
    var dataPoints1 = [];
    var dataPoints2 = [];
    var dataPoints3 = [];
    

    const addPointsPie = (data) => {
        for (var i in data){
            
            dataPoints1.push({
                label: data[i]["category"],
                y: Number(data[i]["amount"]),
               
            });
        }
    }

    const addPointsIncome = (data) => {
        for (var i in data){
            
            dataPoints2.push({
                x:  Number(data[i]["date"].substring(0,2)),
                label: data[i]["date"],
                y: data[i]["amount"],
               
            });
        }
    }

    const addPointsExpense = (data) => {
        for (var i in data){
            
            dataPoints3.push({
                x:  Number(data[i]["date"].substring(0,2)),
                label: data[i]["date"],
                y: data[i]["amount"],
               
            });
        }
    }

    useEffect(() => {

        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/cards/${id}/statements/${year}/${month}/summary`,
            {headers: {"token" : `${token}`}}
            )
            
            .then((response) => response.data)
            .then((data) => {
                console.log(data);
                setData(data);
            })
          .catch((error) => console.log(error));
        
    }, []);

    addPointsPie(summary_data[0])
    addPointsExpense(summary_data[1])
    addPointsIncome(summary_data[2])
    window.dispatchEvent(new Event('resize')); 

    
    const options1 = {
        animationEnabled: true,
        theme: "dark2", //"light1", "dark1", "dark2"
        title:{
            text: "Expenses"
        },
        axisY: {
            includeZero: true
        },
        data: [{
            type: "pie", //change type to bar, line, area, pie, etc
            //indexLabel: "{y}", //Shows y value on all Data Points
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints : dataPoints1,
        
        }]
    }

    const options2 = {
        animationEnabled: true,
        theme: "dark2", //"light1", "dark1", "dark2"
        title:{
            text: "Income vs Expense"
        },
        axisY: {
        },

        axisX:{
            interval: 2,
            labelFormatter: function(e){
				return  "" + e.value;
			}
        },
        data: [
            {
            type: "spline", //change type to bar, line, area, pie, etc
            //indexLabel: "{y}", //Shows y value on all Data Points
            name: "Income",
			showInLegend: true,
            dataPoints : dataPoints2,
            },

            {
                type: "spline",
                name: "Expense",
                showInLegend: true,
                dataPoints : dataPoints3,
            }
        
        ]
    }


    return (
        <>
        <div className={classes.main_div}>
        <Grid className={classes.container} container justify="space-around" alignItems="center" spacing={2}>
        <Grid item xs={12} sm={5} >
        <CanvasJSChart options = {options1} />
        </Grid>
        <Grid item xs={12} sm={5}>
        <CanvasJSChart  options = {options2} />
        </Grid>
        </Grid>
        </div>
        </>
    )
}

export default Graphs;