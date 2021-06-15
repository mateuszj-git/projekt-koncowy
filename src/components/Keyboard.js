import Animation from "./Animation"
import Config from "./Config";
import { Clock } from 'three';

const KEYS = {
    "left": 65,
    "up": 87,
    "right": 68,
    "down": 40,
};
var pom = 0
export default class Keyboard {
    constructor(domElement, animation, modelMesh) {

        this.domElement = domElement;
        this.animation = animation
        this.modelMesh = modelMesh
        this.clock = new Clock()


        // events
        this.domElement.addEventListener('keydown', event => this.onKeyDown(event), false);
        this.domElement.addEventListener('keyup', event => this.onKeyUp(event), false);


    }

    onKeyUp(event) {

        switch (event.keyCode) {
            case KEYS.up:
                Config.moveForward = false;
                this.animation.playAnim("stand")
                break;
            case KEYS.left:
                Config.rotateLeft = false;
                break;
            case KEYS.right:
                Config.rotateRight = false;
                break;


        }
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case KEYS.up:
                Config.moveForward = true;
                this.animation.playAnim("crwalk")


                break;
            case KEYS.left:
                Config.rotateLeft = true;

                break;
            case KEYS.right:
                Config.rotateRight = true;
                break;
        }



    }


}