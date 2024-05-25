import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property(Node)
    private puzzleManager : Node;

    @property(Node)
    private levelManager : Node

    @property(Node)
    private optionsBtn : Node

    start() {

    }

    update(deltaTime: number) {
        
    }

    gotoLevelSelectionScreen() {
        this.puzzleManager.active = false;
        this.optionsBtn.active = false;
        this.levelManager.active = true;
    }
}


