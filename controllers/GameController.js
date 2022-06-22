// constructor
function GameController() {
    // children
    this._orderController = new OrderController(this);

    this._buttonsController = new ButtonsController(this);

    // attributes
    this._gameScore = 0;

    // objects
    this._congratulationsAudio = document.getElementById(
      "congratulations-audio"
    );
    this._mistakeAudio = document.getElementById("mistake-audio");
}

(function() {
  // getters and setters
  this.getButtonsController = function() {
    return this._buttonsController;
  }

  this.getOrderController = function() {
    return this._orderController;
  }

  // events
  this.eventOrderIsMatched = function() {
    this._buttonsController.lockButtons();

    this._orderController.resetClickedOrder();

    this._score();
  }

  this.eventOrderIsNotMatched = function() {
    this._buttonsController.lockButtons();

    this._orderController.resetOrder();
    this._orderController.resetClickedOrder();

    this._gameOver();
  }

  // public functions
  this.playGame = function() {
    this._buttonsController.lockButtons();

    alert("Bem vindo ao Gênesis! Iniciando novo jogo!");

    this._gameScore = 0;

    this._orderController.resetOrder();
    this._orderController.resetClickedOrder();

    this._nextLevel();
  }

  // private functions
  this._gameOver = function() {
    this._mistakeAudio.play();

    alert(
      `Pontuação: ${this._gameScore}!
            \nVocê perdeu o jogo!
            \nClique em OK para iniciar um novo jogo`
    );

    this.playGame();
  }

  this._score = function() {
    this._gameScore++;

    this._congratulationsAudio.play();

    alert(
      `Pontuação: ${this._gameScore       }
            \nVocê acertou! Iniciando próximo nível!`
    );

    this._nextLevel();
  }

  this._nextLevel = function() {
    setTimeout(
      () => {
        this._orderController.addRandomButton();

        this._displayOrder();
      },
      1000
    );
  }

  this._displayOrder = function() {
    let order = this._orderController.getOrder();

    this._buttonsController.displayInOrder(order);
  }
}).call(GameController.prototype);
