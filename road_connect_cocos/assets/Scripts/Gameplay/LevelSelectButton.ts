import { _decorator, Component, Label, Node } from 'cc';
import { GameState } from '../GameState';
import { MyEvent } from '../Event';
const { ccclass, property } = _decorator;

/**
 * Represents a button used for selecting a level.
 */
@ccclass('LevelSelectButton')
export class LevelSelectButton extends Component {

    /**
     * The label component used to display the level number.
     */
    @property(Label)
    private levelLabel : Label;

    private _level : number = 0;

    start() {

    }

    update(deltaTime: number) {
        
    }

    /**
     * Sets the level number for the button.
     * @param level - The level number to set.
     */
    setLevel(level: number){
        this._level = level;
        this.levelLabel.string = level.toString();
    }

    /**
     * Event handler for when the button is clicked.
     * Dispatches a custom event with the selected level.
     */
    onButtonClicked(){
        this.node.dispatchEvent(new MyEvent('levelSelected', true, { level: this._level }));
    }

}


