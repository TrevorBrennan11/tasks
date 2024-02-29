import React, { useState } from "react";

export function RevealAnswer(): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false);

    function flipVisibility(): void {
        setVisible(!visible);
    }

    return (
        <div>
            <button onClick={flipVisibility}>Reveal Answer</button>
            {visible && <label>42</label>}
        </div>
    );
}
