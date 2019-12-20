import {applySnapshot, flow, types} from "mobx-state-tree";
import http from "../http";

const Todo = types
    .model('Todo', {
        id: types.identifierNumber,
        name: types.string,
        editing: types.optional(types.boolean, false),
        completed: false
    })
    .views(self => ({
        get status() {
            return self.completed ? 'Completada' : 'No completada';
        }
    }))
    .actions(self => ({
        update: flow(function* (todo) {
            const response = yield http.put(`/todos/${self.id}`, todo);
            applySnapshot(self, response.data);
        }),
        toggle: flow(function* () {
            yield self.update({completed: !self.completed});
            self.completed = !self.completed;
        }),
        toggleEdit() {
            self.editing = !self.editing;
        }
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
        add: flow(function* (todo) {
            const response = yield http.post('/todos', todo);
            self.todos.unshift(response.data);
        }),
        fetchTodos: flow(function* () {
            const response = yield http.get('/todos');
            self.todos = response.data;
        })
    }));


export default TodoStore.create({
    todos: []
});
