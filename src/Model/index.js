export default class Model {
  constructor (favoritePictures = []) {
    this.favoritePictures = favoritePictures;
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

  viewFetchedPictures (data) {
    // localStorage('favoritePictures', this.favoritePictures);
    console.log('in Model: ', data);
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
