import type { CreateCarRequestAction } from '@actions/car/create-car.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import carsService from '@services/carsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    CreateCarActionTypes,
    createCarSuccess,
} from '@actions/car/create-car.action';

function* createCarSaga({ payload }: CreateCarRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(carsService.createCar, rest);

    const { Message } = data;

    if (!data.data) {
        alert(Message);
    }

    yield put(createCarSuccess());

    return data;
}

export function* watchCreateCar() {
    yield takeEvery(
        CreateCarActionTypes.REQUEST,
        commonMiddleware(createCarSaga),
    );
}
