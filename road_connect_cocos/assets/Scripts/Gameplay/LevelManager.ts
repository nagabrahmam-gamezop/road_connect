import { _decorator, CCInteger, Component, instantiate, Node, Prefab } from 'cc';
import { GameState } from '../GameState';
import { LevelSelectButton } from './LevelSelectButton';
const { ccclass, property } = _decorator;

@ccclass('LevelManager')
export class LevelManager extends Component {

    @property(Node)
    private buttonsLayout : Node;

    @property(Prefab)
    private levelSelectButton : Prefab;

    @property(CCInteger)
    private levelsPerPage : number = 4;

    start() {
        let currentLevel = GameState.getInstance().currentLevel;
        let levelData = GameState.getInstance().getLevelData(currentLevel);
        this.createLevelSelectButtons(levelData);
    }

    update(deltaTime: number) {
        
    }

    createLevelSelectButtons(levelData: any){
        for (let i = 0; i < this.levelsPerPage; i++) {
            const levelSelectButton = instantiate(this.levelSelectButton);
            levelSelectButton.parent = this.buttonsLayout;
            levelSelectButton.getComponent(LevelSelectButton).setLevel(i + 1);
        }
    }   
    
}


