class Button {
  constructor(className, id) {
    this.form = document.querySelector('.form');
    this.className = className;
    this.id = id;
    // this.initApp = this.init();
  }

  // init() {
  //   this.createButton();
  // };

  createButton(name, type, className) {
    const button = document.createElement('button');
    button.classList.add(className);
    button.textContent = name;
    button.setAttribute("type", type);

    this.form.append(button);

    return button;
  }
}

export default Button;
