class Favorits {
    constructor() {
        this.header = document.querySelector('.header');
    }

    createFavorits(name, type, className) {
        const button = document.createElement('button');
        button.classList.add(className);
        button.textContent = name;
        button.setAttribute("type", type);
    
        this.header.append(button);
    
        return button;
      }
};

export default Favorits;