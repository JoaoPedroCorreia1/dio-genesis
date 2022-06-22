//constructor
function ButtonsController(gameController) {
  // parent
  this._gameController = gameController;

  // siblings
  this._getOrderController = () => {
    return this._gameController.getOrderController();
  };

  //objects
  this._buttons = ButtonComponents.getButtons(this);
}

ButtonsController.prototype = { 
  ...ButtonsController.prototype,

  //getters and setters
  getButton: function(colorNumber) {
    return this._buttons[colorNumber];
  },

  //events
  eventButtonSelected: function(colorNumber) {
    this._getOrderController().addClickedButton(colorNumber);

    this._getOrderController().checkOrder();
  },

  //public functions
  lockButtons: function() {
    this._buttons.forEach((button) => {
      button.setLocked(true);
    });
  },

  unlockButtons: function() {
    this._buttons.forEach((button) => {
      button.setLocked(false);
    });
  },

  displayInOrder: function(order) {
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
