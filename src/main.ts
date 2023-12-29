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
    velocity = +8;
  }
});

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

const geometry = new THREE.CylinderGeometry(7, 7, 8, 32); 
const material = new THREE.MeshToonMaterial( {color: "white"} ); 
const cylinder = new THREE.Mesh(geometry, material);
cylinder.position.x = 50
cylinder.position.y = -20
scene.add(cylinder)

let data: Record<string, (string|number)[]> = {
  "sun": ["https://i.imgur.com/NT8Vd4p.jpg", "https://i.imgur.com/Aaw4ZQg.jpg", 274],
  "mercury": ["https://i.imgur.com/UQQRIZg.jpg", "https://i.imgur.com/6vSGiEh.jpg", 3.7],
  "venus": ["https://i.imgur.com/Wa8lpF6.jpg", "https://i.imgur.com/EMRrrJf.jpg", 8.87],
  "earth": ["https://i.imgur.com/Tajyxwl.jpg", "https://i.imgur.com/TCYbtkn.jpg", 9.807],
  "moon": ["https://i.imgur.com/OjvY5Pv.jpg", "https://i.imgur.com/oPo9Xei.jpg", 1.62],
  "mars": ["https://i.imgur.com/U2QZveA.jpg", "https://i.imgur.com/1FPwMdk.jpg", 3.71],
  "jupiter": ["https://i.imgur.com/ZUVwSv5.jpg", "https://i.imgur.com/qzVIeVy.jpg", 24.79],
  "saturn": ["https://i.imgur.com/ITtPqGy.jpg", "https://i.imgur.com/YlJf4Hs.jpg", 10.44],
  "uranus": ["https://i.imgur.com/wj611Q1.jpg", "https://i.imgur.com/wj611Q1.jpg", 8.87],
  "neptune": ["https://i.imgur.com/KU2X0rf.jpg", "https://i.imgur.com/KU2X0rf.jpg", 11.15]
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

var currentPlanet: Planet;

function animate() {
  requestAnimationFrame(animate)
  
  velocity -= (gravity[planet] / 15);
  if (dinosaur) {
    var bottom: number = (parseFloat(dinosaur.style.bottom) || 0)
    dinosaur.style.bottom = (bottom + velocity) + "%";
    if (bottom + velocity < 20) {
      dinosaur.style.bottom = 20 + "%";
    } else if (bottom + velocity > 85) {
      velocity = 0
      dinosaur.style.bottom = "85%";
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