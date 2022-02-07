class Button {

    // constructor
    constructor(
        gameController,
        webElement,
        colorNumber,
        clickAudio
    ) {
        // scripts
        this._gameController = gameController;

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

    lightColor(numberOrder)
    {
        let time = numberOrder * 800;

        // 650 millisec of selected time
        let selectTime = time - 800;

        let unselectTime = time - 150;

        // select
        setTimeout(
            () => {
                this._clickAudio.pause();
                this._clickAudio.currentTime = 0;

                this._clickAudio.play();
                this._webElement.classList.add('selected');
            },
            selectTime
        );

        // unselect
        setTimeout(
            () => {
                this._webElement.classList.remove('selected');
            }, 
            unselectTime
        );
    }

    // private functions
    #select()
    {
        this._isInAnimation = true;

        this._webElement.classList.add('selected');

        setTimeout(
            () => {
                this._isInAnimation = false;

                this._webElement.classList.remove('selected');
            }, 
            500
        );
    }

}