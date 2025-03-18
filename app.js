const express   = require('express');
const morgan    = require('morgan');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const projectRouter = require('./routes/projectRoutes');
const taskRouter = require('./routes/taskRoutes');
const storyRouter = require('./routes/storyRoutes');

const app = express();
const errorhandler = require('./helpers/error-handler')

app.use(morgan('dev'));
app.use(express.json());
app.use(errorhandler);

app.use(cors());

// OR manually set headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // ✅ Allow all origins (change * to specific domain for security)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.options('*', cors());


//FOR STATIC FILE ACCESS
app.use(express.static(__dirname+'/public'));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/story', storyRouter);

module.exports = app;