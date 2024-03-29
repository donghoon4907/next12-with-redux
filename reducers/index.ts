import { AnyAction, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import { errorReducer } from './common/error';
import { loadingReducer } from './common/loading';
import { tabReducer } from './tab';
import { drawerReducer } from './drawer';
import { longReducer } from './long';
import { uploadReducer } from './upload';
import { gnbReducer } from './gnb';
import { modalReducer } from './modal';
import { hrReducer } from './hr';
import { customerReducer } from './customer';
import { commonReducer } from './common';
import { contractReducer } from './contract';
import { carReducer } from './car';
import { ruleReducer } from './rule';
import { orgaReducer } from './orga';
import { userReducer } from './user';

const combinedReducer = combineReducers({
    tab: tabReducer,
    drawer: drawerReducer,
    long: longReducer,
    error: errorReducer,
    loading: loadingReducer,
    upload: uploadReducer,
    gnb: gnbReducer,
    modal: modalReducer,
    hr: hrReducer,
    orga: orgaReducer,
    user: userReducer,
    customer: customerReducer,
    common: commonReducer,
    contract: contractReducer,
    car: carReducer,
    rule: ruleReducer,
});

export const rootReducer = (state: any, action: AnyAction) => {
    let nextState;
    if (action.type === HYDRATE) {
        nextState = {
            ...state,
            ...action.payload,
        };
    } else {
        nextState = combinedReducer(state, action);
    }

    return nextState;
};

export type AppState = ReturnType<typeof rootReducer>;
