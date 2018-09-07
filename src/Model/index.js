export default class Model {
  constructor (favorite = [], pictures = {
    searchValue: null,
    photos: [],
    next_page: null,
    total_results: 0
  }) {
    this.pictures = pictures;
    this.searchValue = null;
    this.favoritePictures = favorite;
  }

  init (data) {
    if (data) this.favoritePictures = data;
  }

  openNextPicture (id) {
    const picturesLength = this.pictures.photos.length - 1;

    const indexCorectPicture = this.pictures.photos.findIndex(picture =>
      picture.id === Number(id)
    );

    return picturesLength === indexCorectPicture
      ? this.pictures.photos[0]
      : this.pictures.photos[indexCorectPicture + 1];
  }

  openPrevPicture (id) {
    const picturesLength = this.pictures.photos.length - 1;

    const indexCorectPicture = this.pictures.photos.findIndex(picture =>
      picture.id === Number(id)
    );

    return indexCorectPicture === 0
      ? this.pictures.photos[picturesLength]
      : this.pictures.photos[indexCorectPicture - 1];
  }

  openFavorite (data) {
    if (!data) return [];
    this.favoritePictures = data;
    return data;
  }

  getNextPage () {
    return this.pictures.next_page;
  }

  loadMorePictures (data) {
    this.pictures.next_page = data.next_page;

    const prevStatePhotos = this.pictures.photos;

    this.pictures.photos = [...prevStatePhotos, ...data.photos];

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data.photos);
      }, 200);
    });
  }

  viewFetchedPictures (data, searchValue) {
    this.pictures.searchValue = searchValue;

    this.pictures.photos = [];

    const prevStatePhotos = this.pictures.photos;

    this.pictures.next_page = data.next_page ? data.next_page : null;
    this.pictures.total_results = data.total_results;

    this.pictures.photos = [...data.photos, ...prevStatePhotos];

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data);
      }, 200);
    });
  }

  modalData (id) {
    const findPhoto = this.pictures.photos.find(obj => obj.id === Number(id));
    return findPhoto;
  }

  addToFavorite (id) {
    const haveIdInFav = this.favoritePictures.find(obj => obj.id === Number(id));
    if (!haveIdInFav) {
      const findPhoto = this.pictures.photos.find(obj => obj.id === Number(id));
      const prevStateFavPic = this.favoritePictures;
      this.favoritePictures = [...prevStateFavPic, findPhoto];
      return this.favoritePictures;
    }
    return null;
  }

  checkIdInFavorite (id) {
    const findId = this.favoritePictures.find(obj => obj.id === Number(id));

    return !!findId;
  }

  getOnePictures (data) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data);
      }, 200);
    });
  }

  removeFavoritePicture (id) {
    this.favoritePictures = this.favoritePictures.filter(picture =>
      picture.id !== Number(id)
    );

    return this.favoritePictures;
  }
}
