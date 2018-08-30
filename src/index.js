import Favorite from './Components/favorite';
// import 'normalize.css';
import './styles.css';

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
// eslint-disable-next-line
new App(document.querySelector('#root'));
