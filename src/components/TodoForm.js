import React, {useState} from 'react';
import useStores from "../useStores";
import {observer} from "mobx-react";

function TodoForm(props) {
    console.log('TodoForm rendered');
    const {todoStore} = useStores();
    const [name, setName] = useState('');
    return (
        <form onSubmit={e => {
            e.preventDefault();
            todoStore.add({name});
            setName('');
        }}>
            <input type="text" value={name} onChange={e => setName(e.target.value)}/>
        </form>
    );
}

export default observer(TodoForm);
