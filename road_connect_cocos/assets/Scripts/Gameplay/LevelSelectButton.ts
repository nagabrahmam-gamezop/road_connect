import { _decorator, Component, Label, Node } from 'cc';
import { GameState } from '../GameState';
import { MyEvent } from '../Event';
const { ccclass, property } = _decorator;

@ccclass('LevelSelectButton')
export class LevelSelectButton extends Component {

    @property(Label)
    private levelLabel : Label;

    private _level : number = 0;

    start() {

    }

    update(deltaTime: number) {
        
    }

    setLevel(level: number){
        this._level = level;
        this.levelLabel.string = level.toString();
    }

    onButtonClicked(){
        this.node.dispatchEvent(new MyEvent('levelSelected', true, { level: this._level }));
    }

}


