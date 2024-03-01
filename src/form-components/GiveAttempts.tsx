import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export function GiveAttempts(): JSX.Element {
    const [numAttempts, setNumAttempts] = useState<number>(3);
    const [numRequested, setNumRequested] = useState<number>(0);

    function addAttempts() {
        if (!isNaN(numRequested)) {
            setNumAttempts(numAttempts + numRequested);
        }
    }

    return (
        <div>
            <Form.Group controlId="formGiveAttempts">
                <Form.Label>{numAttempts}</Form.Label>
                <Form.Control
                    type="number"
                    value={numRequested}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setNumRequested(parseInt(event.target.value))
                    }
                />
                <Button onClick={addAttempts}>gain</Button>
                <Button
                    onClick={() => setNumAttempts(numAttempts - 1)}
                    disabled={numAttempts <= 0}
                >
                    use
                </Button>
            </Form.Group>
        </div>
    );
}
