
const express = require('express');
const router = express.Router();

//GET all trips
router.get('/', (req, res) => {
    res.json({ message: 'Get all trips' });
 })

//POST a new trip
router.post('/', (req, res) => {
    res.json({ message: 'Create a new trip' });
})

//GET a trip by ID
router.get('/:id', (req, res) => {
    res.json({ message: `Get trip with ID` });
 })

//PUT update a trip
router.put('/:id', (req, res) => {
    res.json({ message: `Update trip with ID` });  
 })

//DELETE a trip
router.delete('/:id', (req, res) => {
    res.json({ message: `Delete trip with ID` });
 })

//POST invite friends to a trip
router.post('/:id/invite', (req, res) => {
    res.json({ message: `Invite friends to trip with ID` });
 })

//POST accept invitation of a trip
router.post('/:id/join', (req, res) => {
    res.json({ message: `Accept invitation to trip with ID` });
 })

module.exports = router;