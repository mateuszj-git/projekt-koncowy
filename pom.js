import { Scene, Vector3, PCFSoftShadowMap, GridHelper, PointLight, Ray, AxesHelper, Raycaster, TextureLoader, RepeatWrapping, Mesh, PlaneGeometry, MeshPhongMaterial, Clock, DoubleSide, LoadingManager, MeshBasicMaterial, PointsMaterial } from 'three';
import Renderer from './Renderer';
import Camera from './Camera';
import Cube from './Cube';
import Model from './Model';
import Enemy from "./enemy";
import Player from './Player';
import Keyboard from './Keyboard';
import Config from './Config';
import podloga from "../podloga.png"
import marioMD2 from "./assets/model/tris.md2"
import marioMD3 from "./assets/Spider_Dalek/Tris.md2"
import Animation from "./Animation"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Enemiani from "./Enemiani"
import Wall from "./wall"
import Treasure from "./treasure"
import Fireplace from "./Fireplace"
var tab = []
var walltab = []
var model = []
var pom = []
var pm = true
var pomxyz = true
var tabwall = []
var tabenemy = []
var tablight = []
var tabtreasure = []
export default class MainCollision {

    constructor(container, res) {
        this.res = res

        for (var i = 0; i < this.res.list.length; i++) {

            if (this.res.list[i].type == "wall") {
                tabwall.push(this.res.list[i])
            }
            else if (this.res.list[i].type == "enemy") {
                tabenemy.push(this.res.list[i])
            }
            else if (this.res.list[i].type == "light") {
                tablight.push(this.res.list[i])
            }
            else if (this.res.list[i].type == "treasure") {
                tabtreasure.push(this.res.list[i])
            }
        }


        this.container = container;
        this.newenemy = null
        this.isLoaded = null
        this.animation = null
        this.isLoaded2 = null
        this.animation2 = null
        const podloga1 = new PlaneGeometry(1000, 1000, 5, 5);
        const podloga2 = new MeshPhongMaterial({
            shininess: 50,
            side: DoubleSide,

        });


        const texture = new TextureLoader().load(podloga);
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.repeat.set(10, 10);
        podloga2.map = texture;
        podloga2.needsUpdate = true;
        const plane = new Mesh(podloga1, podloga2, texture);
        plane.rotation.x += Math.PI / 2;
        plane.position.y = -24
        plane.receiveShadow = true
        this.scene = new Scene();
        this.renderer = new Renderer(this.scene, container);
        this.camera = new Camera(this.renderer.threeRenderer);
        const axesHelper = new AxesHelper(100);
        this.raycaster = new Raycaster()
        this.scene.add(plane);

        for (var i = 0; i < tabwall.length; i++) {
            this.cube = new Wall()
            this.cube.position.x = -450 + (tabwall[i].x * 100)

            this.cube.position.z = -450 + (tabwall[i].y * 100)

            this.cube.position.y = 24
            walltab.push(this.cube)
            this.cube.receiveShadow = true
            this.scene.add(this.cube)
        }



        for (var i = 0; i < tabtreasure.length; i++) {
            this.treasure = new Treasure()
            this.treasure.position.x = -450 + (tabtreasure[i].x * 100)
            this.treasure.position.z = -450 + (tabtreasure[i].y * 100)
            this.treasure.position.y = 15
            this.scene.add(this.treasure)
        }
        this.firePlaces = []
        for (var zw = 0; zw < tablight.length; zw++) {
            this.light = new PointLight(0xFFff00, 0.5);
            this.light.position.set(-450 + (tablight[zw].x * 100), -5, -450 + (tablight[zw].y * 100));
            this.light.castShadow = true
            this.scene.add(this.light);
            for (var i = 0; i < 10; i++) {
                this.fire = new Fireplace()
                this.fire.position.x = -450 + (tablight[zw].x * 100)
                this.fire.position.y = -5
                this.fire.position.z = -450 + (tablight[zw].y * 100)
                this.scene.add(this.fire)
                this.firePlaces.push(this.fire)
            }
        }





        this.clock2 = new Clock()

        var zmienna = 0
        var potwor = () => {
            var x = new Clock()
            pom.push(x)
            this.manager2 = new LoadingManager();
            this.enemy = new Enemy(this.scene, this.manager2);

            this.enemy.load(marioMD3);
            this.manager2.onProgress = (item, loaded, total) => {

            };
            this.manager2.onLoad = () => {
                this.isLoaded2 = true;
                console.log("MODEL LOADED!!!")

                model.push(new Enemiani(this.enemy.mesh))
                model[model.length - 1].playAnim("salute")
                tab.push(this.enemy.mesh)

                this.enemy.mesh.castShadow = true
                this.enemy.mesh.position.x = -450 + (tabenemy[zmienna].x * 100)
                this.enemy.mesh.position.z = -450 + (tabenemy[zmienna].y * 100)
                if (zmienna < tabenemy.length - 1) {
                    potwor()
                    zmienna++
                }
            }
        }
        this.gridHelper = new GridHelper(1000, 10)
        this.scene.add(this.gridHelper)

        this.clock = new Clock()
        this.manager = new LoadingManager();
        this.player = new Model(this.scene, this.manager);
        this.player.load(marioMD2);
        this.manager.onProgress = (item, loaded, total) => {

        };
        this.manager.onLoad = () => {
            this.isLoaded = true;
            console.log("MODEL LOADED!!!")

            this.player.mesh.castShadow = true


            this.animation = new Animation(this.player.mesh)
            this.animation.playAnim("stand")

            this.keyboard = new Keyboard(window, this.animation, this.player.mesh);
            potwor()
        }


        this.render();
    }
    ruch() {
        if (pm == true) {
            this.animation.playAnim("run")
        } if (pm == false) {
            this.animation.playAnim("stand")
            pm = true
        }
    }

