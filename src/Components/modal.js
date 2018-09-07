class Modal {
    constructor(className) {
        this.className = className;
        this.header = document.querySelector(".header");
    }

    createModal(className) {
        const modal = document.createElement('div');
        modal.classList.add(className);
        this.header.appendChild(modal);
       
        return modal;
    }

};

export default Modal;