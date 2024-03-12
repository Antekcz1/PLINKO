const apiUrl = 'https://opentdb.com/api.php?amount=10&type=multiple';

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOptionIndex;
let collisionOccurred = false;
let collisionEvent;


document.getElementById('pytanie').innerHTML = ''
const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');
const resultElement = document.getElementById('result');
const nextButton = document.getElementById('next');

async function fetchQuestions() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        questions = data.results;
        displayQuestion();
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}



function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('pytanie').innerHTML = question.question;
    optionsElement.innerHTML = '';
    const options = [...question.incorrect_answers, question.correct_answer];

    // Check the collision event and set the selectedOptionIndex accordingly
    if (collisionOccurred) {
        // Set the index for option based on the collision event
        selectedOptionIndex = determineOptionFromCollision(collisionEvent);
        // Reset collision variables for the next question
        collisionOccurred = false;
        collisionEvent = null;

        // Trigger a click event on the button associated with the correct answer
        if (selectedOptionIndex !== undefined) {
            const correctOptionButton = optionsElement.children[selectedOptionIndex];
            if (correctOptionButton) {
                correctOptionButton.click();
                return; // Exit the function to prevent additional button creation
            }
        }
    }

    // Default behavior: randomize options
    options.sort(() => Math.random() - 0.5);

    // Create buttons based on the selectedOptionIndex or randomized options
    options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => checkAnswer(option));
        optionsElement.appendChild(optionElement);
    });
}

function updateOptions() {
    // Reset the displayed options
    optionsElement.innerHTML = '';

    const question = questions[currentQuestionIndex];
    const options = [...question.incorrect_answers, question.correct_answer];

    // Sort options randomly
    options.sort(() => Math.random() - 0.5);

    // Create buttons for the updated options
    options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => checkAnswer(option));
        optionsElement.appendChild(optionElement);
    });
}

function checkAnswer(selectedOption) {
    const correctOption = questions[currentQuestionIndex].correct_answer;
    if (selectedOption === correctOption) {
        score++;
        resultElement.textContent = 'Correct!';
    } else {
        resultElement.textContent = 'Incorrect!';
    }
    nextButton.disabled = false;
    optionsElement.querySelectorAll('button').forEach(button => button.disabled = true);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        resultElement.textContent = '';
        nextButton.disabled = true;
        optionsElement.querySelectorAll('button').forEach(button => button.disabled = false);
    } else {
        showResult();
    }
}

function showResult() {
    alert(`Quiz Finished!\nYour Score: ${score} / ${questions.length}`);
    resetQuiz();
}

function resetQuiz() {
    questions = [];
    currentQuestionIndex = 0;
    score = 0;
    fetchQuestions();
}

fetchQuestions();

nextButton.addEventListener('click', nextQuestion);