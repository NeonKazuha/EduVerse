const scene = new THREE.Scene();
const camera = new THREE.Camera();
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alphaTest: true,
});


renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


var ArToolkitSource = new THREEx.ArToolkitSource({

  sourceType: "webcam",


})

ArToolkitSource.init(function () {

  setTimeout(() => {

    ArToolkitSource.onResizeElement();
    ArToolkitSource.copyElementSizeTo(renderer.domElement);
  }, 2000);
})

var ArToolkitContext = new THREEx.ArToolkitContext({

  cameraParametersUrl: 'camera_para.dat',
  detectionMode: 'color_and_matrix',


})

ArToolkitContext.init(function () {
  camera.projectionMatrix.copy(ArToolkitContext.getProjectionMatrix())
})

var ArMarkerControls = new THREEx.ArMarkerControls(ArToolkitContext, camera, {
  type: "pattern",
  // url of the pattern - IIF type='pattern'
  patternUrl: "./pattern-hiro.patt",
  // value of the barcode - IIF type='barcode'

  changeMatrixMode: " cameraTransformMatrix",
})
scene.visible = false;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  ArToolkitContext.update(ArMarkerControls.domElement);
  scene.visible = camera.visible
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;


  renderer.render(scene, camera);
}

animate();