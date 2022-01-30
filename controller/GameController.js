class GameController {

    // inicialization
    constructor()
    {
        this.order = []
        this.clickedOrder = [];

        this.score = 0;

        this.buttons = this.createButtons();

        this.backgroundAudio = document.getElementById('background-audio');

        this.congratulationsAudio = document.getElementById('congratulations-audio');
        this.mistakeAudio = document.getElementById('mistake-audio');
    }

    #createButtons()
    {
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
        )];
    }
    

    // events
    eventButtonSelected(colorNumber)
    {
        this.clickedOrder.push(colorNumber);
        this.checkOrder();
    }

    // public functions
    playGame ()
    {
        alert('Bem vindo ao Gênesis! Iniciando novo jogo!');
        this.score = 0;
        this.order = [];
    
        this.nextLevel();
    }
    
    // private functions
    #gameOver()
    {
        this.mistakeAudio.play();

        alert(
            `Pontuação: ${this.score}!
            \nVocê perdeu o jogo!
            \nClique em OK para iniciar um novo jogo`);
     
        this.playGame();
    }


    #nextLevel()     
    {
        this.score++;
        this.clickedOrder = [];

        setTimeout(() => {
        this.shuffleOrder();
        },
        1000);
    }

    #checkOrder()
    {
        for(let button in this.clickedOrder) 
        {
            if(this.clickedOrder[button] != this.order[button]) 
            {
                this.gameOver();
                return;
            }
        }

        if(this.clickedOrder.length === this.order.length) 
        {
            this.congratulationsAudio.play();
            alert(`Pontuação: ${this.score}\nVocê acertou! Iniciando próximo nível!`);
            this.nextLevel();
        }
    }

    #shuffleOrder()
    {
        let newRandomColor = Math.floor(Math.random() * 4);
        
        this.order.push(newRandomColor);

        this.lockButtons();

        for(let i in this.order) 
        {
            let colorNumber = this.order[Number(i)];

            let button = this.buttons[colorNumber];
            button.lightColor(Number(i) + 1);
        }

        setTimeout(() => {
           this.unlockButtons(); 
        }, 
        this.order.length * 800);
    }

    #lockButtons()
    {
        for(let i in this.buttons)
        {
            let button = this.buttons[Number(i)];

            button.setLocked(true);
        }
    }

    #unlockButtons()
    {
        for(let i in this.buttons)
        {
            let button = this.buttons[Number(i)];

            button.setLocked(false);
        }
    }

}