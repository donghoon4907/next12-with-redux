import type { UpdateOrgaRequestAction } from '@actions/hr/update-orga.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import {
    UpdateOrgaActionTypes,
    updateOrgaSuccess,
} from '@actions/hr/update-orga.action';
import { commonMiddleware } from '@utils/generators/common';

function* updateOrgaSaga({ payload }: UpdateOrgaRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(hrsService.beforeUpdateOrga, rest);

    const { Message } = data;

    if (Message !== 'Success') {
        alert(Message);
    }

    yield put(updateOrgaSuccess());

    return data;
}

export function* watchUpdateOrga() {
    yield takeEvery(
        UpdateOrgaActionTypes.REQUEST,
        commonMiddleware(updateOrgaSaga),
    );
}
