import { text } from "stream/consumers";
import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { addOption, duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Helper function that creates a deep copy of an array of questions
 */
export function deepCopyQuestions(questions: Question[]): Question[] {
    return questions.map(
        (question: Question): Question => ({
            id: question.id,
            name: question.name,
            body: question.body,
            type: question.type,
            options: [...question.options],
            expected: question.expected,
            points: question.points,
            published: question.published
        })
    );
}

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    return questions
        .map((question: Question): Question => ({ ...question }))
        .filter((question: Question): boolean => question.published);
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    return questions
        .map((question: Question): Question => ({ ...question }))
        .filter(
            (question: Question): boolean =>
                question.body !== "" ||
                question.expected !== "" ||
                question.options.length !== 0
        );
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number
): Question | null {
    for (const question of questions) {
        if (question.id === id) {
            return question;
        }
    }
    return null;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    return questions
        .map((question: Question): Question => ({ ...question }))
        .filter((question: Question): boolean => question.id !== id);
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    return questions.map((question: Question): string => question.name);
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    return questions.reduce(
        (currentTotal: number, question: Question) =>
            currentTotal + question.points,
        0
    );
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    return sumPoints(getPublishedQuestions(questions));
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    let result = "id,name,options,points,published\n";
    for (const question of questions) {
        result +=
            question.id +
            "," +
            question.name +
            "," +
            question.options.length +
            "," +
            question.points +
            "," +
            question.published +
            "\n";
    }
    return result.substring(0, result.length - 1);
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    return questions.map(
        (question: Question): Answer => ({
            questionId: question.id,
            text: "",
            submitted: false,
            correct: false
        })
    );
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    const newQuestions = questions.map(
        (question: Question): Question => ({ ...question })
    );
    for (const question of newQuestions) {
        question.published = true;
    }
    return newQuestions;
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    if (questions.length === 0) {
        return true;
    }
    const type = questions[0].type;
    for (const question of questions) {
        if (question.type !== type) {
            return false;
        }
    }
    return true;
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType
): Question[] {
    const newQuestions = questions.map(
        (question: Question): Question => ({ ...question })
    );
    return [...newQuestions, makeBlankQuestion(id, name, type)];
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string
): Question[] {
    const newQuestions = questions.map(
        (question: Question): Question => ({ ...question })
    );
    const targetQuestion = findQuestion(newQuestions, targetId);
    if (targetQuestion !== null) {
        targetQuestion.name = newName;
    }
    return newQuestions;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType
): Question[] {
    const newQuestions = questions.map(
        (question: Question): Question => ({ ...question })
    );
    const targetQuestion = findQuestion(newQuestions, targetId);
    if (targetQuestion !== null) {
        targetQuestion.type = newQuestionType;
        if (targetQuestion.type !== "multiple_choice_question") {
            targetQuestion.options = [];
        }
    }
    return newQuestions;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string
): Question[] {
    const newQuestions = deepCopyQuestions(questions);
    const targetQuestion = findQuestion(newQuestions, targetId);
    if (targetQuestion !== null) {
        if (targetOptionIndex === -1) {
            targetQuestion.options.splice(
                targetQuestion.options.length,
                0,
                newOption
            );
        } else {
            targetQuestion.options.splice(targetOptionIndex, 1, newOption);
        }
    }
    return newQuestions;
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number
): Question[] {
    const newQuestions = deepCopyQuestions(questions);
    const targetQuestion = findQuestion(newQuestions, targetId);
    let targetQuestionIndex = -1;
    if (targetQuestion !== null) {
        for (let i = 0; i < newQuestions.length; i++) {
            if (targetQuestion.id === newQuestions[i].id) {
                targetQuestionIndex = i;
            }
        }
        newQuestions.splice(
            targetQuestionIndex + 1,
            0,
            duplicateQuestion(newId, targetQuestion)
        );
    }
    return newQuestions;
}
