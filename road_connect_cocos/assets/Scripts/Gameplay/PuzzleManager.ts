import { _decorator, Component, instantiate, JsonAsset, Layout, math, Node, Prefab, SpriteFrame, UITransform } from 'cc';
import { levelData } from '../Levels';
import { GameState } from '../GameState';
import { GridPiece } from './GridPiece';
import { MyEvent } from '../Event';
const { ccclass, property } = _decorator;

/**
 * Manages the puzzle gameplay logic.
 */
@ccclass('PuzzleManager')
export class PuzzleManager extends Component {

    /**
     * The layout component used to arrange the grid cells.
     */
    @property(Layout)
    private layout : Layout;

    /**
     * The prefab used to create grid cells.
     */
    @property(Prefab)
    private gridCell : Prefab;
    
    /**
     * The array of sprite frames representing different road types.
     */
    @property([SpriteFrame])
    private roadSprites : SpriteFrame[] = [];

    protected onLoad(): void {
        this.node.on('pieceRotated', this.checkIfPuzzleSolved, this);
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    /**
     * Creates the grid based on the current level data.
     */
    createGrid(){
        let currentLevelData = levelData[`level_${GameState.getInstance().currentLevel}`];
        let grid = currentLevelData.grid;
        this.layout.constraintNum = grid.length;
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                let cell : any = grid[i][j];
                let gridCell = instantiate(this.gridCell);
                this.layout.node.addChild(gridCell);
                let gridPiece = gridCell.getComponent(GridPiece);
                gridPiece.init(cell, this.roadSprites);
            }
        }

        this.updateLayout(currentLevelData.sW, currentLevelData.sH);

    }

    /**
     * Checks if the puzzle is solved by iterating through all grid pieces.
     */
    checkIfPuzzleSolved(){
        console.clear();
        let gridPieces = this.layout.node.children;
        let levelCompleted = true;
        gridPieces.forEach(gridPiece => {
            let gridPieceComponent = gridPiece.getComponent(GridPiece);
            let isCorrect = gridPieceComponent.checkIfCorrect();
            if (!isCorrect) {
                levelCompleted = false;
                return;
            }
        });
        if (levelCompleted) {
            this.levelComplete();
        }
    }

    /**
     * Called when the level is completed.
     * Increases the current level, clears the puzzle, and dispatches a levelComplete event.
     */
    levelComplete(){
        console.log(" Level completed :> ");
        GameState.getInstance().currentLevel++;
        
        this.scheduleOnce(()=>{
            this.clearPuzzle();
        }, 0.5)
        this.scheduleOnce(()=>{
            this.node.dispatchEvent(new MyEvent("levelComplete", true))
        }, 0.7);
    }

    /**
     * Goes to the next level by creating a new grid.
     */
    gotoNextLevel(){
        this.createGrid();
    }

    /**
     * Clears the puzzle by destroying all grid cell nodes.
     */
    clearPuzzle(){
        this.layout.node.destroyAllChildren();
    }

    updateLayout(sizeMultiplierWidth: number, sizeMultiplierHeight: number){
        this.layout.node.getComponent(UITransform).setContentSize(new math.Size(128 * sizeMultiplierWidth, 128 * sizeMultiplierHeight));
        this.layout.updateLayout();
        this.layout.node.setPosition(0, 0);
    }
}


