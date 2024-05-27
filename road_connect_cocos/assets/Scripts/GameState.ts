import { levelData } from "./Levels";

/**
 * Represents the game state.
 */
export class GameState {

    private static _instance: GameState;
    private _levelData: any = levelData;
    private _currentLevel: number = 1;
    private _maxLevel: number = 4;

    private language: string = "en-US";

    /**
     * Returns the singleton instance of the GameState class.
     * @returns The singleton instance of the GameState class.
     */
    public static getInstance(): GameState {
        if (!this._instance) {
            this._instance = new GameState();
        }
        return this._instance;
    }

    /**
     * Gets the level data.
     * @returns The level data.
     */
    public get levelData(): any {
        return this._levelData;
    }

    /**
     * Gets the current level.
     * @returns The current level.
     */
    public get currentLevel(): number {
        return this._currentLevel;
    }

    /**
     * Sets the current level.
     * @param value - The new value for the current level.
     */
    public set currentLevel(value: number) {
        this._currentLevel = value;
    }

    /**
     * Gets the level data for the specified level.
     * @param level - The level number.
     * @returns The level data for the specified level.
     */
    public getLevelData(level: number): any {
        return this._levelData[`level_${level}`];
    }

    /**
     * Increments the current level by one.
     */
    public incrementLevel(): void {
        this._currentLevel++;
    }
    
    /**
     * Gets the language.
     * @returns The language.
     */
    public getLanguage(): string {
        return this.language;
    }

    /**
     * Sets the language.
     * @param language - The new language.
     */
    public setLanguage(language: string): void {
        this.language = language;
    }

    /**
     * Gets the maximum level.
     * @returns The maximum level.
     */
    public get maxLevel(): number {
        return this._maxLevel;
    }

}