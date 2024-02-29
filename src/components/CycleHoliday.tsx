import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function CycleHoliday(): JSX.Element {
    //St.Patrick's Day: ☘️, Thanksgiving: 🦃, Christmas: 🎅, Hanukkah: 🕎, Labor Day: 👷🏽‍♀️
    //Alphabetical: 🎅, 🕎, 👷🏽‍♀️, ☘️, 🦃
    //Year: ☘️, 👷🏽‍♀️, 🦃, 🕎, 🎅
    const [holiday, setHoliday] = useState<string>("☘️");

    function nextAlphabet(): void {
        let nextHoliday = "";
        if (holiday === "🎅") {
            nextHoliday = "🕎";
        } else if (holiday === "🕎") {
            nextHoliday = "👷🏽‍♀️";
        } else if (holiday === "👷🏽‍♀️") {
            nextHoliday = "☘️";
        } else if (holiday === "☘️") {
            nextHoliday = "🦃";
        } else if (holiday === "🦃") {
            nextHoliday = "🎅";
        }
        setHoliday(nextHoliday);
    }

    function nextCalandar(): void {
        let nextHoliday = "";
        if (holiday === "☘️") {
            nextHoliday = "👷🏽‍♀️";
        } else if (holiday === "👷🏽‍♀️") {
            nextHoliday = "🦃";
        } else if (holiday === "🦃") {
            nextHoliday = "🕎";
        } else if (holiday === "🕎") {
            nextHoliday = "🎅";
        } else if (holiday === "🎅") {
            nextHoliday = "☘️";
        }
        setHoliday(nextHoliday);
    }

    return (
        <div>
            <div>Holiday: {holiday}</div>
            <Button onClick={nextAlphabet}>Alphabet</Button>
            <Button onClick={nextCalandar}>Year</Button>
        </div>
    );
}
