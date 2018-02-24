import Pjax from './modules/Pjax';
import threeStuff from './modules/threeStuff';
import backgroundAnimation from './modules/backgroundAnimation';
import overlay from './modules/overlay';

threeStuff();
Pjax();
backgroundAnimation();
overlay();

window.addEventListener('resize', () => {
    backgroundAnimation();
})
