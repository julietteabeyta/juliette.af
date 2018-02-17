import * as THREE from "three";
import "three/examples/js/loaders/STLLoader";


// Pink: #DBA698;

const threeStuff = () => {
  const wrapper = document.querySelector("#wrapper");
  let scene, camera, renderer;

  const init = () => {

// BUSTS
    // Create Scene
    scene = new THREE.Scene();

    // Add Camera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight);
    camera.position.z = 10;

    // Load model
    const loader = new THREE.STLLoader();
    let bust;
    let invertedBust;
    loader.load("/models/bust.stl", function(geometry) {
      const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0x222222,
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
    // Add lighting
    const light1 = new THREE.PointLight(0x222222, 1, 70, 5);
    light1.position.z = 5;
    scene.add(light1);


// BACKGROUND
    // Create background texture
    const backgroundTexture = THREE.ImageUtils.loadTexture("/img/marble.jpg");
    const backgroundMaterial = new THREE.MeshBasicMaterial({
      map: backgroundTexture,
      transparent: true
    });
    backgroundMaterial.opacity = 0.3;
    const backgroundMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2, 0),
      backgroundMaterial
    );
    backgroundMesh.material.depthTest = false;
    backgroundMesh.material.depthWrite = false;

    // Create background scene & camera, add both to scene
    const backgroundScene = new THREE.Scene();
    const backgroundCamera = new THREE.Camera();
    backgroundScene.add(backgroundCamera);
    backgroundScene.add(backgroundMesh);

    

    // BARS
    //
    //
    // Create bars scene
    const barsScene = new THREE.Scene();
    const barsCamera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
    barsScene.add(barsCamera);

    const path = window.location.pathname;
    const bar1 = new THREE.Mesh(bar1geo, bar1mat);
    barsScene.add(bar1);




    // RENDER
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
    wrapper.appendChild(renderer.domElement);
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.autoClear = false;
      renderer.clear();
      renderer.render(heartMesh, camera);
      renderer.render(backgroundScene, backgroundCamera);
      renderer.render(scene, camera);
      renderer.render(barsScene, barsCamera);
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