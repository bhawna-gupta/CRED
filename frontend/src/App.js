import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import  Main  from './components/main/main';
import  Cards  from './components/cards/cards';
import  Signup  from './components/signup/signup';
import  AddCard  from './components/addcard/addcard';
import Pay from './components/pay/pay';
import Statement from './components/statement/statement';


const App = () => {
    return(
    <Router>
      <Route path="/" exact component={Main}/>
      <Route path="/signup" exact component={Signup}/>
      <Route path="/cards" exact component={Cards}/>
      <Route path="/addcard" exact component={AddCard}/>
      <Route path="/pay" exact component={Pay}/>
      <Route path="/statement" exact component={Statement}/>
    </Router>
    )
}
export default App;