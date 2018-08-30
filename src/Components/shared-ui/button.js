class Button {
  constructor (className, children, type, name) {
    this.children = children;
    this.name = name;
    this.type = type;
    this.children = children;
    this.className = className;

    this.render().bind(this);
  }

  render () {
    return `<button type=${this.type} class=${this.className} name=${this.name} >${this.children}</button>`;
  };
}

export default Button;
