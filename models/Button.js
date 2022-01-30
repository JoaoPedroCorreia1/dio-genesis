class Button {

    constructor(
        gameController,
        element,
        colorNumber,
        clickAudio
    ) {
        // scripts
        this.gameController = gameController

        // variables
        this.element = element;
        this.colorNumber = colorNumber;

        this.clickAudio = clickAudio;

        this.isInAnimation = false;

        this.locked = false;
    }

    // getters and setters
    setLocked(value)
    {
        this.locked = value;
    }
    
    // public functions
    onClick()
    {
        if(this.isInAnimation === false
        && this.locked === false)
        {
            this.clickAudio.pause();
            this.clickAudio.currentTime = 0;

            this.clickAudio.play();

            this.select();
            this.gameController
                .eventButtonSelected(this.colorNumber);
        }
    }

    lightColor(number)
    {
        

        number = number * 800;

        setTimeout(() => {
            this.clickAudio.pause();
            this.clickAudio.currentTime = 0;

            this.clickAudio.play();
            this.element.classList.add('selected');
        }, 
        number - 800);

        setTimeout(() => {
            this.element.classList.remove('selected');
        }, 
        number - 150);
    }

    // private functions
    #select()
    {
        this.isInAnimation = true;

        this.element.classList.add('selected');

        setTimeout(() => {
            this.isInAnimation = false;

            this.element.classList.remove('selected');
        }, 
        500);
    }

}