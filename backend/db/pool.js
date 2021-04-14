const Pool =require("pg").Pool;
const pool =new Pool({
    user: "postgres",
    password: "credcred",
    database: "cred",
    host:"database-2.cwtgiopyh01w.us-east-2.rds.amazonaws.com",
    port:5432
});
module.exports=pool;