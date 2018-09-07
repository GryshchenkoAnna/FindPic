class Backdrop {
    constructor(className) {
        this.className = className;
        this.header = document.querySelector(".header");
    }

    createBackdrop(className) {
        const backdrop = document.createElement('div');
        backdrop.classList.add(className);
        this.header.appendChild(backdrop);
        
       
        return backdrop;
    }
};

export default Backdrop;