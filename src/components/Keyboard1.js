import Animation from "./Animation"

import Main from "./pom";

import Config from "./Config";
import { Clock } from 'three';

const KEYS = {

    "color": 67,
};
var pom = 0

export default class Keyboard {
    constructor(domElement, poz, modelMesh, check,) {

        this.domElement = domElement;
        this.model = modelMesh
        this.poz = poz
        this.check = check

        this.clock = new Clock()

        // events
        this.domElement.addEventListener('keydown', event => this.onKeyDown(event), false);
        this.domElement.addEventListener('keyup', event => this.onKeyUp(event), false);
        if (pom == true) {
            this.check = true

            if (this.model.position.x.toFixed() < 450 && this.model.position.x.toFixed() > 350) {

                poz["x"] = 400
            } else if (this.model.position.x.toFixed() < 350 && this.model.position.x.toFixed() > 250) {

                poz["x"] = 300
            } else if (this.model.position.x.toFixed() < 250 && this.model.position.x.toFixed() > 150) {

                poz["x"] = 200
            } else if (this.model.position.x.toFixed() < 150 && this.model.position.x.toFixed() > 50) {

                poz["x"] = 100
            } else if (this.model.position.x.toFixed() < 50 && this.model.position.x.toFixed() > -50) {

                poz["x"] = 0
            }
            else if (this.model.position.x.toFixed() < -50 && this.model.position.x.toFixed() > -150) {

                poz["x"] = -100
            } else if (this.model.position.x.toFixed() < -150 && this.model.position.x.toFixed() > -250) {

                poz["x"] = -200
            }
            else if (this.model.position.x.toFixed() < -250 && this.model.position.x.toFixed() > -350) {

                poz["x"] = -300
            } else if (this.model.position.x.toFixed() < -350 && this.model.position.x.toFixed() > -450) {

                poz["x"] = -400
            }
            if (this.model.position.z.toFixed() < 450 && this.model.position.z.toFixed() > 350) {

                poz["z"] = 400
            } else if (this.model.position.z.toFixed() < 350 && this.model.position.z.toFixed() > 250) {

                poz["z"] = 300
            } else if (this.model.position.z.toFixed() < 250 && this.model.position.z.toFixed() > 150) {

                poz["z"] = 200
            } else if (this.model.position.z.toFixed() < 150 && this.model.position.z.toFixed() > 50) {

                poz["z"] = 100
            } else if (this.model.position.z.toFixed() < 50 && this.model.position.z.toFixed() > -50) {

                poz["z"] = 0
            }
            else if (this.model.position.z.toFixed() < -50 && this.model.position.z.toFixed() > -150) {

                poz["z"] = -100
            } else if (this.model.position.z.toFixed() < -150 && this.model.position.z.toFixed() > -250) {

                poz["z"] = -200
            }
            else if (this.model.position.z.toFixed() < -250 && this.model.position.z.toFixed() > -350) {

                poz["z"] = -300
            } else if (this.model.position.z.toFixed() < -350 && this.model.position.z.toFixed() > -450) {

                poz["z"] = -400
            }
        }

    }

    onKeyUp(event) {

        switch (event.keyCode) {
            case KEYS.color:
                pom = false;

                break;




        }
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case KEYS.color:
                pom = true
                break;
        }



    }


}