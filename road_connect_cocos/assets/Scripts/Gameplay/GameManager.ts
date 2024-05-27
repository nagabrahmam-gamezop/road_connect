import { _decorator, Component, Label, Node } from 'cc';
import { GameState } from '../GameState';
import { Languages } from '../Languages';
import { PuzzleManager } from './PuzzleManager';
import { SoundHandler } from '../SoundHandler';
const { ccclass, property } = _decorator;

/**
 * The GameManager class controls the flow of the game and manages game-related components.
 */
@ccclass('GameManager')
export class GameManager extends Component {

    /**
     * The puzzle manager node.
     */
    @property(Node)
    private puzzleManager : Node;

    /**
     * The level manager node.
     */
    @property(Node)
    private levelManager : Node;

    /**
     * The options button node.
     */
    @property(Node)
    private optionsBtn : Node;

    /**
     * The level title label.
     */
    @property(Label)
    private levelTitle : Label;

    /**
     * The level complete node.
     */
    @property(Node)
    private levelComplete : Node;

    /**
     * Called when the script is loaded.
     */
    protected onLoad(): void {
        this.node.on('levelSelected', this.onLevelSelected, this);
        this.node.on('levelComplete', this.onLevelComplete, this);
    }

    /**
     * Called at the beginning of the game.
     */
    start() {
        this.gotoLevelSelectionScreen();
        this.setLevelTitle('levelSelect');
    }

    /**
     * Called every frame.
     * @param deltaTime - The time since the last frame.
     */
    update(deltaTime: number) {
        
    }

    /**
     * Switches to the level selection screen.
     */
    gotoLevelSelectionScreen() {
        this.puzzleManager.active = false;
        this.optionsBtn.active = false;
        this.levelManager.active = true;
        this.levelComplete.active = false;
        this.setLevelTitle("levelSelect");
    }

    /**
     * Switches to the puzzle screen.
     */
    gotoPuzzleScreen() {
        this.puzzleManager.active = true;
        this.optionsBtn.active = true;
        this.levelManager.active = false;
        this.levelComplete.active = false;
        this.setLevelTitle("level");
    }

    /**
     * Switches to the level complete screen.
     */
    gotoLevelComplete() {
        this.puzzleManager.active = false;
        this.optionsBtn.active = true;
        this.levelManager.active = false;
        this.levelComplete.active = true;
    }

    /**
     * Called when a level is selected.
     * @param event - The event containing the selected level.
     */
    onLevelSelected(event: any) {
        SoundHandler.getInstance().playSound("click");
        GameState.getInstance().currentLevel = event.detail.level;
        this.clearPuzzleScreen();
        this.gotoPuzzleScreen();
        this.populatePuzzle();
    }

    /**
     * Checks if a level is unlocked.
     * @param level - The level to check.
     * @returns True if the level is unlocked, false otherwise.
     */
    checkIfLevelUnlocked(level: number) {
        if (GameState.getInstance().currentLevel >= level) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Clears the puzzle screen.
     */
    clearPuzzleScreen(){
        let puzzleManager = this.puzzleManager.getComponent(PuzzleManager);
        puzzleManager.clearPuzzle();
    }

    /**
     * Populates the puzzle grid.
     */
    populatePuzzle() {
        let puzzleManager = this.puzzleManager.getComponent(PuzzleManager);
        puzzleManager.createGrid();
    }

    /**
     * Sets the level title.
     * @param value - The value to set as the level title.
     */
    setLevelTitle(value : string) {
        if (value) {
            this.levelTitle.string = value === "level" ? Languages[GameState.getInstance().getLanguage()][value] + " " + GameState.getInstance().currentLevel : Languages[GameState.getInstance().getLanguage()][value];
        } else {
            this.levelTitle.string = "";
        }
    }

    /**
     * Called when a level is completed.
     * @param event - The event containing the completed level.
     */
    onLevelComplete(event : any){
        SoundHandler.getInstance().playSound("levelComplete");
        if (GameState.getInstance().currentLevel >= GameState.getInstance().maxLevel) {
            this.setLevelTitle("");
            this.gotoLevelComplete();
            return;
        }
        this.setLevelTitle("level");
        let puzzleManager = this.puzzleManager.getComponent(PuzzleManager);
        puzzleManager.gotoNextLevel();
    }
}


