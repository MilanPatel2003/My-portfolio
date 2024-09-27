const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.insertBefore(renderer.domElement, document.body.firstChild);

// Create a group to hold our wave
const group = new THREE.Group();
scene.add(group);

// Create wave geometry
const waveGeometry = new THREE.PlaneGeometry(20, 20, 100, 100);
const waveMaterial = new THREE.MeshBasicMaterial({
  color: 0x2196f3,
  wireframe: true,
  transparent: true,
  opacity: 0.8,
});
const wave = new THREE.Mesh(waveGeometry, waveMaterial);
group.add(wave);

// Rotate wave to face camera
wave.rotation.x = -Math.PI / 2;

camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// Mouse interaction
const mouse = new THREE.Vector2();
const targetMouse = new THREE.Vector2();

function onMouseMove(event) {
  targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener('mousemove', onMouseMove, false);

// Animation variables
let time = 0;
const waveSpeed = 0.5;
const waveHeight = 0.2;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  time += 0.05;

  // Smooth mouse movement
  mouse.lerp(targetMouse, 0.1);

  // Animate wave vertices
  const positions = waveGeometry.attributes.position.array;
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    const distanceFromMouse = Math.sqrt(
      Math.pow(x / 10 - mouse.x, 2) + Math.pow(y / 10 - mouse.y, 2)
    );
    positions[i + 2] = 
      Math.sin(time * waveSpeed + x + y) * waveHeight + 
      Math.sin(distanceFromMouse * 5 - time * 2) * waveHeight * 2;
  }
  waveGeometry.attributes.position.needsUpdate = true;

  renderer.render(scene, camera);
}

animate();

// Smooth scrolling effect
gsap.registerPlugin(ScrollTrigger);

gsap.to(group.rotation, {
  x: Math.PI * 0.1,
  y: Math.PI * 0.1,
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
  },
});

// Scroll-triggered animations for sections
const sectionElements = document.querySelectorAll('section');

sectionElements.forEach((section, index) => {
  gsap.from(section, {
    opacity: 0,
    y: 50,
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      end: "top 20%",
      scrub: 1,
      toggleActions: "play none none reverse",
    },
  });

  // Animate wave color on scroll
  gsap.to(waveMaterial.color, {
    r: Math.sin(index * 0.5) * 0.5 + 0.5,
    g: Math.sin(index * 0.5 + 2) * 0.5 + 0.5,
    b: Math.sin(index * 0.5 + 4) * 0.5 + 0.5,
    scrollTrigger: {
      trigger: section,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      toggleActions: "play reverse play reverse",
    },
  });
});

// Resize handler
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
