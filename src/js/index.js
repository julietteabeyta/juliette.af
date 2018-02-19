import Pjax from './modules/Pjax';
import threeStuff from './modules/threeStuff';
import backgroundAnimation from './modules/backgroundAnimation';

threeStuff();
Pjax();
backgroundAnimation();

window.addEventListener('resize', () => {
    backgroundAnimation();
})