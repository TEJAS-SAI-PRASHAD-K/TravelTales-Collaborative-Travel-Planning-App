const express = require('express');
const router = express.Router();

//GET all expenses
router.get('/', (req, res) => {
    res.json({ mssg: "Expense fetched successfully" });
 })

//POST a new expense
router.post('/', (req, res) => {
    res.json({ mssg: "Expense added successfully" });
})
 
//PUT update expense
router.put('/:expenseId', (req, res) => {
    res.json({ mssg: "Expense updated successfully" });
 })

//DELETE an expense
router.delete('/:expenseId', (req, res) => {
    const eid = req.params.expenseId;
    res.json({ mssg: `Expense deleted successfully ${eid}` });
 })

//GET all expenses for a trip
router.get('/summary', (req, res) => {
    res.json({ mssg: "All Expense fetched successfully" });
 })

module.exports = router;