import * as pexels from '../services/api';
import PictureItem from './pictures-list-item';
import Button from './shared-ui/button';

export default class Favorite {
  constructor ({
    pictures = [461198],
    parentNode
  }) {
    this.parentNode = parentNode;
    this.pictures = pictures;
    this.favWrap = document.createElement('div');
    this.favTitle = document.createElement('h2');
    this.favList = document.createElement('ul');
    this.photoData = null;
    this.isActiveCloseBtn = true;
    this.getMarkup();
  }

  setPictures (data) {
    const prevStatePictures = this.pictures;
    this.pictures = [...data, ...prevStatePictures];
  }

  getMarkup () {
    this.favWrap.classList.add('favorite__wrapper', 'favorite');

    this.favTitle.textContent = 'Favorite';
    this.favTitle.classList.add('favorite__title');

    this.favWrap.insertAdjacentElement('afterbegin', this.favTitle);

    this.favList.classList.add('favorite__list');

    this.createListItems();

    this.favWrap.insertAdjacentElement('beforeend', this.favList);

    return this.favWrap;
  }

  createListItems () {
    this.pictures.map(id => {
      pexels.getPhoto(id, this.photoData)
        .then(resolve => this.addFetchingData(resolve.data))
        .then(resolve => this.itemsMarkup(resolve, this.isActiveCloseBtn));
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
      PictureItem(data, isActive, Button('card__btn btn-close', 'X', 'button', 'remove-image'))
    );
  };
}
