import{ Scene, PerspectiveCamera, STLLoader,
        MeshPhongMaterial, Mesh, PointLight,
        TextureLoader, MeshBasicMaterial,
        PlaneGeometry, Camera, WebGLRenderer } from "three";
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
    camera = new PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight
    );
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

    // BACKGROUND
    // Create background texture
    const backgroundLoader = new TextureLoader;
    const backgroundTexture = backgroundLoader.load("/img/marble.jpg");
    const backgroundMaterial = new MeshBasicMaterial({
      map: backgroundTexture,
      transparent: true
    });
    backgroundMaterial.opacity = 0.8;
    const backgroundMesh = new Mesh(
      new PlaneGeometry(2, 2, 0),
      backgroundMaterial
    );
    backgroundMesh.material.depthTest = false;
    backgroundMesh.material.depthWrite = false;

    // Create background scene & camera, add both to scene
    const backgroundScene = new Scene();
    const backgroundCamera = new Camera();
    backgroundScene.add(backgroundCamera);
    backgroundScene.add(backgroundMesh);

    // BARS
    //
    //
    // Create bars scene
    // const bar1material = new THREE.LineBasicMaterial({
    //   color: 0xdba698,
    // });
    // const bar1shape = new THREE.Shape();
    // bar1shape.moveTo(0, 0);
    // bar1shape.lineTo(5, 0);
    // bar1shape.lineTo(5, 5);
    // bar1shape.lineTo(0, 0);

    // var extrudeSettings = { amount: .1, bevelEnabled: false};
    // const bar1geo = new THREE.ExtrudeGeometry(bar1shape, extrudeSettings);
    // const bar1mesh = new THREE.Mesh(bar1geo, bar1material);

    // // Create background scene & camera, add both to scene
    // const barsScene = new THREE.Scene();
    // const frustumSize = 1000;
    // const aspect = wrapper.clientWidth / wrapper.clientHeight;
    // const barsCamera = new THREE.OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 1, 2000);
    
    // var controls = new THREE.OrbitControls(barsCamera);
    // controls.update();
    // barsCamera.lookAt(barsScene.position);
    // barsCamera.rotateY(90)
    //  const barsCamera = new THREE.Camera();
    // barsScene.add(barsCamera);
    // barsScene.add(bar1mesh);

    // RENDER
    renderer = new WebGLRenderer();

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
