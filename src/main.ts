import * as THREE from 'three'

var planet: string = "earth";

var sunbtn = document.querySelector(".sun")
var earthbtn = document.querySelector(".earth")
var venusbtn = document.querySelector(".venus")

function toSun() {
  planet = "sun"
  cube.updateGravity()
}

function toEarth() {
  planet = "earth"
  cube.updateGravity()
}

function toVenus() {
  planet = "venus"
  cube.updateGravity()
}

if (sunbtn) {
  sunbtn.addEventListener("click", toSun)
}

if (earthbtn) {
  earthbtn.addEventListener("click", toEarth)
}

if (venusbtn) {
  venusbtn.addEventListener("click", toVenus)
}

var planets:string[] = ["sun", "mercury", "venus", "earth", 
"mars", "jupiter", "saturne", "uranus", "neptune"]

var sunRadius: number = 10
var sunGravity: number = 27.4
var sunRadius: number = 15
var earthGravity: number = 0.9
var earthRadius: number = 10
var jupiterGravity: number = 2.479
var saturnGravity: number = 1.044
var marsGravity: number = 0.371
var venusGravity: number = 0.887 // Uranus too
var neptuneGravity: number = 1.11
var mercuryGravity: number = 0.37

const width = window.innerWidth
const height = window.innerHeight

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('app') as HTMLCanvasElement
})

renderer.setSize(width, height)

const mainCamera = new THREE.PerspectiveCamera(60, width/height, 0.1, 100)
mainCamera.position.z = 50

const scene = new THREE.Scene()

class Cube {
  position: THREE.Vector3
  velocity: {x: number, y: number}
  gravity: number
  cube: THREE.Mesh

  constructor(gravity: number, position: {x: number, y: number, z: number}) {
    this.position = new THREE.Vector3(position.x, position.y, position.z)
    this.velocity = {
      x: 0,
      y: 0
    }
    this.gravity = gravity
    this.cube = this.draw()
  }

  draw() {
    const geometry = new THREE.BoxGeometry(3, 3, 5); 
    const material = new THREE.MeshBasicMaterial( {color: "beige"} ); 
    const cube = new THREE.Mesh( geometry, material ); 
    cube.position.set(this.position.x, this.position.y, this.position.z)
    cube.renderOrder = 999
    scene.add(cube);
    return cube
  }

  update() {
    console.log(this.gravity)
    this.position.y += this.velocity.y;
    if (this.position.y > radiusF(planet)) {
      this.velocity.y -= this.gravity;
    } else if (this.position.y < radiusF(planet)) {
      this.position.y = radiusF(planet);
    }
    this.cube.position.set(this.position.x, this.position.y-10, this.position.z)
  }

  updateGravity() {
    this.gravity = gravityF(planet)
  }
}

function gravityF(planet: string) {
  switch (planet) {
    case "sun":
      return sunGravity
    case "earth":
      return earthGravity
    case "venus":
      return venusGravity
    default:
      return 1
  }
}

function radiusF(planet: string) {
  switch (planet) {
    case "sun":
      return sunRadius
    case "earth":
      return earthRadius
    default:
      return earthRadius
  }
}

var cube = new Cube(gravityF(planet), {x: 0, y: radiusF(planet), z: 15})

class Planet {
  geometry: any
  material: any
  element: any

  constructor(geometry: any, material: any) {
    this.geometry = geometry
    this.material = material
    this.element = new THREE.Mesh(this.geometry, this.material)
  }

  draw() {
    scene.add(this.element)
    this.element.position.y = -10
    this.element.rotation.x += 0.01
    this.element.rotation.y += 0.01
  }

  remove() {
    scene.remove(this.element);
  }

}

let sun = new Planet(new THREE.SphereGeometry(sunRadius, 40, 30), new THREE.MeshPhysicalMaterial({ color: '#FDB813'}))
let earth = new Planet(new THREE.SphereGeometry(10, 40, 20), new THREE.MeshPhysicalMaterial({ color: 'green'}))
let venus = new Planet(new THREE.SphereGeometry(10, 40, 20), new THREE.MeshPhysicalMaterial({ color: '#8A420A'}))

const light = new THREE.DirectionalLight(0xFFFFFF, 1)
light.position.set(0, 6, 4)
scene.add(light)

const lighttop = new THREE.DirectionalLight(0xFFFFFF, 5)
lighttop.position.set(1, 2, 4)
scene.add(lighttop)

function dots(n: number): THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> [] {
  let arr: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap>[] = []
  for (let i = 0; i < n; i++) {
    let dotGeometry = new THREE.SphereGeometry(Math.random(), 12, 12);
    let dotMaterial = new THREE.MeshBasicMaterial({color: "orange"}); // Change the color as needed
    let dot = new THREE.Mesh(dotGeometry, dotMaterial);
    let spherical = new THREE.Spherical(
      sunRadius, // radius
      2 * Math.PI * Math.random(), // polar angle
      Math.acos(2 * Math.random() - 1) // azimuthal angle
    );
    dot.position.setFromSpherical(spherical);
    arr.push(dot)
  }
  return arr;
}

let manyDots = dots(100)

for (var adot of manyDots) {
  sun.element.add(adot)
}

var currentPlanet: Planet;

function animate() {
  requestAnimationFrame(animate)
  cube.update()

  if (currentPlanet)
    currentPlanet.remove()
  
  if (planet == "earth")
    currentPlanet = earth
  else if (planet == "sun")
    currentPlanet = sun
  else if (planet == "venus")
    currentPlanet = venus
    
  if (currentPlanet)
    currentPlanet.draw()

  renderer.render(scene, mainCamera)
}

animate()

function control(e: KeyboardEvent) {
  switch(e.key) {
    case " ":
      cube.velocity.y = 5
      console.log(cube.position.y)
      break;
    case "ArrowRight":
      cube.velocity.x = 2
      break
  }
}

function down(e: KeyboardEvent) {
  switch(e.key) {
    case " ":
      cube.velocity.y = 0
      break;
    case "ArrowRight":
      cube.velocity.x = 0
      break
  }
}

window.addEventListener("keydown", control)
window.addEventListener("keyup", down)