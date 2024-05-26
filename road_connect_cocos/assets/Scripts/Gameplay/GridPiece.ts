import { _decorator, AudioSource, Component, math, Node, tween, UIOpacity, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GridPiece')
export class GridPiece extends Component {

    @property(Node)
    private roadNode : Node

    @property(AudioSource)
    private audioNode : AudioSource;

    private isRotating : boolean = false;


    start() {
        console.log(" start scale tween :> ");
        if (this.roadNode == null) {
            return;
        }
        let delay = math.randomRange(0, 0.5);

        this.roadNode.setScale(new Vec3(0, 0, 0));
        tween(this.roadNode)
        .delay(delay)
        .to(0.25, {
            scale : new Vec3(1, 1, 1)
        }).start();
    }

    update(deltaTime: number) {
        
    }

    rotate() {
        if (this.roadNode == null) {
            return;
        }
        if (this.isRotating) {
            return;
        }

        tween(this.roadNode).by(0.1, {angle : 90}, {
            onStart: this.onRotationStart.bind(this),
            onComplete: this.onRotationEnd.bind(this)
        }).start();
        
    }

    onRotationStart(){
        this.isRotating=true;
    }

    onRotationEnd(){
        this.isRotating=false;
    }

    setStartRotation(value : number){
        this.roadNode.angle  = value;
    }

    setEmpty(){
        this.node.removeAllChildren();
    }
}


