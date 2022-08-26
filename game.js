const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')

const jeopardyCategories = [
    {
        genre: "WHO",
        questions: [
            {
                question: "Who is Batman?",
                answers: ["DC character", "Marvel character"],
                correct: "DC character",
                level: "easy"
            },
            {
                question: "Who invented bifocals?",
                answers: ["Benjamin Franklin", "Thomas Edison"],
                correct: "Benjamin Franklin",
                level: "medium"
            },

            {
                question: "Who is the first person to go to space?",
                answers: ["Yuri Gagarin", "Neil Armstrong"],
                correct: "DC character",
                level: "hard"
            }
        ],
    },

    {
        genre: "WHERE",
        questions: [
            {
                question: "Where is Taj Mahal?",
                answers: ["Agra", "Delhi"],
                correct: "Agra",
                level: "easy"
            },

            {
                question: "Where did chernobyl disaster occured?",
                answers: ["Kyiv", "Amsterdam"],
                correct: "Kyiv",
                level: "medium"
            },

            {
                question: "Where is the femur located ?",
                answers: ["knee", "thigh"],
                correct: "thigh",
                level: "hard"
            },
        ],
    }, {
        genre: "WHEN",
        questions: [
            {
                question: "When is Durga Pujo?",
                answers: ["October", "December"],
                correct: "October",
                level: "easy"
            },

            {
                question: "When is qatar World Cup?",
                answers: ["September", "November"],
                correct: "November",
                level: "medium"
            },

            {
                question: "When is qutub minar built ?",
                answers: ["1193", "1188"],
                correct: "1193",
                level: "hard"
            },
        ],
    }, {
        genre: "WHICH",
        questions: [
            {
                question: "Which is the longest river in India?",
                answers: ["Indus", "Ganges"],
                correct: "Indus",
                level: "easy"
            },

            {
                question: "Which is the oldest religion in World?",
                answers: ["Judaism", "Hinduism"],
                correct: "Hinduism",
                level: "medium"
            },

            {
                question: "Which is the tallest man on earth ?",
                answers: ["Sultan Kosen", "the Great Khali"],
                correct: "Sultan Kosen",
                level: "hard"
            },
        ],
    }, {
        genre: "WHAT",
        questions: [
            {
                question: "What is  the number of letters present in an alphabet?",
                answers: ["23", "26"],
                correct: "26",
                level: "easy"
            },

            {
                question: "What is  a volcano?",
                answers: ["Disaster", "Nuclear Accident"],
                correct: "Disaster",
                level: "medium"
            },

            {
                question: "What does vector quantity give ?",
                answers: ["magnitude and direction", "Only magnitude"],
                correct: "magnitude and direction",
                level: "hard"
            },
        ],
    },


]


let score = 0


function addCategory(category) {
    const coloumn = document.createElement('div')
    coloumn.classList.add('genre-coloumn')


    const genreTitle = document.createElement('div')
    genreTitle.classList.add('genre-title')
    genreTitle.innerHTML = category.genre
    coloumn.appendChild(genreTitle)
    game.append(coloumn)

    category.questions.forEach(question => {
        const card = document.createElement('div')
        card.classList.add('card')
        coloumn.append(card)

        if (question.level === 'easy') {
            card.innerHTML = 100
            card.setAttribute('data-value', 100)
        }
        if (question.level === 'medium') {
            card.innerHTML = 200
            card.setAttribute('data-value', 200)
        }
        if (question.level === 'hard') {
            card.innerHTML = 300
            card.setAttribute('data-value', 300)
        }
        card.setAttribute('data-question', question.question)
        card.setAttribute('data-answer-1', question.answers[0])
        card.setAttribute('data-answer-2', question.answers[1])
        card.setAttribute('data-correct', question.correct)
        card.addEventListener('click', flipCard)
    })


}
jeopardyCategories.forEach(category => addCategory(category))
function flipCard() {
    this.innerHTML = ""
    this.style.fontSize = "15px"
    this.style.lineHeight = "30px"
    const textDisplay = document.createElement('div')
    textDisplay.classList.add('card-text')
    textDisplay.innerHTML = this.getAttribute('data-question')
    const firstButton = document.createElement('button')
    const secondButton = document.createElement('button')

    firstButton.classList.add('first-button')
    secondButton.classList.add('second-button')
    firstButton.innerHTML = this.getAttribute('data-answer-1')
    secondButton.innerHTML = this.getAttribute('data-answer-2')
    this.append(textDisplay, firstButton, secondButton)
    firstButton.addEventListener('click', getResult)
    secondButton.addEventListener('click', getResult)

    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.removeEventListener('click', flipCard))
}
function getResult() {
    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.addEventListener('click', flipCard))
    const cardButton = this.parentElement
    console.log(('cardButton', cardButton))
    if (cardButton.getAttribute('data-correct') == this.innerHTML) {
        score = score + parseInt(cardButton.getAttribute('data-value'))
        scoreDisplay.innerHTML = score
        cardButton.classList.add('correct-answer')
        setTimeout(() => {
            while (cardButton.firstChild) {
                cardButton.removeChild(cardButton.lastChild)
            }
            cardButton.innerHTML = cardButton.getAttribute('data-value')
        }, 100)
    } else {
        cardButton.classList.add('wrong-answer')
        setTimeout(() => {
            while (cardButton.firstChild) {
                cardButton.removeChild(cardButton.lastChild)
            }
            cardButton.innerHTML = 0
        }, 100)
    }
    cardButton.removeEventListener('click', flipCard)
}




