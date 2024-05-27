import { _decorator, Component, director, Node } from 'cc';
import { GameState } from '../GameState';
import { SoundHandler } from '../SoundHandler';
const { ccclass, property } = _decorator;

/**
 * Handles the menu functionality.
 */
@ccclass('MenuHandler')
export class MenuHandler extends Component {

    /**
     * Called when the component is loaded.
     */
    protected onLoad(): void {
        GameState.getInstance().currentLevel = 1;
        GameState.getInstance().setLanguage(navigator.language);
    }

    /**
     * Called when the component starts.
     */
    start() {

    }

    /**
     * Called every frame.
     * @param deltaTime - The time since the last frame.
     */
    update(deltaTime: number) {
        
    }

    /**
     * Called when the play button is clicked.
     */
    onPlayClicked(){
        SoundHandler.getInstance().playSound("click");
        director.loadScene("Gameplay");
    }
}


