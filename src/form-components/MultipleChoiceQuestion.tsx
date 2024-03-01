import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function MultipleChoiceQuestion({
    options,
    expectedAnswer
}: {
    options: string[];
    expectedAnswer: string;
}): JSX.Element {
    const [answer, setAnswer] = useState<string>(options[0]);
    return (
        <div>
            <Form.Group controlId="formOptions">
                <Form.Select
                    value={answer}
                    onChange={(o) => setAnswer(o.target.value)}
                >
                    {options.map((option: string) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <label>{answer === expectedAnswer ? "✔️" : "❌"}</label>
        </div>
    );
}
