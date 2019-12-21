import React from 'react';
import useStores from "../useStores";
import {observer} from "mobx-react";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import ActionButton from "./ui/ActionButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function TodoList(props) {

    console.log('TodoList rendered');
    const {todoStore} = useStores();
    const {selectedFilter, todos} = todoStore;

    function onKeyUp(e, todo) {
        if (e.key === 'Enter') {
            todo.update({name: e.target.value}, true)
                .then(() => todo.toggleEdit());
        }
    }

    function getFilteredTodos() {
        switch (selectedFilter) {
            case 'completed':
                return todos.filter(todo => todo.completed);
            case 'incompleted':
                return todos.filter(todo => !todo.completed);
            default:
                return todos;
        }
    }

    const filteredTodos = getFilteredTodos ();

    return (
        <ListGroup className="w-50">
            {filteredTodos.map((todo, index) => (
                <ListGroup.Item key={todo.id}>
                    <Row className="form-row">
                        <Col className="d-flex align-items-center" xs={12} md={true}>
                            {todo.editing
                                ? <FormControl autoFocus={true} style={{width: '100%'}} onKeyDown={e => onKeyUp(e, todo)} type="text"
                                               defaultValue={todo.name}/>
                                : <span style={{textDecoration: todo.completed ? 'line-through' : ''}}>
                                    {todo.name}
                                </span>}
                        </Col>
                        <Col xs={12} md={5} className="d-flex justify-content-end">
                            <ActionButton title="Completar" variant="success"
                                          onClick={() => todo.update({completed: !todo.completed})}
                                          className="fas fa-check"/>
                            <ActionButton title="Editar" variant="primary" onClick={todo.toggleEdit}
                                          className="fas fa-edit mx-2"/>
                            <ActionButton title="Eliminar" variant="danger" className="fas fa-trash"
                                          onClick={todo.delete}/>
                        </Col>
                    </Row>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}

export default observer(TodoList);
