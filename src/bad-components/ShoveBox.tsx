import React, { useState } from "react";
import { Button } from "react-bootstrap";

interface setPositionProps {
    setPosition: () => void;
}

function ShoveBoxButton({ setPosition }: setPositionProps) {
    return <Button onClick={setPosition}>Shove the Box</Button>;
}

function MoveableBox({ position }: { position: number }): JSX.Element {
    return (
        <div
            data-testid="moveable-box"
            style={{
                width: "50px",
                height: "50px",
                backgroundColor: "lightblue",
                border: "1px solid blue",
                display: "inline-block",
                verticalAlign: "bottom",
                marginLeft: position + "px"
            }}
        ></div>
    );
}

export function ShoveBox(): JSX.Element {
    const [position, setPosition] = useState<number>(10);
    const moveBox = () => setPosition(4 + position);

    const box = MoveableBox({ position });

    return (
        <div>
            <h3>Shove Box</h3>
            {
                <>
                    <span>The box is at: {position}</span>
                    <div>
                        <ShoveBoxButton setPosition={moveBox}></ShoveBoxButton>
                        {box}
                    </div>
                </>
            }
        </div>
    );
}
