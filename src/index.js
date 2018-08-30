import './styles.css';
import './components/button';
import Button from './components/button';
import Favorits from './components/favorites';


const button = new Button();
const favorits = new Favorits();

button.createButton("search", "submit", "button-search");
favorits.createFavorits("Favorits", "click", "button-favorits");
