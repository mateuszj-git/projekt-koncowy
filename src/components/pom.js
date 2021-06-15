
import { Scene } from 'three';
import Renderer from './Renderer';
import Camera from './Camera';

import {

    LoadingManager,
    Clock,
    Vector3,
    GridHelper,
    AxesHelper,

} from 'three';
import Floor from "./Board"
import Keyboard1 from "./Keyboard1"

import Model from "./Model"
import Model2 from "./Model2"

import Keyboard from "./Keyboard"
import Animation from "./Animation"
import Config from './Config';
import marioMD2 from "./assets/tris.md2"
import tex from "./assets/3/tris.md2"

import io from "socket.io-client"
import { floorPowerOfTwo } from 'three/src/math/MathUtils';
var tab = []
var floor = []
var poz = {}
const socket = io()
var pomtab = []
var wh = ""
var check = 0
var temp = []
var pom1 = 0
var this1
var position = {}
var w = false
var pkt = 0
var pkt1 = 0

export default class Main {

    constructor(container) {

        const socket = require("socket.io-client")("http://localhost:3000", {

        })
        // var pt1 = document.createElement("div")
        // pt1.id = "pt1"
        // pt1.style.top = "30px"
        // pt1.style.color = "white"

        // console.log(pt1)
        // document.getElementById("root").appendChild(pt1)
        // console.log(document.getElementById("root"))

        this1 = this

        socket.on('odbierz', tab_id => {

            pomtab = tab_id
            if (tab_id.length == 1) {
                if (socket.id == tab_id[0]) {
                    this.addModel()
                    this.addModel3()

                }
            } else if (tab_id.length == 2) {
                if (socket.id == tab_id[0]) {
                    this.addModel()
                    this.addModel3()

                } else if (socket.id == tab_id[1]) {

                    this.addModel2()
                    this.addModel4()

                }
            }
        })


        window.addEventListener("keydown", event => {
            if (event.keyCode === 67) {
                console.log("C")


            }

            if (event.keyCode === 87) {
                w = true
                socket.emit('w', w)
                socket.on('sendw', w1 => {
                    this.updateModelAnimation(w1)

                })

            }

            // do something
        });
        window.addEventListener("keyup", event => {

            if (event.keyCode === 87) {
                w = false
                socket.emit('w', w)
                socket.on('sendw', w1 => {
                    this.updateModelAnimation(w1)

                })
            }

            // do something
        });
        setInterval(function () {
            socket.emit('test', floor)
            socket.on('sendfloor', floor1 => {
                this1.updateFloor(floor1)
            })
            socket.emit('points', pkt)
            socket.on('sendpoints', pktp1 => {
                this1.updatePoints(pktp1)
            })
            socket.emit('points1', pkt1)
            socket.on('sendpoints1', pktp2 => {
                this1.updatePoints1(pktp2)
            })
        }, 10);
        setInterval(function () {
            socket.emit('position', position)
            socket.on('sendposition', position1 => {
                this1.updateModel(position1)


            })
        }, 10);


        socket.on("connect", () => {
            console.log("połączyles sie z id : " + socket.id)

        })
        document.body.style.backgroundColor = "Black"
        this.container = container;
        this.scene = new Scene();
        this.renderer = new Renderer(this.scene, container);
        this.camera = new Camera(this.renderer.threeRenderer);
        this.isLoaded = null
        this.animation = null

        const gridHelper = new GridHelper(900, 9);
        this.scene.add(gridHelper);
        const axesHelper = new AxesHelper(1000);
        this.scene.add(axesHelper);
        this.clock = new Clock()
        this.model = new Model(this.scene, this.manager);

        var pom = 400
        var pom1 = 400
        var pom2 = 0
        for (var i = 0; i < 81; i++) {
            let ob = {}



            if (i % 9 == 0 && i != 0) {
                pom = pom - 100
                pom1 = 400
                pom2 = 0
            }
            ob["id"] = i
            ob["x"] = pom1 - pom2 * 100
            pom2 = pom2 + 1
            ob["z"] = pom
            tab.push(ob)
        }
        var p = ""
        for (var i = 0; i < 81; i++) {
            p = "floor" + i
            this.p = new Floor()
            this.p.position.x = tab[i].x
            this.p.position.z = tab[i].z
            this.scene.add(this.p)
            floor.push(this.p)

        }

        this.render();
    }
    addModel() {

        this.manager = new LoadingManager();
        wh = "first"
        // model
        this.model = new Model(this.scene, this.manager);
        this.model.load(marioMD2);

        this.manager.onLoad = () => {


            this.isLoaded = true;
            //

            this.animation = new Animation(this.model.mesh)


            this.keyboard = new Keyboard(window, this.animation, this.model.mesh, poz);
        }
    }
    addModel2() {

        this.manager = new LoadingManager();
        wh = "second"

        // model
        this.model = new Model2(this.scene, this.manager);
        this.model.load(tex);

        this.manager.onLoad = () => {


            this.isLoaded = true;
            //

            this.animation = new Animation(this.model.mesh)


            this.keyboard = new Keyboard(window, this.animation, this.model.mesh, poz);
        }
    }
    addModel3() {

        this.manager = new LoadingManager();

        // model
        this.model2 = new Model2(this.scene, this.manager);
        this.model2.load(tex);
        this.manager.onLoad = () => {


            this.isLoaded = true;

            this.animation2 = new Animation(this.model2.mesh)
            this.animation2.playAnim("stand")


        }
    }
    addModel4() {

        this.manager = new LoadingManager();

        // model
        this.model2 = new Model(this.scene, this.manager);
        this.model2.load(marioMD2);
        this.manager.onLoad = () => {


            this.isLoaded = true;

            this.animation2 = new Animation(this.model2.mesh)

            this.animation2.playAnim("stand")

        }
    }
    updateModel(position1) {

        this.model2.mesh.position.x = position1.x
        this.model2.mesh.position.z = position1.z
        this.model2.mesh.rotation.y = position1.y

    }
    updateModelAnimation(w1) {

        if (w1 == true) {
            this.animation2.playAnim("crwalk")

        } else if (w1 == false) {
            this.animation2.playAnim("stand")

        }

    }
    updateFloor(floor1) {

        // // floor = floor1
        // console.log(floor)
        if (wh == "first") {

            for (var i = 0; i < floor1.length; i++) {
                if (floor1[i].materials[0].color == -33488896) {
                    floor[i].material.color.r = 255
                    floor[i].material.color.g = 0
                    floor[i].material.color.b = 0
                    // for (var j = 0; j < temp.length; j++) {
                    // if (temp[j] != i) {
                    //     }
                    // }
                }
            }
        } else if (wh == "second") {

            for (var i = 0; i < floor1.length; i++) {
                if (floor1[i].materials[0].color == 16646400) {
                    floor[i].material.color.r = 0
                    floor[i].material.color.g = 255
                    floor[i].material.color.b = 0
                    // for (var j = 0; j < temp.length; j++) {
                    // if (temp[j] != i) {
                    //     }
                    // }
                }
            }
        }

    }
    updatePoints(pktp1) {
        document.getElementById("pt1").innerHTML = pktp1
    }
    updatePoints1(pktp2) {

    }

