import type { CreateUserRequestAction } from '@actions/user/create-user.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import usersService from '@services/usersService';
import {
    CreateUserActionTypes,
    createUserSuccess,
} from '@actions/user/create-user.action';
import { commonMiddleware } from '@utils/generators/common';

function* createUserSaga({ payload }: CreateUserRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(usersService.createUser, rest);

    const { userid, Message } = data;

    if (!userid) {
        alert(Message);
    }

    yield put(createUserSuccess());

    return data;
}

export function* watchCreateUser() {
    yield takeEvery(
        CreateUserActionTypes.REQUEST,
        commonMiddleware(createUserSaga),
    );
}
