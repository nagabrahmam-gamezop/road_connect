import { levelData } from "./Levels";

export class GameState {

    private static _instance: GameState;
    private _levelData: any = levelData;
    private _currentLevel: number = 1;
    private language: string = "en-US";

    public static getInstance(): GameState {
        if (!this._instance) {
            this._instance = new GameState();
        }
        return this._instance;
    }

    public get levelData(): any {
        return this._levelData;
    }

    public get currentLevel(): number {
        return this._currentLevel;
    }

    public set currentLevel(value: number) {
        this._currentLevel = value;
    }

    public getLevelData(level: number): any {
        return this._levelData[`level_${level}`];
    }

    public incrementLevel(): void {
        this._currentLevel++;
    }
    
    public getLanguage(): string {
        return this.language;
    }

    public setLanguage(language: string): void {
        this.language = language;
    }
}