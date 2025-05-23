import { Engine } from '@babylonjs/core';

import ScenesController from '@mmorpg/controllers/ScenesController';
import BaseController from '@mmorpg/controllers/BaseController';
import LoadingScene from '@mmorpg/scenes/LoadingScene';

/**
 * @class GameController
 * @description Singleton controller responsible for managing the game engine lifecycle, handling scene transitions, and responding to browser events.
 * @extends BaseController
 */
class GameController extends BaseController {
	/**
	 * @description The Babylon.js Engine instance used for rendering.
	 * @access private
	 */
	private _engine: Engine;

	private _canvasElement: HTMLCanvasElement;

	/**
	 * @static
	 * @description Singleton instance of GameController.
	 * @access private
	 */
	private static _instance: GameController | undefined;

	/**
	 * @description Private constructor to enforce singleton pattern. Initializes the engine and sets up browser resize handling.
	 * @access private
	 */
	private constructor() {
		super();
		this._canvasElement = this._getCanvasHtmlElement();
		this._fixCanvasSizeForDevelopmentMode();
		this._engine = this._createEngineInstance();
		this._addBrowserResizeHandler();
		this._addRunRenderLoop();
	}

	/**
	 * @static
	 * @description Returns the singleton instance of GameController, creating it if necessary.
	 * @access public
	 * @returns {GameController} The singleton instance.
	 */
	public static getInstance(): GameController {
		if (GameController._instance === undefined) {
			GameController._instance = new GameController();
		}
		return GameController._instance;
	}

	/**
	 * @description Flag indicating whether the game has started.
	 * @access private
	 */
	private _gameStarted: boolean = false;

	/**
	 * @description Starts the game by starting the loading scene.
	 * This method can only be called once; subsequent calls are ignored.
	 * If the game has already started, it logs a message and does nothing.
	 * @access public
	 * @returns {void}
	 */
	public startGame(): void {
		if (!this._gameStarted) {
			ScenesController.getInstance().switchToScene(new LoadingScene());
			console.log('Game started');
			this._gameStarted = true;
		} else {
			console.log('Game already started');
		}
	}

	/**
	 * @description Disposes of the current scene and the Babylon.js engine, cleaning up resources.
	 * @access public
	 * @returns {void}
	 */
	public dispose(): void {
		ScenesController.getInstance().dispose();
		this._engine.dispose();
	}

	/**
	 * @description Retrieves the HTML canvas element used for rendering.
	 * @access private
	 * @returns {HTMLCanvasElement} The canvas element.
	 */
	private _getCanvasHtmlElement(): HTMLCanvasElement {
		return document.getElementById('renderCanvas') as HTMLCanvasElement;
	}

	/**
	 * @description Creates and returns a new Babylon.js Engine instance.
	 * @access private
	 * @returns {Engine} The created engine instance.
	 */
	private _createEngineInstance(): Engine {
		return new Engine(this._canvasElement, true);
	}

	/**
	 * @description Adds a browser resize event handler to resize the engine when the window size changes.
	 * @access private
	 * @returns {void}
	 */
	private _addBrowserResizeHandler() {
		window.addEventListener('resize', () => {
			this._engine.resize();
		});
	}

	private _addRunRenderLoop() {
		this._engine.runRenderLoop(() => {
			const currentSceneInstance = ScenesController.getInstance().currentSceneInstance;
			if (currentSceneInstance && !currentSceneInstance.isDisposed) {
				currentSceneInstance.update();
				currentSceneInstance.render();
			}
		});
	}

	private _fixCanvasSizeForDevelopmentMode() {
		if (process.env.NODE_ENV === 'development') {
			this._canvasElement.style.width = '100%';
			this._canvasElement.style.height = '100%';
		}
	}

	/**
	 * @description Gets the canvas element.
	 * @access public
	 * @returns {HTMLCanvasElement} The canvas element.
	 */
	get canvasElement(): HTMLCanvasElement {
		return this._canvasElement;
	}

	/**
	 * @description Gets the Babylon.js Engine instance.
	 * @access public
	 * @returns {Engine} The engine instance.
	 */
	get engine(): Engine {
		return this._engine;
	}
}

export default GameController;
