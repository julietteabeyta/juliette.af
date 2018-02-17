import Barba from "barba.js";

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
    this.newContainer.classList.remove("active");
    this.oldContainer.classList.remove("active");
    setTimeout(() => {
      this.finish();
    }, 200);
  },
  finish: function() {
    document.body.scrollTop = 0;
    this.newContainer.classList.add("active");
    this.newContainer.style.visibility = "visible";
    this.done();
  }
});
Barba.Pjax.getTransition = () => HideShowTransition;
document.addEventListener("DOMContentLoaded", event => {
  Barba.Pjax.start();
});

}

export default Pjax;