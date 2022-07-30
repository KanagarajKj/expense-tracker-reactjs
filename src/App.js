import React, { useState, useReducer, useEffect } from 'react';
import './index.css';
import { v4 as uuidv4 } from 'uuid';
import {IncomeExpense} from './components/IncomeExpense';


const getLocalStorageData = () => {
  let localGroceries = localStorage.getItem('groceries');

  if (localGroceries) {
    localGroceries = JSON.parse(localStorage.getItem('groceries'));
    return localGroceries;
  } else {
    return [];
  }
};

getLocalStorageData();

const App = () => {
  const [grocery, setGrocery] = useState('');
  const [amount, setAmount] = useState('');

  const initialState = {
    deals: getLocalStorageData(),
  };

  const reducer = (state, action) => {
    if (action.type === 'ADD_NEW_TRANSACTION') {
      const addTransaction = [...state.deals, action.payload];

      return {
        ...state,
        deals: addTransaction,
      };
    }

    if(action.type === 'DELETE_PERSON'){
      const updatedDeals = state.deals.filter(
        (deal) => deal.id !== action.payload
      );
      return {
        ...state,
        deals: updatedDeals,
      };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const submitHandler = (e) => {
    e.preventDefault();

    if (grocery && amount) {
      let newtransaction = { id: uuidv4(), grocery, amount };
      dispatch({ type: 'ADD_NEW_TRANSACTION', payload: newtransaction })
      setGrocery('');
      setAmount('');
    }else {
      alert('Enter the Details')
    }
  };

  useEffect(() => {
    localStorage.setItem('deals', JSON.stringify(state.deals));
  }, [state.deals]);

  return (
    <section className="app_container">
      <div className="title">
        <h2>Expense Tracker</h2>
      </div>

      <div>
        <IncomeExpense deals={state.deals} />
      </div>

      <span className="history">
        <h3>History</h3>
      </span>
      <div>
        <ul className="list">
          {state.deals.map((deal) => {
            return (
              <li key={deal.id}>
                <span>{deal.grocery}</span>
                <span> ₹.{deal.amount}</span>
                <button
                  className="delete_btn"
                  onClick={() =>
                    dispatch({ type: 'DELETE_PERSON', payload: deal.id })
                  }
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <form className="form" onSubmit={submitHandler}>
        <h3>Add New Transaction</h3>
        <div className="form_control">
          <label htmlFor="name">Transaction</label>
          <input
            type="text"
            name="grocery_name"
            id="name"
            placeholder="Enter Transaction"
            value={grocery}
            onChange={(e) => setGrocery(e.target.value)}
          />
        </div>
        <div className="form_control">
          <label htmlFor="amount">
            Amount (negative - expense, positive - income)
          </label>
          <input
            type="number"
            name="grocery_amount"
            id="amount"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">
          Add Transaction
        </button>
      </form>
    </section>
  );
};

export default App;
