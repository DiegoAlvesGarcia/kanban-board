const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname + '/dist/kanban-board'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/kanban-board/index.html');
});

app.listen(PORT, () => {
    console.log('Servidor iniciado na porta ' + PORT);
})