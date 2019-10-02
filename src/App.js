import React, { useState } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import uuid from 'uuid/v4';

const initialExpenses = [
  { id: uuid(), charge: 'rent', amount: 1600 },
  { id: uuid(), charge: 'car payment', amount: 400 },
  { id: uuid(), charge: 'credit card bill', amount: 1200 }
];

function App() {
  // ************* State Values ************************
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');

  // ************ functionality ************************
  const handleCharge = e => {
    setCharge(e.target.value);
  };
  const handleAmount = e => {
    setAmount(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (charge !== '' && amount > 0) {
      setExpenses([...expenses, { id: uuid(), charge, amount }]);
      setCharge('');
      setAmount('');
    } else {
      //alert
      console.log('invalid input');
    }
  };

  return (
    <>
      <Alert />
      <h1>budget calculator</h1>
      <main className='App'>
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
        />
        <ExpenseList expenses={expenses} />
      </main>
      <h1>
        total spending:{' '}
        <span className='total'>
          £
          {expenses.reduce((accumilator, currentVal) => {
            return (accumilator += parseInt(currentVal.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
