class Favorits {
    constructor() {
        this.root = document.querySelector('#root');
    }

    createFavorits(name, type, className) {
        const button = document.createElement('button');
        button.classList.add(className);
        button.textContent = name;
        button.setAttribute("type", type);
    
        this.root.append(button);
    
        return button;
      }
};

export default Favorits;