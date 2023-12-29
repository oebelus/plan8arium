import * as THREE from 'three'
import celestialBodies from './data.ts'

var planet: string = "earth";

var sunbtn = document.querySelector(".sun")
var mercurybtn = document.querySelector(".mercury")
var venusbtn = document.querySelector(".venus")
var earthbtn = document.querySelector(".earth")
var moonbtn = document.querySelector(".moon")
var marsbtn = document.querySelector(".mars")
var jupiterbtn = document.querySelector(".jupiter")
var saturnbtn = document.querySelector(".saturn")
var uranusbtn = document.querySelector(".uranus")
var neptunebtn = document.querySelector(".neptune")
var planetname = document.querySelector(".planetname")

if (planetname)
  planetname.innerHTML = "○ Test gravity here"

var title = document.querySelector(".title")
var type = document.querySelector(".type")
var diameter = document.querySelector(".diameter")
var gravity = document.querySelector(".gravityc")
var orbitalPeriod = document.querySelector(".orbitalPeriod")
var meanTemperature = document.querySelector(".meanTemperature")

function htmlelements(): void {
  if (title) title.innerHTML = "►" + planet[0].toUpperCase() + planet.slice(1, planet.length)
  if (type) type.innerHTML = "<b>Type: </b>" + celestialBodies[planet]["type"]
  if (diameter) diameter.innerHTML = "<b>Diameter: </b>" + celestialBodies[planet]["diameter"]
  if (gravity) gravity.innerHTML = "<b>Gravity: </b>" + celestialBodies[planet]["gravity"]
  if (orbitalPeriod) orbitalPeriod.innerHTML = "<b>Period: </b>" + celestialBodies[planet]["orbitalPeriod"]
  if (meanTemperature) meanTemperature.innerHTML = "<b>Temperature: </b>" + celestialBodies[planet]["meanTemperature"]
}

var dinosaur = document.querySelector(".dinosaur") as HTMLElement

function toPlanet(planetName: string) { 
  planet = planetName
}

if (sunbtn) {
  sunbtn.addEventListener("click", function() { toPlanet('sun'); });
}

if (mercurybtn) {
  mercurybtn.addEventListener("click", function() { toPlanet("mercury"); });
}

if (venusbtn) {
  venusbtn.addEventListener("click", function() { toPlanet("venus"); });
}

if (earthbtn) {
  earthbtn.addEventListener("click", function() { toPlanet("earth"); });
}

if (moonbtn) {
  moonbtn.addEventListener("click", function() { toPlanet("moon"); });
}

if (marsbtn) {
  marsbtn.addEventListener("click", function() { toPlanet("mars"); });
}

if (jupiterbtn) {
  jupiterbtn.addEventListener("click", function() { toPlanet("jupiter"); });
}

if (saturnbtn) {
  saturnbtn.addEventListener("click", function() { toPlanet("saturn"); });
}

if (uranusbtn) {
  uranusbtn.addEventListener("click", function() { toPlanet("uranus"); });
}

if (neptunebtn) {
  neptunebtn.addEventListener("click", function() { toPlanet("neptune"); });
}

var sunRadius: number = 25
var earthRadius: number = 20

const width = window.innerWidth
const height = window.innerHeight

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('app') as HTMLCanvasElement
})

renderer.setSize(width, height)

const mainCamera = new THREE.PerspectiveCamera(60, width/height, 0.1, 100)
mainCamera.position.z = 50

const scene = new THREE.Scene()

class Planet {
  geometry: any
  material: any
  element: any
  radius: number

  constructor(radius: number, texturePath: string) {
    this.radius = radius
    this.geometry = new THREE.SphereGeometry(radius, 40, 30)

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(texturePath); 
    this.material = new THREE.MeshStandardMaterial({ map: texture });

    this.element = new THREE.Mesh(this.geometry, this.material)
  }

  draw() {
    scene.add(this.element)
    this.element.position.x = -20
    this.element.position.y = 0
    this.element.rotation.x += 0.01
    this.element.rotation.y += 0.01
  }

  remove() {
    scene.remove(this.element);
  }
}

