import { _decorator, Component, Node, tween, UIOpacity, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GridPiece')
export class GridPiece extends Component {

    @property(Node)
    private roadNode : Node
    private isRotating : boolean = false;


    start() {
        console.log(" start scale tween :> ");
        
        this.roadNode.setScale(new Vec3(0, 0, 0));
        tween(this.roadNode).to(0.25, {
            scale : new Vec3(1, 1, 1)
        }).start();
    }

    update(deltaTime: number) {
        
    }

    rotate() {
        if (this.isRotating) {
            return;
        }

        tween(this.node).by(0.1, {angle : 90}, {
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
}


