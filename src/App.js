import React from 'react';
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import TodosCounter from "./components/TodosCounter";

function App() {

    console.log('App rendered');

    return (
        <div className="App">
            <TodoForm/>
            <TodosCounter/>
            <TodoList/>
        </div>
    );
}

export default App;
