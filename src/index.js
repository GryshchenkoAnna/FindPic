import Model from './Model';
import View from './View';
import Controller from './Controller';
import './styles.css';

const model = new Model();
const view = new View();

const findPicApp = new Controller(model, view);

findPicApp.init();
