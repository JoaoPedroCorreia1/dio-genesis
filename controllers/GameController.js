class GameController {
  // constructor
  constructor() {
    // children
    this._orderController = new OrderController(this);

    this._buttonsController = new ButtonsController(this);

    // attributes
    this._score = 0;

    // objects
    this._congratulationsAudio = document.getElementById(
      "congratulations-audio"
    );
    this._mistakeAudio = document.getElementById("mistake-audio");
  }

  // getters and setters
  getButtonsController() {
    return this._buttonsController;
  }

  getOrderController() {
    return this._orderController;
  }

  // events
  eventOrderIsMatched() {
    this._buttonsController.lockButtons();

    this._orderController.resetClickedOrder();

    this.#score();
  }

  eventOrderIsNotMatched() {
    this._buttonsController.lockButtons();

    this._orderController.resetOrder();
    this._orderController.resetClickedOrder();

    this.#gameOver();
  }

  // public functions
  playGame() {
    this._buttonsController.lockButtons();

    alert("Bem vindo ao Gênesis! Iniciando novo jogo!");

    this._score = 0;

    this._orderController.resetOrder();
    this._orderController.resetClickedOrder();

    this.#nextLevel();
  }

  // private functions
  #gameOver() {
    this._mistakeAudio.play();

    alert(
      `Pontuação: ${this._score}!
            \nVocê perdeu o jogo!
            \nClique em OK para iniciar um novo jogo`
    );

    this.playGame();
  }

  #score() {
    this._score++;

    this._congratulationsAudio.play();

    alert(
      `Pontuação: ${this._score}
            \nVocê acertou! Iniciando próximo nível!`
    );

    this.#nextLevel();
  }

  #nextLevel() {
    setTimeout(
      () => {
        this._orderController.addRandomButton();

        this.#displayOrder();
      },
      1000
    );
  }

  #displayOrder() {
    let order = this._orderController.getOrder();

    this._buttonsController.displayInOrder(order);
  }
}
