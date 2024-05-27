import { _decorator, AudioSource, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * SoundHandler class handles the playing of different sounds in the game.
 */
@ccclass('SoundHandler')
export class SoundHandler extends Component {

    /**
     * The sound played when a click event occurs.
     */
    @property(AudioSource)
    private clickSound : AudioSource;

    /**
     * The sound played when a rotate event occurs.
     */
    @property(AudioSource)
    private rotateSound : AudioSource;

    /**
     * The sound played when a level is completed.
     */
    @property(AudioSource)
    private levelCompleteSound : AudioSource;

    private static _instance: SoundHandler;

    /**
     * Returns the singleton instance of the SoundHandler class.
     * @returns The singleton instance of the SoundHandler class.
     */
    public static getInstance(): SoundHandler {
        if (!this._instance) {
            this._instance = new SoundHandler();
        }
        return this._instance;
    }

    protected onLoad(): void {
        SoundHandler._instance = this;
        director.addPersistRootNode(this.node);    
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    /**
     * Plays the specified sound.
     * @param sound - The name of the sound to be played.
     */
    playSound(sound: string) {
        switch (sound) {
            case "click":
                this.clickSound.play();
                break;
            case "rotate":
                this.rotateSound.play();
                break;
            case "levelComplete":
                this.levelCompleteSound.play();
                break;
            default:
                break;
        }
    }
}


