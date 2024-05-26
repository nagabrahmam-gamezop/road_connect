import { _decorator, Component, Label, Node } from 'cc';
import { GameState } from '../GameState';
import { Languages } from '../Languages';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property(Node)
    private puzzleManager : Node;

    @property(Node)
    private levelManager : Node

    @property(Node)
    private optionsBtn : Node

    @property(Label)
    private levelTitle : Label;

    protected onLoad(): void {
        this.node.on('levelSelected', this.onLevelSelected, this);
    }

    start() {
        this.gotoLevelSelectionScreen();
        this.setLevelTitle('levelSelect');
    }

    update(deltaTime: number) {
        
    }

    gotoLevelSelectionScreen() {
        this.puzzleManager.active = false;
        this.optionsBtn.active = false;
        this.levelManager.active = true;
        this.setLevelTitle("levelSelect");
    }

    gotoPuzzleScreen() {
        this.puzzleManager.active = true;
        this.optionsBtn.active = true;
        this.levelManager.active = false;
        this.setLevelTitle("level");
    }

    onLevelSelected(event: any) {
        const level = event.detail.level;
        if (this.checkIfLevelUnlocked(level)) {
            this.gotoPuzzleScreen();
        }
    }

    checkIfLevelUnlocked(level: number) {
        if (GameState.getInstance().currentLevel >= level) {
            return true;
        }
        else {
            return false;
        }
    }

    setLevelTitle(value : string) {
        this.levelTitle.string = value === "level" ? Languages[GameState.getInstance().getLanguage()][value] + " " + GameState.getInstance().currentLevel : Languages[GameState.getInstance().getLanguage()][value];
    }
}


