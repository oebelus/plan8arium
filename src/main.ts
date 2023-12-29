import * as THREE from 'three'

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

var dinosaur = document.querySelector(".dinosaur") as HTMLElement
var velocity = 0;
window.addEventListener("keydown", function(event) {
  if (event.code === "Space") {
    velocity = +20;
  }
});

function toPlanet(planetName: string) {
  planet = planetName
  //cylinder.updateGravity()
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

var gravity: Record<string, number> = {
  "sun": 274,
  "earth": 9.807,
  "moon": 1.62,
  "mercury": 3.7,
  "venus": 8.87,
  "uranus": 8.87,
  "mars": 3.71,
  "jupiter": 24.79,
  "saturn": 10.44,
  "neptune": 11.15
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

let textured: Record<string, string> = {
  "sun": "https://i.imgur.com/NT8Vd4p.jpg",
  "mercury": "https://i.imgur.com/UQQRIZg.jpg",
  "venus": "https://i.imgur.com/Wa8lpF6.jpg",
  "earth": "https://i.imgur.com/Tajyxwl.jpg",
  "moon": "https://i.imgur.com/OjvY5Pv.jpg",
  "mars": "https://i.imgur.com/U2QZveA.jpg",
  "jupiter": "https://i.imgur.com/ZUVwSv5.jpg",
  "saturn": "https://i.imgur.com/ITtPqGy.jpg",
  "uranus": "https://i.imgur.com/wj611Q1.jpg",
  "neptune": "https://i.imgur.com/KU2X0rf.jpg"
}

let sun = new Planet(sunRadius, textured["sun"]);
let mercury = new Planet(earthRadius, textured["mercury"])
let earth = new Planet(earthRadius, textured["earth"])
let moon = new Planet(earthRadius - 5, textured["moon"])
let venus = new Planet(earthRadius, textured["venus"])
let mars = new Planet(earthRadius, textured["mars"])
let jupiter = new Planet(sunRadius, textured["jupiter"])
let saturn = new Planet(sunRadius, textured["saturn"])
let uranus = new Planet(earthRadius, textured["uranus"])
let neptune = new Planet(earthRadius, textured["neptune"])

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

const geometry = new THREE.CircleGeometry( 5, 32 ); 
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("texturePath"); 
const material = new THREE.MeshStandardMaterial({ map: texture });
const circle = new THREE.Mesh(geometry, material); 
scene.add(circle)

var currentPlanet: Planet;

function animate() {
  requestAnimationFrame(animate)
  //cylinder.update()
  velocity -= (gravity[planet] / 7);
  if (dinosaur) {
    dinosaur.style.bottom = (parseFloat(dinosaur.style.bottom) || 0) + velocity + "px";
    if (dinosaur.style.bottom < 0 + "px") {
      dinosaur.style.bottom = 10 + "px";
    }
  }
    
  if (currentPlanet)
    currentPlanet.remove()

  currentPlanet = planets[planet];
    
  if (currentPlanet)
    currentPlanet.draw()

  renderer.render(scene, mainCamera)
}

animate()