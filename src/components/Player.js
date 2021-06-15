import {
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    SphereGeometry,
    DoubleSide,
} from "three";

export default class Player extends Mesh {

    constructor() {
        super(new SphereGeometry(1, 10, 10), new MeshBasicMaterial({
            color: 0xffffff,
            side: DoubleSide,
            wireframe: true,
            transparent: false,
        }))
    }


}