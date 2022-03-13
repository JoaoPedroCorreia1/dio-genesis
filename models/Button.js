class Button {
  // constructor
  constructor(buttonController, webElement, colorNumber, clickAudio) {
    // scripts
    this._buttonController = buttonController;

    // attributes
    this._webElement = webElement;
    this._colorNumber = colorNumber;

    this._clickAudio = clickAudio;

    this._displayTime = 650;
    this._clickedTime = 500;

    this._isInAnimation = false;

    this._locked = true;

    this._webElement.addEventListener("click", (e) => {
      this.eventOnClick();
    });
  }

  // getters and setters
  setLocked(value) {
    this._locked = value;
  }

  // events
  eventOnClick() {
    if (this._isInAnimation === false && this._locked === false) {
      this.#select(this._clickedTime);
      this._buttonController.eventButtonSelected(this._colorNumber);
    }
  }

  // public functions
  display(numberOrder) {
    let displayOrderTime = (numberOrder + 1) * 800;

    setTimeout(() => {
      this.#select(this._displayTime);
    }, displayOrderTime);
  }

  // private functions
  #playClickAudio() {
    this._clickAudio.pause();
    this._clickAudio.currentTime = 0;

    this._clickAudio.play();
  }

  #select(selectedTime) {
    this.#playClickAudio();

    this._isInAnimation = true;

    this._webElement.classList.add("selected");

    setTimeout(() => {
      this._isInAnimation = false;

      this._webElement.classList.remove("selected");
    }, selectedTime);
  }
}
