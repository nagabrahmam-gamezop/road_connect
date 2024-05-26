import { _decorator, Component, director, Node } from 'cc';
import { GameState } from '../GameState';
const { ccclass, property } = _decorator;

@ccclass('MenuHandler')
export class MenuHandler extends Component {

    protected onLoad(): void {
        GameState.getInstance().currentLevel = 1;
        GameState.getInstance().setLanguage(navigator.language);
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    onPlayClicked(){
        director.loadScene("Gameplay");
    }
}


