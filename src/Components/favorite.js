// import FavCtrl from '../Controller/favoriteCtrl';
// import FavModel from '../Model/favoriteModel';
// import FavView from '../View/favoriteView';

// const favModel = new FavModel();
// const favView = new FavView();

// export const Favorite = new FavCtrl(favModel, favView);

//= =========
import * as pexels from '../services/api';

export default class Favorite {
  constructor ({
    pictures = [461198, 54455, 5938, 5317],
    parentNode
  }) {
    this.parentNode = parentNode;
    this.pictures = pictures;
    this.favWrap = document.createElement('div');
    this.favTitle = document.createElement('h2');
    this.favList = document.createElement('ul');
    this.photoData = null;
    this.getMarkup();
  }

  setParentNode (node) {
    console.log(node);
    return node;
  }

  getMarkup () {
    this.favWrap.classList.add('favorite__wrapper', 'favorite');

    this.favTitle.textContent = 'Favorite';
    this.favTitle.classList.add('favorite__title');

    this.favWrap.insertAdjacentElement('afterbegin', this.favTitle);

    this.favList.classList.add('favorite__list');

    this.createListItems();
    this.favWrap.insertAdjacentElement('beforeend', this.favList);
    console.log(this.favWrap);
    this.parentNode.insertAdjacentElement('beforeend', this.favWrap);
  }

  createListItems () {
    this.pictures.map(id => {
      pexels.getPhoto(id, this.photoData)
        .then(resolve => this.addFetchingData(resolve.data))
        .then(resolve => this.itemsMarkup(resolve, true));
    });
  }

  addFetchingData (data) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data);
      }, 200);
    });
  }

  itemsMarkup (data, isActive) {
    this.favList.insertAdjacentHTML('beforeend',
      `<li data-id=${data.id}>
        <div>
          <img src="${data.src.tiny}" alt="${data.photographer}" />
          ${isActive ? `<button />` : null}
        </div>
      </li>
      `
    );
  };
}
