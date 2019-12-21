import React from 'react';
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import Container from "react-bootstrap/Container";
import TodoFilters from "./components/TodoFilters";

function App() {

    console.log('App rendered');

    return (
        <Container className="App my-5">
            <TodoForm/>
            <TodoFilters/>
            <TodoList />
        </Container>
    );
}

export default App;
