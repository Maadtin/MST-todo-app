import React, {useState} from 'react';
import useStores from "../useStores";
import {observer} from "mobx-react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function TodoForm(props) {
    console.log('TodoForm rendered');
    const {todoStore} = useStores();
    const [name, setName] = useState('');
    return (
        <Form className="mb-4" inline onSubmit={e => {
            e.preventDefault();
            if (!name)
                return;
            todoStore.add({name});
            setName('');
        }}>
            <Form.Group>
                <Form.Control className="mr-2" placeholder="Todo name" type="text" value={name} onChange={e => setName(e.target.value)}/>
                <Button disabled={!name} size={"lg"} className={"fas fa-plus"} type="submit" variant={"primary"} />
            </Form.Group>
        </Form>
    );
}

export default observer(TodoForm);
