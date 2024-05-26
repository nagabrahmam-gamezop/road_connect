import { _decorator, Component, instantiate, JsonAsset, Layout, Node, Prefab } from 'cc';
import { levelData } from '../Levels';
import { GameState } from '../GameState';
import { GridPiece } from './GridPiece';
const { ccclass, property } = _decorator;

@ccclass('PuzzleManager')
export class PuzzleManager extends Component {

    @property(Layout)
    private layout : Layout;

    @property(Prefab)
    private gridCell : Prefab;


    start() {
        this.createGrid();
    }

    update(deltaTime: number) {
        
    }

    createGrid(){
        let currentLevelData = levelData[`level_${2}`];
        // let currentLevelData = levelData[`level_${GameState.getInstance().currentLevel}`];
        let grid = currentLevelData.grid;
        this.layout.constraintNum = grid.length;
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                let cell : any = grid[i][j];
                let gridCell = instantiate(this.gridCell);
                gridCell.parent = this.layout.node;
                let gridPiece = gridCell.getComponent(GridPiece);
                gridPiece.setStartRotation(cell.sR);
                if (cell === 0) {
                    gridPiece.setEmpty();
                }
            }
        }
    }
}


