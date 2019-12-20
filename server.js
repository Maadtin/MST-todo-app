const express = require('express');
const cors = require('cors');
const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'todo_mst',
        typeCast: (field, next) => {
            console.log('TypeCasting', field.type, field.length);
            if (field.type == 'TINY' && field.length == 1) {
                let value = field.string();
                return value ? (value == '1') : null;
            }
            return next();
        }
    }
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/todos', async (req, res) => {
    const todos = await knex.from('todos').orderBy('id', 'desc');
    res.json(todos)
});

app.get('/todos/:id', async (req, res) => {
    const todo = await knex.table('todos').where('id', req.params.id).first();
    if (!todo)
        return res.status(404).json({message: 'Todo not found'});
    return res.json(todo);
});

app.post('/todos', async (req, res) => {
    const todoId = await knex.table('todos').insert(req.body);
    const todo = await knex.table('todos').where('id', todoId).first();
    return res.json(todo);
});

app.put('/todos/:id', async (req, res) => {
    const updated = await knex('todos')
        .where('id', req.params.id)
        .update(req.body);
    if (!updated) {
        return res.status(413).json({message: 'Could not update todo'})
    }
    const todo = await knex.table('todos').where('id', req.params.id).first();
    return res.json(todo);
});

app.delete('/todos:id', async (req, res) => {
    const deleted = await knex.where('id', req.params.id).delete();
    if (!deleted) {
        return res.status(413).json({message: 'Could not delete todo'})
    }
    return res.json({messsage: 'Todo deleted succesfully'})
});

app.listen(5000, () => console.log('Server started on http://localhost:5000'));