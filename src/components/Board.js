import {
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,

} from "three";
export default class Floor extends Mesh {

    constructor() {

        super(new BoxGeometry(100, 0, 100, 1, 1, 1), new MeshBasicMaterial({ color: 0xffffff }),)

    }


}