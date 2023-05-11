var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);
var scene = new THREE.Scene();

// Variables para la Grilla y Flechas
var size = 20;
var arrowSize = 5;
var divisions = 20;
var origin = new THREE.Vector3( 0, 0, 0 );
var x = new THREE.Vector3( 1, 0, 0 );
var y = new THREE.Vector3( 0, 1, 0 );
var z = new THREE.Vector3( 0, 0, 1 );
var color2 = new THREE.Color( 0x333333 ); 
var colorR = new THREE.Color( 0xAA0000 );
var colorG = new THREE.Color( 0x00AA00 );
var colorB = new THREE.Color( 0x0000AA );

//Crear la Grilla
var gridHelperXZ = new THREE.GridHelper( size, divisions, color2, color2);

//Flechas
var arrowX = new THREE.ArrowHelper( x, origin, arrowSize, colorR );
var arrowY = new THREE.ArrowHelper( y, origin, arrowSize, colorG );
var arrowZ = new THREE.ArrowHelper( z, origin, arrowSize, colorB );

// Posición de la camara
var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT);
camera.position.x = 5;
camera.position.y = 2;
camera.position.z = 3;
const light = new THREE.AmbientLight(0x404040, 5);

// Se añaden los elementos a la escena
scene.add(light);
scene.add(camera);
scene.add(gridHelperXZ);
scene.add(arrowX);
scene.add(arrowY);
scene.add(arrowZ);

// vertices e indices para crear el dodecaedro
const t = ( 1 + Math.sqrt( 5 ) ) / 2;
		const r = 1 / t;

		const vertices = [

			// (±1, ±1, ±1)
			- 1, - 1, - 1,	- 1, - 1, 1,
			- 1, 1, - 1, - 1, 1, 1,
			1, - 1, - 1, 1, - 1, 1,
			1, 1, - 1, 1, 1, 1,

			// (0, ±1/φ, ±φ)
			0, - r, - t, 0, - r, t,
			0, r, - t, 0, r, t,

			// (±1/φ, ±φ, 0)
			- r, - t, 0, - r, t, 0,
			r, - t, 0, r, t, 0,

			// (±φ, 0, ±1/φ)
			- t, 0, - r, t, 0, - r,
			- t, 0, r, t, 0, r
		];

		const indices = [
			3, 11, 7, 	3, 7, 15, 	3, 15, 13,
			7, 19, 17, 	7, 17, 6, 	7, 6, 15,
			17, 4, 8, 	17, 8, 10, 	17, 10, 6,
			8, 0, 16, 	8, 16, 2, 	8, 2, 10,
			0, 12, 1, 	0, 1, 18, 	0, 18, 16,
			6, 10, 2, 	6, 2, 13, 	6, 13, 15,
			2, 16, 18, 	2, 18, 3, 	2, 3, 13,
			18, 1, 9, 	18, 9, 11, 	18, 11, 3,
			4, 14, 12, 	4, 12, 0, 	4, 0, 8,
			11, 9, 5, 	11, 5, 19, 	11, 19, 7,
			19, 5, 14, 	19, 14, 4, 	19, 4, 17,
			1, 12, 14, 	1, 14, 5, 	1, 5, 9
		];
// los índices para el objeto geométrico
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
geometry.setIndex(indices);

const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
const material2 = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material2);
scene.add(mesh);
scene.add(mesh2);

const controls = new THREE.OrbitControls(camera, renderer.domElement);  
scene.add(arrowX, arrowY, arrowZ, gridHelperXZ, camera, light);

// Se renderiza la escena
function animate() {

  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);   

}
animate();