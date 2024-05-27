import { _decorator, CCInteger, Component, instantiate, Node, Prefab } from 'cc';
import { GameState } from '../GameState';
import { LevelSelectButton } from './LevelSelectButton';
const { ccclass, property } = _decorator;

/**
 * Manages the levels in the game.
 */
@ccclass('LevelManager')
export class LevelManager extends Component {

    /**
     * The layout node that contains the level select buttons.
     */
    @property(Node)
    private buttonsLayout : Node;

    /**
     * The prefab used to create level select buttons.
     */
    @property(Prefab)
    private levelSelectButton : Prefab;

    /**
     * The number of levels displayed per page.
     */
    @property(CCInteger)
    private levelsPerPage : number = 4;

    /**
     * Called when the script is first initialized.
     */
    start() {
        let currentLevel = GameState.getInstance().currentLevel;
        let levelData = GameState.getInstance().getLevelData(currentLevel);
        this.createLevelSelectButtons(levelData);
    }

    /**
     * Called every frame.
     * @param deltaTime - The time in seconds since the last frame.
     */
    update(deltaTime: number) {
        
    }

    /**
     * Creates the level select buttons based on the level data.
     * @param levelData - The data for the levels.
     */
    createLevelSelectButtons(levelData: any){
        for (let i = 0; i < this.levelsPerPage; i++) {
            const levelSelectButton = instantiate(this.levelSelectButton);
            levelSelectButton.parent = this.buttonsLayout;
            levelSelectButton.getComponent(LevelSelectButton).setLevel(i + 1);
        }
    }   

}


