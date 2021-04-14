//All User Queries
const createUserQuery = 'INSERT INTO users(email, name,password,mobile) VALUES($1, $2, $3, $4) returning *';
const signinUserQuery = `SELECT * FROM users WHERE email = $1`;

//All Cards Queries
const AddCardQuery = `INSERT INTO cards(card_number,expiry_date,name_on_card,user_id) VALUES($1, $2, $3, $4) returning *`;
const getAllCardsQuery = 'SELECT * FROM cards WHERE user_id = $1 order by card_id desc';
const getAllStatementsQuery = 'Select  transaction_id, date ,vendor ,credit_debit, amount ,category from transactions where card_id =$1 and year=$2 and month=$3 order by date desc';
const OrigAmountFetchQuery='select balance from cards where card_id=$1';
const AddStatementQuery = 'INSERT INTO transactions(amount,vendor,credit_debit,card_id,date,month,year,category) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
const deleteCardQuery = 'DELETE FROM cards WHERE card_id=$1 returning *';
const UpdateBalanceQuery = 'Update cards set balance =$1 where card_id=$2  returning *';
const FetchBalanceQuery='select balance from cards where card_id=$1';
const CategoryQuery="SELECT category, sum(amount) amount from transactions where credit_debit='Debit' and card_id=$1 and month=$2 and year=$3 group by category";
const ExpenseQuery="SELECT date,amount from transactions where credit_debit='Debit' and card_id=$1 and month=$2 and year=$3 order by date asc";
const IncomeQuery="SELECT date,amount from transactions where credit_debit='Credit' and card_id=$1 and month=$2 and year=$3 order by date asc";



module.exports={
    IncomeQuery, ExpenseQuery, CategoryQuery, FetchBalanceQuery, UpdateBalanceQuery, 
    AddCardQuery,getAllCardsQuery,getAllStatementsQuery,OrigAmountFetchQuery,createUserQuery,
     signinUserQuery, AddStatementQuery,deleteCardQuery}
