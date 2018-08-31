import Favorite from './Components/favorite';
// import '../node_modules/normalize.css/normalize.css';
import './styles.css';
// import './scss/pictures-list-item.scss';

class App {
  constructor (parentNode) {
    // TODO:
    // fav MVC
    // this.favModule = new FavModule();
    // this.favView = new FavView();
    // in method call const initFav = new FavCtrl(this.favModule, this.favView);

    this.favorite = null;
    this.root = document.getElementById('root');
    this.init();
  }

  init () {
    console.log(this.root);
    this.favorite = new Favorite(this.root);
  }
}
// eslint-disable-next-line
new App(document.querySelector('#root'));
