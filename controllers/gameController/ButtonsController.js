class ButtonsController {
  //constructor
  constructor(gameController) {
    // parent
    this._gameController = gameController;

    // siblings
    this._getOrderController = () => {
      return this._gameController.getOrderController();
    };

    //objects
    this._buttons = ButtonComponents.getButtons(this);
  }

  //getters and setters
  getButton(colorNumber) {
    return this._buttons[colorNumber];
  }

  //events
  eventButtonSelected(colorNumber) {
    this._getOrderController().addClickedButton(colorNumber);

    this._getOrderController().checkOrder();
  }

  //public functions
  lockButtons() {
    this._buttons.forEach((button) => {
      button.setLocked(true);
    });
  }

  unlockButtons() {
    this._buttons.forEach((button) => {
      button.setLocked(false);
    });
  }

  displayInOrder(order) {
    this.lockButtons();

    order.forEach((buttonNumber, i) => {
      let button = this._buttons[Number(buttonNumber)];

      button.display(Number(i));
    });

    let timeOfDisplay = (order.length + 1) * 800;
    setTimeout(() => {
      this.unlockButtons();
    }, timeOfDisplay);
  }
}
