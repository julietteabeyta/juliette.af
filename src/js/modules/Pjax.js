import Barba from "barba.js";
import backgroundAnimation from "./backgroundAnimation";
import overlay from './overlay';

const Pjax = () => {
Object.assign(Barba.Pjax.Dom, {
  containerClass: "inner",
  wrapperId: "wrapper"
});
const HideShowTransition = Barba.BaseTransition.extend({
  start: function() {
    this.newContainerLoading.then(this.transitionOut.bind(this));
  },
  transitionOut: function() {
    backgroundAnimation(this.newContainer, this.oldcontainer);
    this.newContainer.classList.remove("active");
    this.oldContainer.classList.remove("active");
    setTimeout(() => {
      this.finish();
    }, 200);
  },
  finish: function() {
    overlay(this.newContainer);
    document.body.scrollTop = 0;
    this.newContainer.classList.add("active");
    this.newContainer.style.visibility = "visible";
    this.done();
  }
});
Barba.Pjax.getTransition = () => HideShowTransition;
document.addEventListener("DOMContentLoaded", event => {
  Barba.Pjax.start();
  Barba.Prefetch.init();
});

}

export default Pjax;
