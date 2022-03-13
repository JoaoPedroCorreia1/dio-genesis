class ButtonComponents {
  static getButtons(buttonController) {
    return [
      new Button(
        buttonController,
        document.querySelector(".blue"),
        0,
        document.getElementById("bluebutton-audio")
      ),

      new Button(
        buttonController,
        document.querySelector(".red"),
        1,
        document.getElementById("redbutton-audio")
      ),
      new Button(
        buttonController,
        document.querySelector(".green"),
        2,
        document.getElementById("greenbutton-audio")
      ),

      new Button(
        buttonController,
        document.querySelector(".yellow"),
        3,
        document.getElementById("yellowbutton-audio")
      ),
    ];
  }
}
