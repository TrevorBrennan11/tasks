import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function ChangeColor(): JSX.Element {
    const COLORS = [
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "blueviolet",
        "darkblue",
        "sienna"
    ];

    const [color, setColor] = useState<string>();
    return (
        <div>
            <h3>Change Color</h3>
            <Form.Group controlId="formChangeColor">
                {COLORS.map((colour: string) => (
                    <Form.Check
                        key={colour}
                        inline
                        type="radio"
                        name="colorPicker"
                        onChange={(c) => setColor(c.target.value)}
                        id={colour}
                        label={colour}
                        style={{ backgroundColor: colour }}
                        value={colour}
                        checked={color === colour}
                    />
                ))}
            </Form.Group>
            <div style={{ backgroundColor: color }} data-testId="colored-box">
                {color}
            </div>
        </div>
    );
}
