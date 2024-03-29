import type { CreateContactRequestAction } from '@actions/common/create-contact.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import commonsService from '@services/commonsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    createContactSuccess,
    CreateContactActionTypes,
} from '@actions/common/create-contact.action';

function* createContactSaga({ payload }: CreateContactRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(commonsService.createContact, rest);

    yield put(createContactSuccess());

    return data;
}

export function* watchCreateContact() {
    yield takeEvery(
        CreateContactActionTypes.REQUEST,
        commonMiddleware(createContactSaga),
    );
}
