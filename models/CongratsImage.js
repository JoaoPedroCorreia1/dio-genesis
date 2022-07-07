class CongratsImage {
    // constructor
    constructor(webElement) {
        this.webElement = Components.getCongratsImage();
    }

    // public functions
    show() {
        this.webElement.classList.toggle('show');
    }

    hide() {
        this.webElement.classList.toggle('hide')
    }
}