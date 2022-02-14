let gameController;

const runApp = () => {

    gameController = new GameController();

    gameController.playGame();

};

window.onload = runApp;
