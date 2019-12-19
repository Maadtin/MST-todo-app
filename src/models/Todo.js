import {types} from "mobx-state-tree";

const Todo = types
    .model('Todo', {
        name: types.string,
        completed: false
    })
    .views(self => ({
        get status () {
            return self.completed ? 'Completada' : 'No completada';
        }
    }))
    .actions(self => ({
        toggle() {
            self.completed = !self.completed;
        },
    }));

const TodoStore = types
    .model('TodoStore', {
        todos: types.array(Todo)
    })
    .views(self => ({
        get completedTodos() {
            return self.todos.filter(todo => todo.completed).length;
        }
    }))
    .actions(self => ({
        add(todo) {
            self.todos.push(todo);
        }
    }));


export default TodoStore.create({
    todos: [
        {name: 'Hacer una lavadora'}
    ]
});