    render() {

        if (this.animation) this.animation.update(this.clock.getDelta())
        for (var i = 0; i < model.length; i++) {
            if (model[i]) model[i].update(pom[i].getDelta())
        }








        // wykonanie funkcji update w module Animations - zobacz do pliku Animations


        this.renderer.render(this.scene, this.camera.threeCamera);


        if (this.player.mesh) {
            if (Config.rotateLeft) {
                this.player.mesh.rotation.y += 0.02
            }
            if (Config.rotateRight) {
                this.player.mesh.rotation.y -= 0.02
            }
            if (pomxyz == true) {
                if (Config.moveForward) {

                    this.player.mesh.translateX(0.8)

                    if (pm == true) {
                        this.ruch()
                        pm = false
                    }

                } else {
                    if (pm == false) {
                        this.ruch()
                        pm = true
                    }
                }
            }


            if (this.animation) this.animation.update(this.clock.getDelta())

            const camVect = new Vector3(-100, 50, 0)
            const camPos = camVect.applyMatrix4(this.player.mesh.matrixWorld);
            this.camera.threeCamera.position.x = camPos.x
            this.camera.threeCamera.position.y = camPos.y
            this.camera.threeCamera.position.z = camPos.z
            this.camera.threeCamera.lookAt(this.player.mesh.position)


            const v1 = new Vector3(0, 1, 0)

            var rayvector = new Vector3();
            let ray = new Ray(this.player.mesh.position, this.player.mesh.getWorldDirection(rayvector).multiplyScalar(1).applyAxisAngle(v1, Math.PI / 2))
            this.raycaster.ray = ray
            let intersects = this.raycaster.intersectObjects(walltab);
            for (var i = 0; i < tab.length; i++) {
                tab[i].lookAt(this.player.mesh.position)


                if (this.player.mesh.position.z < tab[i].position.z) {
                    tab[i].rotation.y += Math.PI / 2
                } else {
                    tab[i].rotation.y -= Math.PI / 2
                }
            }
            for (var i = 0; i < this.firePlaces.length; i++) {
                this.firePlaces[i].update()
                console.log(this.firePlaces[i])
                this.firePlaces[i].size(i + 40)

            }
            var licznik = 0
            if (intersects.length > 0) {
                for (var j = 0; j < intersects.length; j++) {
                    if (intersects[j].distance < 20) {
                        licznik++
                        pomxyz = false
                        this.animation.playAnim("stand")
                    }
                    if (licznik == 0) {
                        pomxyz = true
                    }
                }
            }

        }
        this.renderer.render(this.scene, this.camera.threeCamera);
        requestAnimationFrame(this.render.bind(this));
    }
}