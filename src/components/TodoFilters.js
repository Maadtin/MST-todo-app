import React from 'react';
import Button from "react-bootstrap/Button";
import styled from "@emotion/styled";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import useStores from "../useStores";
import {observer} from "mobx-react";

function TodoFilters({className}) {

    console.log('TodoFilters rendered');

    const { todoStore } = useStores();

    const { filter, setFilter } = todoStore;

    return (
        <div className={className}>
            <ButtonGroup>
                <Button active={filter === 'all'} onClick={_ => setFilter('all')} variant={"light"}>
                    Todos ({todoStore.todosCount})
                </Button>
                <Button active={filter === 'completed'} onClick={_ => setFilter('completed')} variant={"light"}>
                    Completados ({todoStore.completedTodos})
                </Button>
                <Button active={filter === 'incompleted'} onClick={_ => setFilter('incompleted')} variant={"light"}>
                    Por completar ({todoStore.incompletedTodos})
                </Button>
            </ButtonGroup>
        </div>
    );
}

export default styled(observer(TodoFilters))`
  margin: 30px 0;
`;