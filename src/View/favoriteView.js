import EventEmitter from '../services/event-emitter';

class FavView extends EventEmitter {
  constructor() {
    super();

    this.favWrap = document.createElement('div');
    this.favTitle = document.createElement('h2');
    this.picList = document.createElement('ul');


  }

  createMarkup() {

  }
};

export default FavView;
