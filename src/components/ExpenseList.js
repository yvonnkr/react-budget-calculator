import React from 'react';
import { MdDelete } from 'react-icons/md';
import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ expenses, clearItems, handleDelete, handleEdit }) => {
  return (
    <>
      <ul className='list'>
        {expenses.map(expense => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </ul>

      {expenses.length > 0 && (
        <button className=' btn' onClick={clearItems}>
          clear expenses <MdDelete className='btn-icon' />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
