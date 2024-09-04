const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const port = 5000;

connectDB();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', taskRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/",(req,res)=>{
   res.send(`<h1>backed run successfully</h1>`)
})
