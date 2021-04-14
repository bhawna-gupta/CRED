const  pool = require('../db/pool.js');

let{
  empty,isValidCard
} = require( '../helpers/validations');
let {
  errorMessage, successMessage, status,
} =require( '../helpers/status');
let { UpdateBalanceQuery, FetchBalanceQuery, CategoryQuery, ExpenseQuery , AddCardQuery,getAllCardsQuery,getAllStatementsQuery,OrigAmountFetchQuery,AddStatementQuery,deleteCardQuery, IncomeQuery} = require('../db/query.js');


//Add a Card
const AddCard = async (req, res) => {
  const {card_number,expiry_date,name_on_card}= req.body;
  const {
     user_id,
  } = req.user;
  if (empty(card_number) || empty(expiry_date) || empty(name_on_card)) {
    errorMessage.error = 'Card Number, Expiry Date and Name on Card field cannot be empty';
    return res.status(status.bad).send(errorMessage);
  }
  if(!isValidCard(card_number))
  {
    errorMessage.error = 'Please Enter a Valid Card Number';
    return res.status(status.bad).send(errorMessage);
  }
 
  const values = [
    card_number,
    expiry_date,
    name_on_card,
    user_id,
  ];
  try 
  {
      const { rows } = await pool.query(AddCardQuery, values); 
      return res.sendStatus(status.created);
  } 
  catch (error) 
  {
      if (error.routine === '_bt_check_unique') 
      {
        errorMessage.error = 'Card Number is taken already';
        return res.status(status.conflict).send(errorMessage);
      }
      errorMessage.error = 'Unable to add card';
      return res.status(status.error).send(errorMessage);
  }
};

//Get All Cards
const getAllCards = async (req, res) => {
  const { user_id } = req.params;
    try {
      const  {rows} = await pool.query(getAllCardsQuery, [user_id]);
      const dbResponse = rows;
      if (dbResponse[0] === undefined) {
        errorMessage.error = 'You have no cards';
        return res.status(status.notfound).send(errorMessage);
      }
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage);
    } catch (error) {
      errorMessage.error = 'An error Occured';
      return res.status(status.error).send(errorMessage.error);
    }
};

// Get All Statements
const getAllStatements = async (req, res) => {
  const {card_id,year,month}=req.params;
    try {
      const { rows } = await pool.query(getAllStatementsQuery, [card_id,year,month]);
      const dbResponse = rows;
      if (dbResponse[0] === undefined) {
        errorMessage.error = 'You have no transactions for given Year and Month';
        return res.status(status.notfound).send(errorMessage);
      }
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage);
    } catch (error) {
      errorMessage.error = 'An error Occured';
      return res.status(status.error).send(errorMessage);
    }
};

//Pay Bill
const PayBill = async (req, res) => {
  const {card_id}=req.params;
  const {amount_to_pay}=req.body;
  try {
    const { rows } = await pool.query(OrigAmountFetchQuery, [card_id]);
    const dbResponse = rows[0];
    const orig_balance=dbResponse.balance;
    if(orig_balance>amount_to_pay)
         new_balance=orig_balance-amount_to_pay;
    else
    {
          new_balance=amount_to_pay-orig_balance;
          new_balance*=-1;
    }
    const rows_=await pool.query(UpdateBalanceQuery,[new_balance,card_id]);
    const dbReseponseForBalance=rows_.rows[0];
    successMessage.data = dbReseponseForBalance.balance;
    return res.status(status.success).send(successMessage);
  } 
  catch (error) {
    return res.status(status.error).send(error);
  }
};

//Add a Statement
const AddStatement = async (req, res) => {
  const {card_id,year,month}=req.params;
  const {amount,vendor,credit_debit,date,category}=req.body;
  if (empty(amount) || empty(vendor) || empty(credit_debit)|| empty(date)) {
    errorMessage.error = 'amount , vendor , credit_debit ,date and category field cannot be empty';
    return res.status(status.bad).send(errorMessage);
  }
  const {rows} = await pool.query(FetchBalanceQuery,[card_id]);
  const dbResponse = rows[0];
  const old_balance=dbResponse.balance;
  let new_balance =0;
  if (credit_debit=="Credit"){
     new_balance = Number(old_balance)-amount
  }
  else{
     new_balance = Number(old_balance)+amount
  }
  const result = await pool.query(UpdateBalanceQuery,[new_balance,card_id]);
  try {
    const { rows } = await pool.query(AddStatementQuery, [amount,vendor,credit_debit,card_id,date,month,year,category]);
    const dbResponse = rows[0];
    successMessage.data =  dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Unable to add statement';
    return res.status(status.error).send(errorMessage);
  }
};

//Get Summary
const getSummary = async (req,res) => {
  const {card_id,year,month} = req.params;
  try {
  const category_query = await pool.query(CategoryQuery,[card_id,month,year]);
  const cat_summary = category_query.rows;
  const expense_query = await pool.query(ExpenseQuery,[card_id,month,year]);
  const expenses = expense_query.rows;
  const income_query = await pool.query(IncomeQuery,[card_id,month,year]);
  const income = income_query.rows;
  summary_result = [cat_summary,expenses,income]
  return res.status(status.success).send(summary_result)
  }
  catch (error) {
    errorMessage.error = 'Error';
    return res.status(status.error).send(errorMessage);
  }
}

//Delete a Card
const deleteCard = async (req, res) => {
  const { card_id } = req.body;
  try {
    const { rows } = await pool.query(deleteCardQuery, [card_id]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = 'card with given card_id does not exist';
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = {};
    successMessage.data.message = 'Card deleted successfully';
    return res.status(status.success).send(successMessage);
  } catch (error) {
    return res.status(status.error).send(error);
  }
};

module.exports ={
  AddCard,
  getAllCards,
  AddStatement,
  getAllStatements,
  PayBill,
  getSummary,
  deleteCard
};
