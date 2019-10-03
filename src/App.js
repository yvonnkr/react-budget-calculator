import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import uuid from 'uuid/v4';

// const initialExpenses = [
//   { id: uuid(), charge: 'rent', amount: 1600 },
//   { id: uuid(), charge: 'car payment', amount: 400 },
//   { id: uuid(), charge: 'credit card bill', amount: 1200 }
// ];

const initialExpenses = localStorage.getItem('expenses')
  ? JSON.parse(localStorage.getItem('expenses'))
  : [];

function App() {
  // ************* State Values ************************
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  // ************* useEffect ************************
  useEffect(() => {
    console.log('useEffect called');
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // ************ functionality ************************
  const handleCharge = e => {
    setCharge(e.target.value);
  };

  const handleAmount = e => {
    setAmount(e.target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (charge !== '' && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: 'success', text: 'item edited' });
      } else {
        setExpenses([...expenses, { id: uuid(), charge, amount }]);
        handleAlert({ type: 'success', text: 'item added' });
      }
      setCharge('');
      setAmount('');
    } else {
      handleAlert({
        type: 'danger',
        text: `charge can't be empty and amount has to be greater than zero`
      });
    }
  };

  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: 'danger', text: 'all items deleted' });
  };

  const handleDelete = id => {
    const tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: 'danger', text: 'item deleted' });
  };

  const handleEdit = id => {
    let expense = expenses.find(item => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setId(id);
    setEdit(true);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <h1>budget calculator</h1>
      <main className='App'>
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
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
