const express = require('express');
const router = express.Router();
const {
    getAllExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpensesByTrip
} = require('../../controllers/expenseController');

//GET all expenses
router.get('/', getAllExpenses)

//POST a new expense
router.post('/', addExpense)
 
//PUT update expense
router.put('/:expenseId', updateExpense)

//DELETE an expense
router.delete('/:expenseId', deleteExpense)

//GET all expenses for a trip
router.get('/summary', getExpensesByTrip)

module.exports = router;