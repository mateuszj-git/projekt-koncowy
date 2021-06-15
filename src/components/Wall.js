import {
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    TextureLoader

} from "three";
import tex from "./assets/wall.jpg"

export default class Wall extends Mesh {

    constructor() {

        super(new BoxGeometry(100, 200, 100, 1, 1, 1), new MeshBasicMaterial({ map: new TextureLoader().load(tex), }),)

    }


}