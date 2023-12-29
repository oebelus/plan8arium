let celestialBodies: any = {
    "sun": {
        "type": "Star",
        "diameter": "1.392 million km",
        "distanceFromEarth": "149.6 million km",
        "gravity": "274 m/s²"
    },
    "mercury": {
        "type": "Planet",
        "diameter": "4,879 km",
        "distanceFromSun": "57.91 million km",
        "gravity": "3.7 m/s²"
    },
    "venus": {
        "type": "Planet",
        "diameter": "12,104 km",
        "distanceFromSun": "108.2 million km",
        "gravity": "8.87 m/s²"
    },
    "earth": {
        "type": "Planet",
        "diameter": "12,742 km",
        "distanceFromSun": "149.6 million km",
        "gravity": "9.807 m/s²"
    },
    "moon": {
        "type": "Moon",
        "diameter": "3,474 km",
        "distanceFromEarth": "384,400 km",
        "gravity": "1.62 m/s²"
    },
    "mars": {
        "type": "Planet",
        "diameter": "6,779 km",
        "distanceFromSun": "227.9 million km",
        "gravity": "3.72076 m/s²"
    },
    "jupiter": {
        "type": "Planet",
        "diameter": "139,820 km",
        "distanceFromSun": "778.5 million km",
        "gravity": "24.79 m/s²"
    },
    "saturn": {
        "type": "Planet",
        "diameter": "116,460 km",
        "distanceFromSun": "1.429 billion km",
        "gravity": "10.44 m/s²"
    },
    "uranus": {
        "type": "Planet",
        "diameter": "50,724 km",
        "distanceFromSun": "2.871 billion km",
        "gravity": "8.69 m/s²"
    },
    "neptune": {
        "type": "Planet",
        "diameter": "49,244 km",
        "distanceFromSun": "4.498 billion km",
        "gravity": "11.15 m/s²"
    }
};

celestialBodies["sun"]["orbitalPeriod"] = "27 days";
celestialBodies["sun"]["meanTemperature"] = "15 million°C";

celestialBodies["mercury"]["orbitalPeriod"] = "88 days";
celestialBodies["mercury"]["meanTemperature"] = "167°C";

celestialBodies["venus"]["orbitalPeriod"] = "225 days";
celestialBodies["venus"]["meanTemperature"] = "464°C";

celestialBodies["earth"]["orbitalPeriod"] = "365.2 days";
celestialBodies["earth"]["meanTemperature"] = "14°C";

celestialBodies["mars"]["orbitalPeriod"] = "687 days";
celestialBodies["mars"]["meanTemperature"] = "-63°C";

celestialBodies["jupiter"]["orbitalPeriod"] = "4,333 days";
celestialBodies["jupiter"]["meanTemperature"] = "-145°C";

celestialBodies["saturn"]["orbitalPeriod"] = "10,759 days";
celestialBodies["saturn"]["meanTemperature"] = "-178°C";

celestialBodies["uranus"]["orbitalPeriod"] = "30,589 days";
celestialBodies["uranus"]["meanTemperature"] = "-216°C";

celestialBodies["neptune"]["orbitalPeriod"] = "59,800 days";
celestialBodies["neptune"]["meanTemperature"] = "-214°C";

export default celestialBodies;