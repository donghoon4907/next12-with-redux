import { all, call } from 'redux-saga/effects';

// import { boardSaga } from './board';
import { uploadSaga } from './upload';
import { hrSaga } from './hr';
import { customerSaga } from './customer';
import { contractSaga } from './contract';
import { longSaga } from './long';
import { carSaga } from './car';
import { commonSaga } from './common';
import { ruleSaga } from './rule';
import { orgaSaga } from './orga';
import { userSaga } from './user';

export function* rootSaga() {
    yield all([
        // call(boardSaga),
        call(uploadSaga),
        call(hrSaga),
        call(orgaSaga),
        call(userSaga),
        call(customerSaga),
        call(contractSaga),
        call(longSaga),
        call(carSaga),
        call(commonSaga),
        call(ruleSaga),
    ]);
}
