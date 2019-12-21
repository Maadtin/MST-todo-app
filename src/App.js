import React from 'react';
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import TodosCounter from "./components/TodosCounter";
import Container from "react-bootstrap/Container";

function App() {

    console.log('App rendered');

    return (
        <Container className="App my-5">
            <TodoForm/>
            <TodosCounter/>
            <TodoList />
        </Container>
    );
}

export default App;
