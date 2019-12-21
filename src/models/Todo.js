import {destroy, flow, getParent, types} from "mobx-state-tree";
import http from "../http";

const Todo = types
    .model('Todo', {
        id: types.identifierNumber,
        name: types.string,
        editing: types.optional(types.boolean, false),
        completed: false
    })
    .actions(self => ({
        update: flow(function* (todo, updateFullObject = false) {
            const response = yield http.put(`/todos/${self.id}`, todo);
            Object.keys(response.data).forEach(key => {
                if (self.hasOwnProperty(key)) {
                    self[key] = response.data[key];
                }
            })
            // self = {...response.data}
        }),
        delete: flow(function* () {
            yield http.delete(`/todos/${self.id}`);
            getParent(self, 2).remove(self);
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
        }),
        remove(todo) {
            destroy(todo);
        }
    }));


export default TodoStore.create({
    todos: []
});
