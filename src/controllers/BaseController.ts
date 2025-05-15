/**
 * @class BaseController
 * @description Abstract base class for controllers, providing initialization and disposal contract for subclasses.
 * @abstract
 */
abstract class BaseController {
	/**
	 * @description Indicates whether the controller has been initialized.
	 * @access protected
	 */
	protected _initialized: boolean = false;

	/**
	 * @description Constructs a new BaseController and calls the initialization method.
	 * @access public
	 */
	constructor() {
		this._init();
	}

	/**
	 * @description Abstract method for controller-specific initialization logic. Must be implemented by subclasses.
	 * @access protected
	 * @abstract
	 * @returns {void}
	 */
	protected abstract _init(): void;

	/**
	 * @description Abstract method for disposing of controller resources. Must be implemented by subclasses.
	 * @access public
	 * @abstract
	 * @returns {void}
	 */
	public abstract dispose(): void;
}

export default BaseController;
