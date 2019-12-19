import React from 'react';
import useStores from "../useStores";
import {observer} from "mobx-react";

function TodoList(props) {

    console.log('TodoList rendered');
    const { todoStore } = useStores();

    return (
        <ul>
            {todoStore.todos.map((todo, index) => (
                <li style={{textDecoration: todo.completed ? 'line-through' : ''}} key={index}>
                    {todo.name}
                    <button onClick={todo.toggle}>Completar</button>
                </li>
            ))}
        </ul>
    );
}

export default observer(TodoList);
