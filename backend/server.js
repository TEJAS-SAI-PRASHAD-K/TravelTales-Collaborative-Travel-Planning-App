require('dotenv').config();

const express = require('express');
const authRoutes = require('./routes/Authentication_Routes/authentication')
const expenseRoutes = require('./routes/Expense_Routes/expense')
const itineraryRoutes = require('./routes/Itinerary_Routes/itinerary')
const journalRoutes = require('./routes/Journal_Routes/journal')
const pollRoutes = require('./routes/Poll_Routes/poll')
const tripRoutes = require('./routes/Trip_Routes/trip')
const userRoutes = require('./routes/User_Routes/user')

//express app
const app = express();

//middleware

app.use(express.json()) // to parse json data
app.use((req, res, next) => {
    console.log(req.path,req.method);
    next();
});

//routes
app.use('/api/auth', authRoutes)
app.use('/api/trips/:id/expenses', expenseRoutes)
app.use('/api/trips/:id/itinerary', itineraryRoutes)
app.use('/api/trips/:id/journal', journalRoutes)
app.use('/api/trips/:id/polls', pollRoutes)
app.use('/api/trips', tripRoutes)
app.use('/api/users', userRoutes)


//listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening for requests on port', process.env.PORT);
});