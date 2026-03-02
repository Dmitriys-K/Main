export class Timer {

  constructor(seconds, container) {
    this.container = container
    this.seconds = seconds
    this.currentTime = Date.now();
    this.endTime = this.currentTime + this.seconds * 1000;
    this.container.style.backgroundColor = 'transparent'

  }
  startTimer() {
    this.secondsLeft = Math.round((this.endTime - Date.now()) / 1000) + 1;
    const minutes = Math.floor(this.secondsLeft / 60);
    const reminderSeconds = this.secondsLeft % 60;
    this.container.textContent = `Осталось времени ${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`
  }

  stopTimer(countdown) {
    clearInterval(countdown)
  }
}
