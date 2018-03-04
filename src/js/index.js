import Pjax from "./modules/Pjax";
import threeStuff from "./modules/threeStuff";
import backgroundAnimation from "./modules/backgroundAnimation";
import overlay from "./modules/overlay";

threeStuff();
Pjax();
backgroundAnimation();
overlay();

const isMobileDevice = () =>
  typeof window.orientation !== "undefined" ||
  navigator.userAgent.indexOf("IEMobile") !== -1;

window.addEventListener("resize", () => {
  backgroundAnimation();
});

document.addEventListener("DOMContentLoaded", e => {
  if (isMobileDevice()) {
    const wrapper = document.querySelector("#wrapper");
    const height = document.documentElement.clientHeight;
    const canvases = document.querySelectorAll("canvas");

    wrapper.style.height = `${height - 50}px`;
    canvases.forEach(canvas => (canvas.height = height));
  }
});
