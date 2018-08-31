import Favorite from './Components/favorite';
// import 'normalize.css';
import './styles.css';
import './components/button';
import Button from './components/button';



const buttonSearch = new Button();
const buttonFavorites = new Button();


buttonSearch.createButton("search", "submit", "button-search");
buttonFavorites.createButton("Favorits", "button", "button-favorits");


class App extends Favorite {
  constructor (parentNode) {
    super({
      parentNode
    });
    this.root = document.querySelector('#root');
    // this.init = this.this.init();
  }

  init () {
    console.log('app work Init');
    this.setParentNode(this.root);
  }
}

new App(document.querySelector('#root'));

