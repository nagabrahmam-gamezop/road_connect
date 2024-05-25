import { _decorator, Component, JsonAsset, Layout, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PuzzleManager')
export class PuzzleManager extends Component {

    @property(Layout)
    private layout : Layout;

    @property(JsonAsset)
    private levelData : JsonAsset;

    start() {
        console.log(" level data : ", this.levelData);
    }

    update(deltaTime: number) {
        
    }

    createGrid(){
        let grid = this.layout.constraint;
    }
}


