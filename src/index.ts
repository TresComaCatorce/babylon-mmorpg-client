import GameController from '@mmorpg/controllers/GameController';
import ItemFactory from '@mmorpg/factories/ItemFactory';
import './index.css';

ItemFactory.getInstance();
GameController.getInstance().startGame();
