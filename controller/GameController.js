class GameController {

    // constructor
    constructor() {

        this._order = [];
        this._clickedOrder = [];

        this._score = 0;

        this._buttons = this.#createButtons();

        this._backgroundAudio = document.getElementById('background-audio');

        this._congratulationsAudio = document.getElementById('congratulations-audio');
        this._mistakeAudio = document.getElementById('mistake-audio');
        
    }

    #createButtons() {

        return [
            new Button(
                this,
                document.querySelector('.blue'),
                0,
                document.getElementById('bluebutton-audio')
            ),
        
            new Button(
                this,
                document.querySelector('.red'),
                1,
                document.getElementById('redbutton-audio')
            ),

            new Button(
                this,
                document.querySelector('.green'),
                2,
                document.getElementById('greenbutton-audio')
            ),
        
            new Button(
                this,
                document.querySelector('.yellow'),
                3,
                document.getElementById('yellowbutton-audio')
            )
        ];

    }
    

    // events
    eventButtonSelected(colorNumber) {

        this._clickedOrder.push(colorNumber);
        this.#checkOrder();

    }

    // public functions
    playGame () {

        this.#lockButtons();

        alert(
            'Bem vindo ao Gênesis! Iniciando novo jogo!'
        );
        this._score = 0;
        this._order = [];
    
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


    #nextLevel() {

        this._score++;
        this._clickedOrder = [];

        setTimeout(
            () => {
                
                this.#shuffleOrder();
            
            }, 

            1000
        );
        
    }

    #checkOrder() {

        for(let button in this._clickedOrder) {

            if(this._clickedOrder[button] != this._order[button]) {

                this.#gameOver();
                return;
                
            }

        }

        if(this._clickedOrder.length === this._order.length) {

            this.#lockButtons();

            this._congratulationsAudio.play();

            alert(
                `Pontuação: ${this._score}\nVocê acertou! Iniciando próximo nível!`
            );

            this.#nextLevel();

        }

    }

    #shuffleOrder() {

        this.#addRandomColor();

        this.#displayOrder();

    }

    #addRandomColor() {

        let newRandomColor = Math.floor(Math.random() * 4);
        
        this._order.push(newRandomColor);

    }

    #displayOrder() {

        this.#lockButtons();

        for(let i in this._order) {

            let colorNumber = this._order[Number(i)];

            let button = this._buttons[colorNumber];
            
            button.display(Number(i));
            
        }

        setTimeout(
            () => {
                
                this.#unlockButtons();
            
            },
            (this._order.length + 1) * 800  
        );
        
    }

    #lockButtons() {

        for(let i in this._buttons) {

            let button = this._buttons[Number(i)];

            button.setLocked(true);

        }

    }

    #unlockButtons() {

        for(let i in this._buttons) {

            let button = this._buttons[Number(i)];

            button.setLocked(false);

        }

    }

}