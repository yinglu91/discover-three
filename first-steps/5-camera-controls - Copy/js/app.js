let container;
let camera;
let controls;
let renderer;
let scene;
let mesh;

function init() {
  container = document.querySelector('#scene-container');

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x8fbcd4);

  createCamera();
  createControls();
  createLights();
  createMeshes();
  createRenderer();

  renderer.setAnimationLoop(() => {
    update();
    render();
  });
}

function createCamera() {
  camera = new THREE.PerspectiveCamera(
    70,
    container.clientWidth / container.clientHeight,
    1,
    1000
  );

  camera.position.set(0, 0, 400);
}

function createControls() {
  controls = new THREE.OrbitControls(camera, container);
}

function createLights() {
  const ambientLight = new THREE.HemisphereLight(0xddeeff, 0x202020, 5);

  const mainLight = new THREE.DirectionalLight(0xffffff, 5);
  mainLight.position.set(10, 10, 10);

  scene.add(ambientLight, mainLight);
}

function createMeshes() {
  const geometry = new THREE.BoxBufferGeometry(200, 200, 200);

  const textureLoader = new THREE.TextureLoader();

  const texture = textureLoader.load('textures/crate.gif');

  texture.encoding = THREE.sRGBEncoding;
  texture.anistropy = 16;

  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });

  mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);
}

function createRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);

  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  renderer.physicallyCorrectLights = true;

  container.appendChild(renderer.domElement);
}

function update() {
  // increase the mesh's rotation each frame
  mesh.rotation.z += 0.02;
  mesh.rotation.x += 0.03;
  mesh.rotation.y += 0.01;
}

function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth / container.clientHeight);
}

window.addEventListener('resize', onWindowResize);

init();
