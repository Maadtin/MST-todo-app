import React from 'react';
import useStores from "../useStores";
import {observer} from "mobx-react";

function TodosCounter(props) {
    console.log('TodosCounter rendered');
    const {todoStore} = useStores();
    return (
        <h4 className="font-weight-lighter mb-3">
            Completed todos: {todoStore.completedTodos}
        </h4>
    );
}

export default observer(TodosCounter);
