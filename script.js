const runApp = () => {
    const gameController = new GameController();

    gameController.playGame();
};

window.onload = runApp;
