import { _decorator, AudioSource, Component, math, Node, SpriteComponent, SpriteFrame, tween, UIOpacity, Vec3 } from 'cc';
import { MyEvent } from '../Event';
import { SoundHandler } from '../SoundHandler';
const { ccclass, property } = _decorator;

/**
 * Represents a grid piece in the game.
 */
@ccclass('GridPiece')
export class GridPiece extends Component {

    /**
     * The road node of the grid piece.
     */
    @property(Node)
    private roadNode : Node

    /**
     * The audio node of the grid piece.
     */
    @property(AudioSource)
    private audioNode : AudioSource;

    private isRotating : boolean = false;
    private roadName : string = "";

    private isBonus : boolean = false;
    private isMirror : boolean = false;

    private targetRotation : number = 0;
    private startRotation : number = 0;

    /**
     * Called when the component is started.
     */
    start() {
        if (this.roadNode == null) {
            return;
        }
        
        this.playEntryAnimation();

    }

    /**
     * Called every frame.
     * @param deltaTime - The time since the last frame.
     */
    update(deltaTime: number) {
        
    }

    /**
     * Initializes the grid piece.
     * @param cell - The cell data.
     * @param roadSprites - The array of road sprites.
     */
    init(cell : any, roadSprites : SpriteFrame[]){
        if (cell.id === -1) {
            this.setEmpty();
        } else {
            this.startRotation = cell.sR;
            this.setStartRotation(cell.sR);
            this.targetRotation = cell.tR;
            this.setRoadSprite(roadSprites[cell.id]);
        }
    }

    /**
     * Called when the grid piece is clicked.
     */
    onGridPieceClicked(){
        this.rotate();
    }

    /**
     * Rotates the grid piece.
     */
    rotate() {
        if (this.roadNode == null) {
            return;
        }
        if (this.isRotating) {
            return;
        }

        this.rotateTween();
        
    }

    /**
     * Called when the rotation starts.
     */
    onRotationStart(){
        SoundHandler.getInstance().playSound("rotate");
        this.isRotating=true;
    }

    /**
     * Called when the rotation ends.
     */
    onRotationEnd(){
        console.log(this.roadNode.eulerAngles, this.roadNode.angle)
        this.isRotating=false;
        this.node.dispatchEvent(new MyEvent('pieceRotated', true, { piece: this }));
    }

    /**
     * Sets the start rotation of the grid piece.
     * @param value - The start rotation value.
     */
    setStartRotation(value : number){
        this.roadNode.angle  = value;
    }

    /**
     * Sets the road sprite of the grid piece.
     * @param sprite - The sprite frame to set.
     */
    setRoadSprite(sprite : SpriteFrame){
        this.roadName = sprite.name;
        const roadSpr = this.roadNode.getComponent(SpriteComponent);
        roadSpr.spriteFrame = sprite;

        if (this.roadName.includes("BN360")) {
            this.isBonus = true;
        } else if (this.roadName.includes("MR180")) {
            this.isMirror = true;
        }
    }

    /**
     * Sets the grid piece as empty.
     */
    setEmpty(){
        this.node.removeAllChildren();
    }

    /**
     * Plays the entry animation of the grid piece.
     */
    playEntryAnimation() {
        let delay = math.randomRange(0, 0.5);
        this.roadNode.setScale(new Vec3(0, 0, 0));
        tween(this.roadNode)
            .delay(delay)
            .to(0.25, {
                scale: new Vec3(1, 1, 1)
            }).start();
    }

    /**
     * Performs the rotation tween of the grid piece.
     */
    rotateTween() {
        tween(this.roadNode).by(0.25, { angle: -90 }, {
            onStart: this.onRotationStart.bind(this),
            onComplete: this.onRotationEnd.bind(this)
        }).start();
    }

    /**
     * Gets the road name of the grid piece.
     * @returns The road name.
     */
    getRoadName(){
        return this.roadName;
    }

    /**
     * Checks if the grid piece is in the correct rotation.
     * @returns True if the grid piece is correct, false otherwise.
     */
    checkIfCorrect(){
        if (this.node.children.length <= 0) {
            return true;
        }
        let normalizedAngle = this.normalizeNegativeAngles(this.roadNode.angle);

        if (this.isBonus) {
            console.warn("Bonus piece detected");
            return true;
        }

        if (this.isMirror) {
            console.warn("Mirror piece detected");
            if (!math.equals(Math.abs(normalizedAngle), Math.abs(this.targetRotation))) {
                let newAngle = 0;                
                switch (this.targetRotation) {
                    case 0:
                        newAngle = 180;
                        break;
                    case 90:
                        newAngle = 270;
                        break;
                    case 180:
                        newAngle = 0;
                        break;
                    case 270:
                        newAngle = 90;
                        break;
                }
                return math.equals(Math.abs(normalizedAngle), Math.abs(newAngle));

            }
        }
        console.warn("Normal piece detected");
        return math.equals(Math.abs(normalizedAngle), Math.abs(this.targetRotation));
    }

    /**
     * Normalizes negative angles to positive angles.
     * @param angle - The angle to normalize.
     * @returns The normalized angle.
     */
    public normalizeNegativeAngles(angle : number) {
        let normalizedAngle = angle % 360;

        if (normalizedAngle < -270) {
            normalizedAngle += 360;
        }

        return normalizedAngle;
    }
}


