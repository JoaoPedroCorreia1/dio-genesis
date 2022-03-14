const runApp = () => {
    let gameController = new GameController();

    gameController.playGame();
};

window.onload = runApp;
