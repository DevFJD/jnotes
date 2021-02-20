import { combineReducers } from 'redux';
import cellsReducer from './cellsReducer';
import bundelsReducer from './bundlesReducer';

const reducers = combineReducers({ cells: cellsReducer, bundles: bundelsReducer });

export default reducers;

export type RootState = ReturnType<typeof reducers>;
