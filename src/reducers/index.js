import {combineReducers} from 'redux';
import modeReducer from './modeReducer';
import pageReducer from './pageReducer';
import langReducer from './languageReducer';

export default combineReducers({mode:modeReducer, page:pageReducer, language:langReducer});