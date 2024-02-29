import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { QuestionType } from "../interfaces/question";

export function ChangeType(): JSX.Element {
    const [questionType, setQuestionType] = useState<QuestionType>(
        "short_answer_question"
    );

    function changeQuestionType(): void {
        let newType: QuestionType;
        if (questionType === "short_answer_question") {
            newType = "multiple_choice_question";
        } else {
            newType = "short_answer_question";
        }
        setQuestionType(newType);
    }

    return (
        <div>
            <Button onClick={changeQuestionType}>Change Type</Button>
            {questionType === "short_answer_question" ? (
                <div>Short Answer</div>
            ) : (
                <div>Multiple Choice</div>
            )}
        </div>
    );
}
