const express = require('express');
const app = express();
const PORT = 4200;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});