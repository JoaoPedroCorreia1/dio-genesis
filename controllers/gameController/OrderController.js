class OrderController {
  //constructor
  constructor(gameController) {
    // parent
    this._gameController = gameController;

    // siblings
    this._getButtonsController = () => {
      return this._gameController.getButtonsController();
    };

    // attributes
    this._order = [];

    this._clickedOrder = [];
  }

  // getter and setters
  getOrder() {
    return this._order;
  }

  // public functions
  addClickedButton(colorNumber) {
    this._clickedOrder.push(colorNumber);
  }

  addRandomButton() {
    let randomColor = ButtonUtil.getRandomColor();

    this._order.push(randomColor);
  }

  resetOrder() {
    this._order = [];
  }

  resetClickedOrder() {
    this._clickedOrder = [];
  }

  checkOrder() {
    if (!this.#orderMatched()) {
      this._gameController.eventOrderIsNotMatched();
      return;
    }

    if (!this.#hasMoreButtons()) {
      this._gameController.eventOrderIsMatched();
    }
  }

  // private funcions
  #hasMoreButtons() {
    if (this._clickedOrder.length >= this._order.length) {
      return false;
    }

    return true;
  }

  #orderMatched() {
    for (let button in this._clickedOrder) {
      let orderButton = this._order[button];
      let clickedButton = this._clickedOrder[button];

      if (orderButton != clickedButton) {
        return false;
      }
    }

    return true;
  }
}
