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

        // attributes
        this._webElement = webElement;
        this._colorNumber = colorNumber;

        this._clickAudio = clickAudio;

        this._displayTime = 650;
        this._clickedTime = 500;

        this._isInAnimation = false;

        this._locked = false;
        
    }

    // getters and setters
    setLocked(value) {

        this._locked = value;

    }
    
    // public functions
    onClick() {

        if(this._isInAnimation === false
        && this._locked === false) {

            this.#select(this._clickedTime);
            this._gameController
                .eventButtonSelected(this._colorNumber);

        }

    }

    display(numberOrder) {

        let displayOrderTime = (numberOrder + 1) * 800;

        setTimeout(
            () => { this.#select(this._displayTime); },
            displayOrderTime
        )

    }

    #playClickAudio() {

        this._clickAudio.pause();
        this._clickAudio.currentTime = 0;

        this._clickAudio.play();
        
    }

    // private functions
    #select(selectedTime) {

        this.#playClickAudio();

        this._isInAnimation = true;

        this._webElement.classList.add('selected');

        setTimeout(
            () => {

                this._isInAnimation = false;

                this._webElement.classList.remove('selected');

            }, 
            selectedTime
        );

    }

}