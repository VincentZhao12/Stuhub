import React from 'react';
import { Form } from 'react-bootstrap';

function CreateClass() {
    return (
        <>
            <Form>
                <Form.Label>Class Name:</Form.Label>
                <Form.Control name="className" />
                <Form.Label>Class Description:</Form.Label>
                <Form.Control name="className" />
            </Form>
        </>
    )
}

export default CreateClass;