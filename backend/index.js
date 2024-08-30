const app = require('./app');

const port = process.env.PORT || 8000;

const database = require('./database/index')
database();




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    })