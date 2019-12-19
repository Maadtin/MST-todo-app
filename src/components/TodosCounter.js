import React from 'react';
import useStores from "../useStores";
import {observer} from "mobx-react";

function TodosCounter(props) {
    console.log('TodosCounter rendered');
    const {todoStore} = useStores();
    return (
        <h2>
            Completed todos: {todoStore.completedTodos}
        </h2>
    );
}

export default observer(TodosCounter);
