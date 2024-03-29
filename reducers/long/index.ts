import type { Reducer } from 'redux';
import type { GetLongsSuccessPayload } from '@actions/long/get-longs.action';
import type { GetLongSilsSuccessPayload } from '@actions/long/get-sils.action';
import type { GetLongBuhwalsSuccessPayload } from '@actions/long/get-buhwals.action';
import produce from 'immer';
import { GetLongsActionTypes } from '@actions/long/get-longs.action';
import { GetLongActionTypes } from '@actions/long/get-long.action';
import { GetLongSilsActionTypes } from '@actions/long/get-sils.action';
import {
    GetLongSilhyosActionTypes,
    GetLongSilhyosSuccessPayload,
} from '@actions/long/get-silhyos.action';
import { GetLongBuhwalsActionTypes } from '@actions/long/get-buhwals.action';

export interface LongState {
    /**
     * 장기계약 목록
     */
    longs: GetLongsSuccessPayload;
    /**
     * 장기실적 목록
     */
    longSils: GetLongSilsSuccessPayload;
    /**
     * 장기실효계약 목록
     */
    longSilhyos: GetLongSilhyosSuccessPayload;
    /**
     * 부활계약 목록
     */
    longBuhwals: GetLongBuhwalsSuccessPayload;
    /**
     * 장기계약 상세
     */
    long: any;
}

const initialState: LongState = {
    longs: {
        fields: [],
        rows: [],
        total: null,
        lastPayload: null,
    },
    longSils: {
        fields: [],
        rows: [],
        total: null,
        lastPayload: null,
    },
    longSilhyos: {
        fields: [],
        rows: [],
        total: null,
        lastPayload: null,
    },
    longBuhwals: {
        fields: [],
        rows: [],
        total: null,
        lastPayload: null,
    },
    long: null,
};

export const longReducer: Reducer<LongState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GetLongsActionTypes.SUCCESS: {
                draft.longs = action.payload;

                break;
            }
            case GetLongSilsActionTypes.SUCCESS: {
                draft.longSils = action.payload;

                break;
            }
            case GetLongSilhyosActionTypes.SUCCESS: {
                draft.longSilhyos = action.payload;

                break;
            }
            case GetLongBuhwalsActionTypes.SUCCESS: {
                draft.longBuhwals = action.payload;

                break;
            }
            case GetLongActionTypes.SUCCESS: {
                draft.long = action.payload;

                break;
            }

            default:
                return state;
        }
    });
