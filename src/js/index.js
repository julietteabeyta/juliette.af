import * as THREE from "three";
import "three/examples/js/loaders/STLLoader";
const wrapper = document.querySelector(".wrapper");
let scene, camera, renderer;

const init = () => {
  // SCENE
  scene = new THREE.Scene();

  // CAMERA
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight
  );
  camera.position.z = 10;

  // LOAD MODEL
  const loader = new THREE.STLLoader();
  let bust;
  let invertedBust;
  loader.load("/models/bust.stl", function(geometry) {
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0x111111,
      shininess: 20,
      transparent: true
    });
    material.opacity = 0.0;

    bust = new THREE.Mesh(geometry, material);
    bust.position.set(8, 0, -0.6);
    bust.rotation.set(-Math.PI / 2, 0, -0.3);
    bust.scale.set(0.03, 0.03, 0.03);
    scene.add(bust);

    invertedBust = new THREE.Mesh(geometry, material);
    invertedBust.position.set(-8, 0, -0.6);
    invertedBust.rotation.set(-Math.PI / 2, Math.PI, -0.3);
    invertedBust.scale.set(0.03, 0.03, 0.03);
    scene.add(invertedBust);
  });

  const backgroundTexture = THREE.ImageUtils.loadTexture("/img/marble.jpg");
  const backgroundMaterial = new THREE.MeshBasicMaterial({
    map: backgroundTexture,
    transparent: true
  });
  backgroundMaterial.opacity = 0.3;
  const backgroundMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2, 0), backgroundMaterial);
  backgroundMesh.material.depthTest = false;
  backgroundMesh.material.depthWrite = false;

  // Create your background scene
  const backgroundScene = new THREE.Scene();
  const backgroundCamera = new THREE.Camera();
  backgroundScene.add(backgroundCamera);
  backgroundScene.add(backgroundMesh);

  // LIGHTING
  const light1 = new THREE.PointLight(0x222222, 1, 70, 5);
  light1.position.z = 5;
  scene.add(light1);

  // RENDER
  renderer = new THREE.WebGLRenderer();

  renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
  wrapper.appendChild(renderer.domElement);
  const animate = () => {
    requestAnimationFrame(animate);
    renderer.autoClear = false;
    renderer.clear();
    renderer.render(backgroundScene, backgroundCamera);
    renderer.render(scene, camera);
    let fadeInBust = models => {
      models.forEach(model => {
        if(model && model.material.opacity < 0.7) {
          model.material.opacity += 0.005;
        } else {
          fadeInBust = null;
        }
      })
    }
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
}
window.addEventListener("resize", handleResize, false);
