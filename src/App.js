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
  // console.log(useState());

  // const result = useState(initialExpenses);
  // const expenses = result[0];
  // const setExpenses = result[1];

  const [expenses, setExpenses] = useState(initialExpenses);
  console.log(expenses);
  console.log(setExpenses);

  return (
    <>
      <Alert />
      <ExpenseForm />
      <ExpenseList />
    </>
  );
}

export default App;
