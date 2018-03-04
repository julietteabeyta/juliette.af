import {
  Scene,
  PerspectiveCamera,
  STLLoader,
  MeshPhongMaterial,
  Mesh,
  PointLight,
  Camera,
  WebGLRenderer
} from "three";
import "three/examples/js/loaders/STLLoader";
import "three/examples/js/controls/OrbitControls";

const threeStuff = () => {
  const wrapper = document.querySelector("#wrapper");
  let scene, camera, renderer;

  const init = () => {
    // BUSTS
    // Create Scene
    scene = new Scene();

    // Add Camera
    camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight);
    camera.position.z = 10;

    // Load model
    const loader = new STLLoader();
    let bust;
    let invertedBust;
    loader.load("/models/bust.stl", function(geometry) {
      const material = new MeshPhongMaterial({
        color: 0xffffff,
        specular: 0x222222,
        shininess: 20,
        transparent: true
      });
      material.opacity = 0.0;

      bust = new Mesh(geometry, material);
      bust.position.set(8, 0, -0.6);
      bust.rotation.set(-Math.PI / 2, 0, -0.3);
      bust.scale.set(0.03, 0.03, 0.03);
      scene.add(bust);

      invertedBust = new Mesh(geometry, material);
      invertedBust.position.set(-8, 0, -0.6);
      invertedBust.rotation.set(-Math.PI / 2, Math.PI, -0.3);
      invertedBust.scale.set(0.03, 0.03, 0.03);
      scene.add(invertedBust);
    });
    // Add lighting
    const light1 = new PointLight(0x222222, 1, 70, 5);
    light1.position.z = 5;
    scene.add(light1);

    renderer = new WebGLRenderer({
      alpha: true
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
    renderer.domElement.id = "three";
    wrapper.appendChild(renderer.domElement);
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.autoClear = false;
      renderer.clear();
      renderer.render(scene, camera);
      let fadeInBust = models => {
        models.forEach(model => {
          if (model && model.material.opacity < 0.9) {
            model.material.opacity += 0.005;
          } else {
            fadeInBust = null;
          }
        });
      };
      const rotateBust = models => {
        models.forEach(model => {
          if (model) {
            model.rotation.z -= 0.001;
          }
        });
      };
      fadeInBust([bust, invertedBust]);
      rotateBust([bust, invertedBust]);
    };
    animate();
  };
  init();
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
  };
  window.addEventListener("resize", handleResize, false);
};

export default threeStuff;
