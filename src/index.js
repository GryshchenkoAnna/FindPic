import Favorite from './Components/favorite';
// import '../node_modules/normalize.css/normalize.css';
import './styles.css';
import Button from './Components/button';

const buttonSearch = new Button();
const buttonFavorites = new Button();

buttonSearch.createButton('search', 'submit', 'button-search');
buttonFavorites.createButton('Favorits', 'button', 'button-favorits');

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
