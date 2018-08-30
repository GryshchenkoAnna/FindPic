import './styles.css';
import './components/button';
import Button from './components/button';



const buttonSearch = new Button();
const buttonFavorites = new Button();


buttonSearch.createButton("search", "submit", "button-search");
buttonFavorites.createButton("Favorits", "button", "button-favorits");
