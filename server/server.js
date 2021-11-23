const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const roundsRouter = require('./routes/rounds.router');
const coursesRouter = require('./routes/courses.router');
const holeScoresRouter = require('./routes/holescores.router');
const selectedHSRouter = require('./routes/selectedHS.router');
const currentHoleRouter = require('./routes/hole.router');
const courseSearchRouter = require('./routes/coursesearch.router');
const newCourseRouter = require('./routes/newcourse.router');
const newHolesRouter = require('./routes/newholes.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/rounds', roundsRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/holescores', holeScoresRouter);
app.use('/api/selectedhole', selectedHSRouter);
app.use('/api/hole', currentHoleRouter);
app.use('/api/coursesearch', courseSearchRouter);
app.use('/api/newcourse', newCourseRouter);
app.use('/api/newholes', newHolesRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
