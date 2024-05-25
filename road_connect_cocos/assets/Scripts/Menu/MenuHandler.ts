import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MenuHandler')
export class MenuHandler extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    onPlayClicked(){
        director.loadScene("Gameplay");
    }
}


