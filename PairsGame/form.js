export class Form {
  constructor(container, gameFn) {
    this.container = container
    this.gameFn = gameFn
  }
  createForm() {
    this.title = document.createElement('h1')
    this.formEl = document.createElement('form')
    this.input = document.createElement('input')
    this.button = document.createElement('button')
    this.title.textContent = 'Игра в пары'
    this.button.textContent = 'начать игру'

    this.input.classList.add('input')
    this.input.placeholder = 'введите кол-во пар от 2 до 20 '
    this.input.type = 'number'
    this.button.classList.add('btn')
    this.button.type = 'submit'
    this.button.setAttribute('disabled', 'dis')
    this.button.style.opacity = 0.6;

    this.input.addEventListener('input',  () => {
      if ( this.input.value === "" || ( this.input.value < 2 ||  this.input.value > 20)) {
        this.button.setAttribute('disabled', 'dis')
        this.button.style.opacity = 0.6;
      } else {
        this.button.removeAttribute('disabled', 'dis')
        this.button.style.opacity = 1;
      }
    })

    this.formEl.addEventListener('submit',  (e) => {
      e.preventDefault()
      if (this.input.value === "" || (this.input.value < 2 || this.input.value > 20)) {
        return;
      }
      if (this.input.value % 2 !== 0) {
        this.input.value = 4;
      }
      this.container.innerHTML = ''
      this.gameFn(this.input.value)
      // startGame()
    })

    this.formEl.append(this.title, this.input, this.button)
    this.container.append(this.formEl)

  }
}
