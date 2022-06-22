var OrderController = (function () {
  //constructor
  function OrderController(gameController) {
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
  OrderController.prototype.getOrder = function () {
    return this._order;
  }

  // public functions
  OrderController.prototype.addClickedButton = function (colorNumber) {
    this._clickedOrder.push(colorNumber);
  }

  OrderController.prototype.addRandomButton = function () {
    let randomColor = ButtonUtil.getRandomColor();

    this._order.push(randomColor);
  }

  OrderController.prototype.resetOrder = function () {
    this._order = [];
  }

  OrderController.prototype.resetClickedOrder = function () {
    this._clickedOrder = [];
  }

  OrderController.prototype.checkOrder = function () {
    if (!this._orderMatched()) {
      this._gameController.eventOrderIsNotMatched();
      return;
    }

    if (!this._hasMoreButtons()) {
      this._gameController.eventOrderIsMatched();
    }
  }

  // private funcions
  OrderController.prototype._hasMoreButtons = function () {
    if (this._clickedOrder.length >= this._order.length) {
      return false;
    }

    return true;
  }

  OrderController.prototype._orderMatched = function () {
    for (let button in this._clickedOrder) {
      let orderButton = this._order[button];
      let clickedButton = this._clickedOrder[button];

      if (orderButton != clickedButton) {
        return false;
      }
    }

    return true;
  }

  return OrderController;
})();
