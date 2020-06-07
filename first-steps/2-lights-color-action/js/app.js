let container;
let camera;
let renderer;
let scene;
let mesh;

function init() {
  container = document.querySelector('#scene-container');

  // create a Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x8f00ff);

  const fov = 35; // fov = Field Of View
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 100;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 10);

  const geometry = new THREE.BoxBufferGeometry(2, 2, 2);
  const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const light = new THREE.DirectionalLight(0x00ffff, 5.0);
  light.position.set(10, 10, 10);
  scene.add(light);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // add the automatically created <canvas> element to the page
  container.appendChild(renderer.domElement);
}

function animate() {
  // update() in unity 3D
  requestAnimationFrame(animate);

  // increase the mesh's rotation each frame
  mesh.rotation.z += 0.02;
  mesh.rotation.x += 0.03;
  mesh.rotation.y += 0.01;

  renderer.render(scene, camera);
}

init();

animate();