class Surface {
  x: number
  y: number 
  element: any
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    const geometry = new THREE.CylinderGeometry(7, 7, 8, 5, 2); 
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("https://i.imgur.com/aOfHrpV.jpg"); 
    const material = new THREE.MeshStandardMaterial({ map: texture });
    this.element = new THREE.Mesh(geometry, material);

    this.element.position.x = x
    this.element.position.y = y
  }

  draw() {
    scene.add(this.element)
    console.log(this.element.x)
  }
}

let ground = new Surface(45, -26);
let roof = new Surface(60, -26)
ground.draw()
roof.draw()

let data: Record<string, (string|number)[]> = {
  "sun": ["https://i.imgur.com/NT8Vd4p.jpg", 274],
  "mercury": ["https://i.imgur.com/UQQRIZg.jpg", 3.7],
  "venus": ["https://i.imgur.com/Wa8lpF6.jpg", 8.87],
  "earth": ["https://i.imgur.com/Tajyxwl.jpg", 9.807],
  "moon": ["https://i.imgur.com/OjvY5Pv.jpg", 1.62],
  "mars": ["https://i.imgur.com/U2QZveA.jpg", 3.71],
  "jupiter": ["https://i.imgur.com/ZUVwSv5.jpg", 24.79],
  "saturn": ["https://i.imgur.com/ITtPqGy.jpg", 10.44],
  "uranus": ["https://i.imgur.com/wj611Q1.jpg", 8.87],
  "neptune": ["https://i.imgur.com/KU2X0rf.jpg", 11.15]
}

let sun = new Planet(sunRadius, data["sun"][0] as string);
let mercury = new Planet(earthRadius, data["mercury"][0] as string)
let earth = new Planet(earthRadius, data["earth"][0] as string)
let moon = new Planet(earthRadius - 5, data["moon"][0] as string)
let venus = new Planet(earthRadius, data["venus"][0] as string)
let mars = new Planet(earthRadius, data["mars"][0] as string)
let jupiter = new Planet(sunRadius, data["jupiter"][0] as string)
let saturn = new Planet(sunRadius, data["saturn"][0] as string)
let uranus = new Planet(earthRadius, data["uranus"][0] as string)
let neptune = new Planet(earthRadius, data["neptune"][0] as string)

/*const geometry = new THREE.RingGeometry( sunRadius * 2, sunRadius * 2, 32 ); 
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("https://i.imgur.com/wQvlmId.png"); 
const material = new THREE.MeshStandardMaterial({ map: texture });
const ring = new THREE.Mesh( geometry, material );

saturn.element.add(ring)
*/

let planets:Record<string, Planet> = {
  "sun": sun,
  "mercury": mercury,
  "venus": venus,
  "earth": earth,
  "moon": moon,
  "mars": mars,
  "jupiter": jupiter,
  "saturn": saturn,
  "uranus": uranus,
  "neptune": neptune
};

const light = new THREE.DirectionalLight(0xFFFFFF, 1)
light.position.set(2, 1, 4)
scene.add(light)

// Astronaut
var velocity = 0;

const floatbtn = document.querySelector(".float")
const gravitybtn = document.querySelector(".gravity")

if (floatbtn) {
  floatbtn.addEventListener("click", function() {
    velocity = -3
  })
}

if (gravitybtn) {
  gravitybtn.addEventListener("click", function() {
    dinosaur.style.bottom = "5%"
    velocity = data[planet][1] as number / 3;
  })
}

var currentPlanet: Planet; 

function animate() {
  requestAnimationFrame(animate)
  
  if (dinosaur) {
    var top: number = (parseFloat(dinosaur.style.top) || 0);
    dinosaur.style.top = (top + velocity) + "%";
    if (top + velocity < 7) {
      dinosaur.style.top = "7%";
    } else if (top + velocity > 60) {
      velocity = 0;
      dinosaur.style.top = "60%";
    } 
  }
    
  if (currentPlanet)
    currentPlanet.remove()

  currentPlanet = planets[planet];
  
  htmlelements()

  if (currentPlanet) 
    currentPlanet.draw() 
    
  renderer.render(scene, mainCamera)
}

animate()