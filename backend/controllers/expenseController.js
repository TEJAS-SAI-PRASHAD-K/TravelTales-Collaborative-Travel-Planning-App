const Expense = require('../models/expenseModel');

// GET all expenses
const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find()
            .populate('tripId paidBy splitBetween.user');
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST a new expense
const addExpense = async (req, res) => {
    try {
        const expense = new Expense(req.body);
        const savedExpense = await expense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// PUT update an expense
const updateExpense = async (req, res) => {
    try {
        const { expenseId } = req.params;
        const updatedExpense = await Expense.findByIdAndUpdate(expenseId, req.body, { new: true });
        if (!updatedExpense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE an expense
const deleteExpense = async (req, res) => {
    try {
        const { expenseId } = req.params;
        const deletedExpense = await Expense.findByIdAndDelete(expenseId);
        if (!deletedExpense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense deleted successfully', deletedExpense });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET all expenses for a specific trip
const getExpensesByTrip = async (req, res) => {
    try {
        const { tripId } = req.query; // expects /summary?tripId=...
        if (!tripId) {
            return res.status(400).json({ error: 'tripId is required in query parameters' });
        }

        const expenses = await Expense.find({ tripId })
            .populate('paidBy splitBetween.user');

        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpensesByTrip,
};
