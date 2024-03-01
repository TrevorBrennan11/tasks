import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function EditMode(): JSX.Element {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("Your Name");
    const [isStudent, setIsStudent] = useState<boolean>(true);

    function updateEditing(event: React.ChangeEvent<HTMLInputElement>) {
        setIsEditing(event.target.checked);
    }

    function updateUsername(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }

    function updateStudent(event: React.ChangeEvent<HTMLInputElement>) {
        setIsStudent(event.target.checked);
    }

    return (
        <div>
            {!isEditing &&
                (isStudent ? (
                    <div>{username} is a student.</div>
                ) : (
                    <div>{username} is not a student.</div>
                ))}
            {isEditing && (
                <Form.Group controlId="formEditMode">
                    <Form.Control value={username} onChange={updateUsername} />
                    <Form.Check
                        type="checkbox"
                        id="is-student-box"
                        label="Student"
                        checked={isStudent}
                        onChange={updateStudent}
                    />
                </Form.Group>
            )}
            <Form.Check
                type="switch"
                id="edit-mode-check"
                label={isEditing ? "Done" : "Edit"}
                checked={isEditing}
                onChange={updateEditing}
            />
        </div>
    );
}
