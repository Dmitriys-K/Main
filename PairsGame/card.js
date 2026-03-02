export class Card {
  _open = false
  _success = false

  constructor(container, cardNumber, flip) {
    this.flip = flip
    this.cardNumber = cardNumber
    this.container = container
    // this.card = this.createElement()
    // this.container.append(this.card)
  }

  createElement() {
    const card = document.createElement('div')
    card.classList.add('card')
    card.addEventListener('click', () => {
      this.flip(this);
    })
    card.append(this.cardNumber)

    return card

  }
  set cardNumber(value) {
    this.cardText = document.createElement('span')
    this.cardText.classList.add('cardText')
    this.cardText.textContent = value
  }
  get cardNumber() {
    return this.cardText
  }



  set open(value) {
    this._open = value;
    value ? this.card.classList.add('open') : this.card.classList.remove('open');
  }

  get open() {
    return this._open;
  }

  set success(value) {
    this._success = value;
    value ? this.card.classList.add('success') : this.card.classList.remove('success');
  }

  get success() {
    return this._success;
  }

}

export class AmazingCard extends Card {

  constructor(container, cardNumber, flip) {
    super(container, cardNumber, flip)

    this.card = super.createElement()
    this.container.append(this.card)

  }

  set cardNumber(value) {

    const cardsImgArray = [
      './img/1.png',
      './img/2.png',
      './img/3.png',
      './img/4.png',
      './img/5.png',
      './img/6.png',
      './img/7.png',
      './img/8.png',
      './img/9.png',
      './img/10.png',
    ]

    this.img = document.createElement('img')
    this.img.classList.add('card-img')
    this.img.src = cardsImgArray[value]
    this.img.onerror = () => {
      this.img.src = './img/default.png'
      const err =  new Error('Не удалось загрузить изображение')
      const errMess = document.createElement('p')
      errMess.classList.add('err-message')
      errMess.textContent = err.message
      this.card.append(errMess)



    }
  }

  get cardNumber() {
    return this.img
  }
}

