import { Card, AmazingCard } from "./card.js";
import { Timer } from "./timer.js";
import { Form } from "./form.js";
const gameContainer = document.getElementById('game')
const timerEl = document.getElementById('timer')
const setTimer = 60
const form = new Form(gameContainer, newGame)
form.createForm()
// let cardsCount1 = form.input.value

export function newGame(cardsCount) {
  const timer = new Timer(setTimer, timerEl)
  const countdown = setInterval(() => {
    timer.startTimer()

    if (timer.secondsLeft <= 0) {
      timer.stopTimer(countdown)
      timerEl.style.backgroundColor = 'red'
      setTimeout(() => {
        alert('Вы проиграли')
        gameContainer.innerHTML = ''
        timerEl.innerHTML = ''
        timerEl.style.backgroundColor = 'transparent'
        form.createForm()
        // newGame(cardsCount1)
      }, 300)

    }
  }, 1000)

  let cardsArray = []
  const cardNumberArray = createNumbersArray(cardsCount / 2, [])

  for (let i = 0; i < cardNumberArray.length; i++) {
    const card = new AmazingCard(gameContainer, cardNumberArray[i], function (card) {

      if (card.open === true || card.success === true) return

      if (cardsArray.length < 2) {
        card.open = true
        // card.cardNumber = true
        cardsArray.push(card)
      }

      if (cardsArray.length === 2) {
        if (cardsArray[0].cardNumber.src === cardsArray[1].cardNumber.src) {
          cardsArray[0].success = true
          cardsArray[1].success = true
          cardsArray = []
        }
        else {
          setTimeout(() => {
            cardsArray[1].open = false
            cardsArray[0].open = false
            cardsArray = []
          }, 500)
        }
      }
      if (cardNumberArray.length === document.querySelectorAll('.success').length) {
        if (timer.secondsLeft > 0) {
          setTimeout(() => {
            timer.stopTimer(countdown)
            alert('Вы выиграли')
            gameContainer.innerHTML = ''
            timerEl.innerHTML = ''
            form.createForm()
            // newGame(cardsCount1)
          }, 500)
        }

      }

    })
  }
}

function createNumbersArray(count, arr) {
  for (let i = 0; i < count; ++i) {
    arr.push(i, i);

  }
  arr.sort(() => Math.random() - 0.5)
  return arr;
}

