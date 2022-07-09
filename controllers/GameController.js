class GameController {
  // constructor
  constructor() {
    // children
    this._orderController = new OrderController(this);

    this._buttonsController = new ButtonsController(this);

    // attributes
    this._maxScore = 5;
    this._score = 0;

    // objects
    this._congratsImage = new CongratsImage();

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
    this.#reset();

    alert("Bem vindo ao Gênesis!"
        + " Faça 5 pontos para Ganhar!");

    this.#newGame();
  }

  // private functions
  #newGame() {
    this.#reset();

    alert("Iniciando novo jogo!");

    this.#nextLevel();
  }

  #reset() {
    this._buttonsController.lockButtons();

    this._score = 0;

    this._orderController.resetOrder();
    this._orderController.resetClickedOrder();
  }

  #gameOver() {
    this._mistakeAudio.play();

    alert(
      `Pontuação: ${this._score}!
            \nVocê perdeu o jogo!
            \nClique em OK para iniciar um novo jogo`
    );

    this.#newGame();
  }

  #score() {
    this._score++;
    this._congratulationsAudio.play();

    if(this._score === this._maxScore) {
      this.#congratulations();
      return;
    }

    alert(
      `Pontuação: ${this._score}
            \nVocê acertou! Iniciando próximo nível!`
    );

    this.#nextLevel();
  }

  #congratulations() {
    this._congratsImage.show();

    setTimeout(() => {
      alert(
        `Pontuação: ${this._score}
        \nParabéns! Você chegou a pontuação máxima!`
      );

      this._congratsImage.hide();
      this.#newGame();
    }, 250);
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
