import { PlaneGeometry, MeshPhongMaterial, TextureLoader, Mesh, DoubleSide, BoxGeometry, MeshBasicMaterial } from 'three';

import trawa from './assets/trawa.png'

export default class Podloga {
    constructor(scene, size) {
        for (let i = -size / 20; i < size / 20; i++) {
            for (let k = -size / 20; k < size / 20; k++) {

                this.geometry = new PlaneGeometry(150, 150, 1, 1);
                this.material = new MeshBasicMaterial({
                    map: new TextureLoader().load(trawa),
                });
                this.plane = new Mesh(this.geometry, this.material);
                this.plane.rotation.x = -Math.PI / 2

                this.plane.position.x = i * 150
                this.plane.position.y = -1
                this.plane.position.z = k * 150



                scene.add(this.plane)
            }
        }
    }
}