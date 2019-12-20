import React from 'react';
import useStores from "../useStores";
import {observer} from "mobx-react";

function TodoList(props) {

    console.log('TodoList rendered');
    const {todoStore} = useStores();

    function onKeyUp(e, todo) {
        if (e.key === 'Enter') {
            todo.update({name: e.target.value});
            // todo.toggleEdit();
        }
    }

    return (
        <ul>
            {todoStore.todos.map((todo, index) => (
                <li style={{textDecoration: todo.completed ? 'line-through' : ''}} key={index}>
                    {todo.editing ?
                        <input onKeyDown={e => onKeyUp(e, todo)} type="text" defaultValue={todo.name}/> : todo.name}
                    <button onClick={todo.toggle}>Completar</button>
                    <button onClick={todo.toggleEdit}>Editar</button>
                </li>
            ))}
        </ul>
    );
}

export default observer(TodoList);
