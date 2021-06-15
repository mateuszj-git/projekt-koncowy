// console.log("webpack works!")
// import './style.css';
// import plik from './plik.png';
// document.getElementById("img1").src = plik
import Main from './components/Main';

function init() {
    //div
    const container = document.getElementById('root');
    //main class object
    new Main(container);
}

init();