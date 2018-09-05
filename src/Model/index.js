export default class Model {
  constructor (favoritePictures = [], pictures = {
    searchValue: null,
    photos: [],
    next_page: null,
    total_results: 0
  }) {
    this.favoritePictures = favoritePictures;
    this.pictures = pictures;
    this.searchValue = null;
  }

  init (data) {
    // data.reverse();
    if (this.favoritePictures.length === 0) return this.favoritePictures;
    this.favoritePictures.push(...data);
    return this.favoritePictures;
  }

  isHaveInBookmarks (value) {
    const findBookmark = this.favoritePictures.find(
      picture => picture.userValue === value
    );
    return findBookmark;
  }

  viewFetchedPictures (data, searchValue) {
    console.log('ser Val: ', searchValue);
    this.pictures.searchValue = searchValue;
    if (this.pictures.searchValue !== searchValue) {
      this.pictures.photos = [];
    }
    const prevStatePhotos = this.pictures.photos;
    console.log('prePhotos: ', prevStatePhotos);
    this.pictures.next_page = data.next_page ? data.next_page : null;
    this.pictures.total_results = data.total_results;

    this.pictures.photos = [...data.photos, ...prevStatePhotos];
    console.log('after fetch photos: ', this.pictures);
    // localStorage('favoritePictures', this.favoritePictures);
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
      console.log('1: ', findPhoto);
      const prevStateFavPic = this.favoritePictures;
      console.log('2: ', prevStateFavPic);
      this.favoritePictures = [...prevStateFavPic, findPhoto];
      console.log('favorite pic: ', this.favoritePictures);
      return true;
    }
    return false;
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

  removeBookmark (id, localStorage) {
    this.favoritePictures = this.favoritePictures.filter(bookmark => bookmark.id !== id);
    localStorage('favoritePictures', this.favoritePictures);
  }
}
