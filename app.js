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
app.options('*', cors());


//FOR STATIC FILE ACCESS
app.use(express.static(__dirname+'/public'));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/story', storyRouter);

module.exports = app;