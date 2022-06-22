// constructor
function Button(
  buttonController,
  webElement,
  colorNumber,
  clickAudio) {
  // parent
  this._buttonController = buttonController;

  // attributes
  this._webElement = webElement;
  this._colorNumber = colorNumber;

  this._clickAudio = clickAudio;

  this._displayTime = 650;
  this._clickedTime = 500;

  this._inAnimation = false;

  this._locked = true;

  // listeners
  this._webElement.addEventListener("click", (e) => { this.eventOnClick(); });
}

(function() {
  // getters and setters
  this.setLocked = function (value) {
    this._locked = value;
  }

  // events
  this.eventOnClick = function () {
    if (this._inAnimation === false && this._locked === false) {
      this._select(this._clickedTime);
      this._buttonController.eventButtonSelected(this._colorNumber);
    }
  }

  // public methods
  this.display = function (numberOrder) {
    let displayOrderTime = (numberOrder + 1) * 800;

    setTimeout(() => {
      this._select(this._displayTime);
    }, displayOrderTime);
  }


  // private methods
  this._playClickAudio = function () {
    this._clickAudio.pause();
    this._clickAudio.currentTime = 0;

    this._clickAudio.play();
  }

  this._select = function (selectedTime) {
    this._playClickAudio();

    this._inAnimation = true;
    this._webElement.classList.add("selected");

    setTimeout(() => {
      this._inAnimation = false;
      this._webElement.classList.remove("selected");
    }, 
    selectedTime);
  }
}).call(Button.prototype);
