
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
import Podloga from './Podloga';
import Wall from './Wall';


import io from '../../node_modules/socket.io/client-dist/socket.io.js'
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
var clock = 0
var zegar = 0
var stop = 0
var czas = 0
var czas1 = new Date()
var pt1 = document.createElement("div")
var pt2 = document.createElement("div")
var wall = []


export default class Main {

    constructor(container) {

        const socket = io("/")
        pt1.id = "pt1"
        pt1.style.position = "absolute"
        pt1.style.top = "5vh"
        pt1.style.left = "10vh"
        pt1.style.width = "400px"
        pt1.style.height = "30px"
        pt1.style.fontFamily = 'Courier New'
        pt1.style.textAlign = 'center'
        pt1.style.color = "black"
        pt1.style.border = "10px double #ffc"
        pt1.style.borderRadius = "4px"
        pt1.style.fontSize = "20pt"
        pt1.style.backgroundColor = "green"


        pt2.id = "pt2"
        pt2.style.position = "absolute"
        pt2.style.top = "5vh"
        pt2.style.left = "10vh"
        pt2.style.width = "400px"
        pt2.style.height = "30px"
        pt2.style.fontFamily = 'Courier New'
        pt2.style.textAlign = 'center'
        pt2.style.color = "black"
        pt2.style.border = "10px double #ffc"
        pt2.style.borderRadius = "4px"
        pt2.style.fontSize = "20pt"
        pt2.style.backgroundColor = "red"

        var a = document.getElementById("legenda")
        document.getElementById("root").appendChild(a)

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
                clock = 1
                socket.emit('clock', clock)
                socket.on('sendclock', clock1 => {
                    this.startClock(clock1)

                })

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
            });
            socket.emit('position', position)
            socket.on('sendposition', position1 => {
                this1.updateModel(position1)


            });
            socket.emit('points', pkt)
            socket.on('sendpoints', pktp1 => {
                this1.updatePoints(pktp1)
            });
            socket.emit('points1', pkt1)
            socket.on('sendpoints1', pktp2 => {
                this1.updatePoints1(pktp2)
            })

        }, 200);
        setInterval(function () {

            if (czas != 0) {
                socket.emit('time', czas)


                czas = 0

            }
        }, 900);


        socket.on("connect", () => {
            console.log("połączyles sie z id : " + socket.id)

        })
        this.container = container;
        this.scene = new Scene();
        this.renderer = new Renderer(this.scene, container);
        this.camera = new Camera(this.renderer.threeRenderer);
        this.isLoaded = null
        this.animation = null
        new Podloga(this.scene, 100)
        this.wall = new Wall()
        var a = 800
        var b = 800
        var c = 800
        var d = 800



        for (var i = 0; i < 16; i++) {
            w = "wall" + i

            this.w = new Wall()
            this.w.position.x = a
            this.w.position.y = 100
            this.w.position.z = -700
            this.scene.add(this.w)
            wall.push(this.w)
            a = a - 100
        }
        for (var i = 16; i < 32; i++) {
            w = "wall" + i

            this.w = new Wall()
            this.w.position.x = b
            this.w.position.y = 100
            this.w.position.z = 700
            this.scene.add(this.w)
            wall.push(this.w)

            b = b - 100
        }
        for (var i = 32; i < 48; i++) {
            w = "wall" + i

            this.w = new Wall()
            this.w.position.x = -700
            this.w.position.y = 100
            this.w.position.z = c
            this.scene.add(this.w)
            wall.push(this.w)

            c = c - 100
        }
        for (var i = 48; i < 64; i++) {
            w = "wall" + i

            this.w = new Wall()
            this.w.position.x = 700
            this.w.position.y = 100
            this.w.position.z = d
            this.scene.add(this.w)
            wall.push(this.w)

            d = d - 100
        }

        const gridHelper = new GridHelper(900, 9);
        this.scene.add(gridHelper);

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

                }
            }
        } else if (wh == "second") {

            for (var i = 0; i < floor1.length; i++) {
                if (floor1[i].materials[0].color == 16646400) {
                    floor[i].material.color.r = 0
                    floor[i].material.color.g = 255
                    floor[i].material.color.b = 0

                }
            }
        }

    }
    updatePoints(pktp1) {
        if (pktp1 < 3000) {
            if (wh == "second") {
                if (pktp1 != 0) {
                    document.getElementById("root").appendChild(pt1)

                    document.getElementById("pt1").style.left = "150vh"
                    document.getElementById("pt1").innerHTML = "Wynik przeciwnika: " + pktp1
                }
            } else if (wh == "first") {
                if (pktp1 != 0) {
                    document.getElementById("root").appendChild(pt1)

                    document.getElementById("pt1").innerHTML = "Twoj wynik: " + pktp1
                }
            }
        }
        else if (pktp1 > 3000 && pktp1 < 3150) {
            if (wh == "first") {
                document.getElementById("pt1").innerHTML = "Twoj wynik: " + 3000
                czas = zegar
                document.getElementById("zegar").style.border = "3px solid black"

                document.getElementById("zegar").innerHTML = "WINNER"

            } else if (wh == "second") {
                document.getElementById("zegar").style.border = "3px solid black"

                document.getElementById("zegar").innerHTML = "LOOSER"

            }

        }
    }
    updatePoints1(pktp2) {
        if (pktp2 < 3000) {

            if (wh == "first") {
                if (pktp2 != 0) {
                    document.getElementById("root").appendChild(pt2)

                    document.getElementById("pt2").style.left = "150vh"
                    document.getElementById("pt2").innerHTML = "Wynik przeciwnika: " + pktp2
                }
            } else if (wh == "second") {

                if (pktp2 != 0) {
                    document.getElementById("root").appendChild(pt2)

                    document.getElementById("pt2").innerHTML = "Twoj wynik: " + pktp2
                }
            }
        } else if (pktp2 > 3000 && pktp2 < 3150) {
            if (wh == "second") {
                document.getElementById("pt2").innerHTML = "Twoj wynik: " + 3000
                czas = zegar
                document.getElementById("zegar").style.border = "3px solid black"

                document.getElementById("zegar").innerHTML = "WINNER"


            } else if (wh == "first") {
                document.getElementById("pt2").innerHTML = "Wynik przeciwnika: " + 3000
                document.getElementById("zegar").style.border = "3px solid black"

                document.getElementById("zegar").innerHTML = "LOOSER"

            }

        }


        //     if (pkt1 > 3000) {
        //         if (wh == "first") {

        //             window.alert("Przegrales")
        //         } else if (wh == "second") {
        //             window.alert("Wygrales")
        //         }

        //     }

    }
    startClock(clock1) {
        clock = 2
    }

    render() {

        if (pkt == 3000) {
            stop = 1
        }




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
                        if (pkt < 3100) {
                            pkt += 1
                        }
                    }
                }
                pom2 = pom2 - 9
            }
            for (var k = 0; k < 7; k++) {
                for (var l = pom1; l < pom1 + 9; l++) {
                    if (floor[l].material.color.g != 1 && floor[l].material.color.r != 1 && floor[l].material.color.b != 1 && floor[l].material.color.g == 255 && floor[l + 9].material.color.g == 255 && floor[l + 18].material.color.g == 255) {
                        if (pkt < 3100) {
                            pkt += 1
                        }

                    }
                }
                pom1 = pom1 - 9
            }
        } else if (wh == "second") {
            for (var j = 0; j < 9; j++) {
                for (var i = pom2; i < pom2 + 7; i++) {

                    if (floor[i].material.color.g != 1 && floor[i].material.color.r != 1 && floor[i].material.color.b != 1 && floor[i].material.color.r == 255 && floor[i + 1].material.color.r == 255 && floor[i + 2].material.color.r == 255) {
                        if (pkt1 < 3100) {
                            pkt1 += 1
                        }
                    }
                }
                pom2 = pom2 - 9
            }
            for (var k = 0; k < 7; k++) {
                for (var l = pom1; l < pom1 + 9; l++) {
                    if (floor[l].material.color.g != 1 && floor[l].material.color.r != 1 && floor[l].material.color.b != 1 && floor[l].material.color.r == 255 && floor[l + 9].material.color.r == 255 && floor[l + 18].material.color.r == 255) {
                        if (pkt1 < 3100) {
                            pkt1 += 1
                        }

                    }
                }
                pom1 = pom1 - 9
            }
        }
        if (clock == 2) {
            var czas2 = new Date()
            var godzina = new Date(czas2 - czas1)
            var milisekundy = godzina.getMilliseconds()
            if (godzina.getSeconds() < 10) {
                var sekundy = "0" + godzina.getSeconds()
            } else {
                var sekundy = godzina.getSeconds()
            }
            if (godzina.getMinutes() < 10) {
                var minuty = "0" + godzina.getMinutes()
            } else {
                var minuty = godzina.getMinutes()
            }
            var godz = "00"
            zegar = godz + ":" + minuty + ":" + sekundy + "." + milisekundy

        }

        this.keyboard1 = new Keyboard1(window, poz, this.model.mesh, check);
        // koniec statystyk
        this.renderer.render(this.scene, this.camera.threeCamera);
        requestAnimationFrame(this.render.bind(this));
    }
}