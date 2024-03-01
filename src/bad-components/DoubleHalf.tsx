import React, { useState } from "react";
import { Button } from "react-bootstrap";

interface setValueProps {
    //Type is a function that consumes a nothing and returns nothing
    setValue: () => void;
}

function Doubler({ setValue }: setValueProps): JSX.Element {
    return <Button onClick={setValue}>Double</Button>;
}

function Halver({ setValue }: setValueProps): JSX.Element {
    return <Button onClick={setValue}>Halve</Button>;
}

export function DoubleHalf(): JSX.Element {
    const [value, setValue] = useState<number>(10);
    const doubleValue = () => setValue(value * 2);
    const halfValue = () => setValue(value * 0.5);
    return (
        <div>
            <h3>Double Half</h3>
            <div>
                The current value is: <span>{value}</span>
            </div>
            <Doubler setValue={doubleValue}></Doubler>
            <Halver setValue={halfValue}></Halver>
        </div>
    );
}
