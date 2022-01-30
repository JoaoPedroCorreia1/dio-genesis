class Button {

    constructor(
        gameController,
        webElement,
        colorNumber,
        clickAudio
    ) {
        // scripts
        this._gameController = gameController

        // variables
        this._webElement = webElement;
        this._colorNumber = colorNumber;

        this._clickAudio = clickAudio;

        this._isInAnimation = false;

        this._locked = false;
    }

    // getters and setters
    setLocked(value)
    {
        this._locked = value;
    }
    
    // public functions
    onClick()
    {
        if(this._isInAnimation === false
        && this._locked === false)
        {
            this._clickAudio.pause();
            this._clickAudio.currentTime = 0;

            this._clickAudio.play();

            this.#select();
            this._gameController
                .eventButtonSelected(this._colorNumber);
        }
    }

    lightColor(number)
    {
        

        number = number * 800;

        setTimeout(() => {
            this._clickAudio.pause();
            this._clickAudio.currentTime = 0;

            this._clickAudio.play();
            this._webElement.classList.add('selected');
        }, 
        number - 800);

        setTimeout(() => {
            this._webElement.classList.remove('selected');
        }, 
        number - 150);
    }

    // private functions
    #select()
    {
        this._isInAnimation = true;

        this._webElement.classList.add('selected');

        setTimeout(() => {
            this._isInAnimation = false;

            this._webElement.classList.remove('selected');
        }, 
        500);
    }

}