    render() {




        var delta = this.clock.getDelta();

        if (this.animation) this.animation.update(delta)
        if (this.animation2) this.animation2.update(delta)

        this.renderer.render(this.scene, this.camera.threeCamera);

        // obsługa ruch modelu dopiero kiedy jest załadowany, można tą część umieścić w module Keyboard
        // tworząc w nim np funkcję update() i wywoływać ją poniżej

        if (this.model.mesh) {

            if (Config.rotateLeft) {
                this.model.mesh.rotation.y += 0.05

            }
            if (Config.rotateRight) {
                this.model.mesh.rotation.y -= 0.05

            }
            if (Config.moveForward) {
                this.model.mesh.translateX(2)


            }
            if (Config.moveBackward) {
                this.model.mesh.translateX(-2)

            }
            position["x"] = this.model.mesh.position.x
            position["z"] = this.model.mesh.position.z
            position["y"] = this.model.mesh.rotation.y
            const camVect = new Vector3(-100, 50, 0)
            const camPos = camVect.applyMatrix4(this.model.mesh.matrixWorld);
            this.camera.threeCamera.position.x = camPos.x
            this.camera.threeCamera.position.y = camPos.y
            this.camera.threeCamera.position.z = camPos.z
            this.camera.threeCamera.lookAt(this.model.mesh.position)


        }
        if (wh == "first") {
            for (var i = 0; i < floor.length; i++) {
                if (floor[i].position.x == poz.x && floor[i].position.z == poz.z) {
                    floor[i].material.color.r = 0
                    floor[i].material.color.g = 255
                    floor[i].material.color.b = 0

                }
            }
        } else if (wh == "second") {
            for (var i = 0; i < floor.length; i++) {
                if (floor[i].position.x == poz.x && floor[i].position.z == poz.z) {
                    floor[i].material.color.r = 255
                    floor[i].material.color.g = 0
                    floor[i].material.color.b = 0

                }
            }
        }
        var pom2 = 72
        var pom1 = 54
        if (wh == "first") {
            for (var j = 0; j < 9; j++) {
                for (var i = pom2; i < pom2 + 7; i++) {

                    if (floor[i].material.color.g != 1 && floor[i].material.color.r != 1 && floor[i].material.color.b != 1 && floor[i].material.color.g == 255 && floor[i + 1].material.color.g == 255 && floor[i + 2].material.color.g == 255) {
                        pkt += 1
                    }
                }
                pom2 = pom2 - 9
            }
            for (var k = 0; k < 7; k++) {
                for (var l = pom1; l < pom1 + 9; l++) {
                    if (floor[l].material.color.g != 1 && floor[l].material.color.r != 1 && floor[l].material.color.b != 1 && floor[l].material.color.g == 255 && floor[l + 9].material.color.g == 255 && floor[l + 18].material.color.g == 255) {
                        pkt += 1

                    }
                }
                pom1 = pom1 - 9
            }
        } else if (wh == "second") {
            for (var j = 0; j < 9; j++) {
                for (var i = pom2; i < pom2 + 7; i++) {

                    if (floor[i].material.color.g != 1 && floor[i].material.color.r != 1 && floor[i].material.color.b != 1 && floor[i].material.color.r == 255 && floor[i + 1].material.color.r == 255 && floor[i + 2].material.color.r == 255) {
                        pkt1 += 1
                    }
                }
                pom2 = pom2 - 9
            }
            for (var k = 0; k < 7; k++) {
                for (var l = pom1; l < pom1 + 9; l++) {
                    if (floor[l].material.color.g != 1 && floor[l].material.color.r != 1 && floor[l].material.color.b != 1 && floor[l].material.color.r == 255 && floor[l + 9].material.color.r == 255 && floor[l + 18].material.color.r == 255) {
                        pkt1 += 1

                    }
                }
                pom1 = pom1 - 9
            }
        }
        this.keyboard1 = new Keyboard1(window, poz, this.model.mesh, check);
        // koniec statystyk
        this.renderer.render(this.scene, this.camera.threeCamera);

        requestAnimationFrame(this.render.bind(this));
    }
}