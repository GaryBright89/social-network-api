const express = require('express');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

Db.once('once', () => {
    app.listen(PORT, () => {
        console.log(`Now listening to http://localhost:${PORT}`);
    });
});