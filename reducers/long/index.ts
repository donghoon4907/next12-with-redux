import type { Reducer } from 'redux';
import type { Endorsement } from '@models/endorsement';
import type { GetLongsSuccessPayload } from '@actions/contract/long/get-longs.action';
import type { GetLongSilsSuccessPayload } from '@actions/contract/long/get-long-sils.action';
import type { GetLongBuhwalsSuccessPayload } from '@actions/contract/long/get-long-buhwals.action';
import produce from 'immer';
import { GetLongsActionTypes } from '@actions/contract/long/get-longs.action';
import { GetLongActionTypes } from '@actions/contract/long/get-long.action';
// import { LongEtcUpdateActionTypes } from '@actions/long/set-long-etc.action';
import { EndorsementActionTypes } from '@actions/contract/long/set-endorsement.action';
import { GetLongFieldsActionTypes } from '@actions/contract/long/get-long-fields.action';
import { GetLongSilsActionTypes } from '@actions/contract/long/get-long-sils.action';
import {
    GetLongSilhyosActionTypes,
    GetLongSilhyosSuccessPayload,
} from '@actions/contract/long/get-long-silhyos.action';
import { GetLongBuhwalsActionTypes } from '@actions/contract/long/get-long-buhwals.action';
import { KeyValue } from '@models/keyValue';
import { InfoCustActionTypes } from '@actions/contract/long/set-info-cust.action';
import { InfoProductActionTypes } from '@actions/contract/long/set-info-product.action';

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
    /**
     * 장기테이블 필드 목록
     */
    fields: Array<any>;
    /**
     * 배서 목록
     */
    endorsements: Endorsement[];
    /**
     * 삭제한 배서 목록
     */
    removedEndorsements: Endorsement[];
    /**
     * 관리정보 목록
     */
    infoCusts: KeyValue[];
    /**
     * 선택한 관리정보
     */
    selectedInfoCust: KeyValue | null;
    /**
     * 기타계약정보 목록
     */
    infoProducts: KeyValue[];
    /**
     * 선택한 기타계약정보
     */
    selectedInfoProduct: KeyValue | null;
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
    fields: [],
    // etcs: [],
    endorsements: [
        {
            index: 0,
            checked: false,
            idx: 3102,
            dist: '해지',
            paydate: '2023-06-14',
            gdate: '2023-06-01',
            whoi: 1,
            pay_before: 78000,
            pay_after: 78000,
            tp_before: 78000,
            tp_after: 78000,
            balance: 78000,
            confirm: 'Y',
            insert: 'system 2023-07-04 17:46',
        },
    ],
    removedEndorsements: [],
    infoCusts: [],
    selectedInfoCust: null,
    infoProducts: [],
    selectedInfoProduct: null,
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
            case GetLongFieldsActionTypes.SUCCESS: {
                draft.fields = action.payload;

                break;
            }
            // case LongEtcUpdateActionTypes.UPDATE: {
            //     draft.long.etcs[action.payload.field] = action.payload.content;

            //     break;
            // }
            case EndorsementActionTypes.CREATE: {
                draft.endorsements = draft.endorsements.concat(action.payload);
                break;
            }
            case EndorsementActionTypes.UPDATE: {
                const { index, ...rest } = action.payload;

                for (let i = 0; i < draft.endorsements.length; i++) {
                    if (draft.endorsements[i].index === index) {
                        draft.endorsements[i] = {
                            ...draft.endorsements[i],
                            ...rest,
                        };

                        break;
                    }
                }

                break;
            }
            case EndorsementActionTypes.DELETE: {
                const findIndex = draft.endorsements.findIndex(
                    (v) => v.index === action.payload.index,
                );

                if (findIndex !== -1) {
                    const [deleted] = draft.endorsements.splice(findIndex, 1);

                    if (deleted.idx) {
                        draft.removedEndorsements =
                            draft.removedEndorsements.concat(deleted);
                    }
                }

                break;
            }
            case InfoCustActionTypes.CREATE: {
                draft.infoCusts = draft.infoCusts.concat(action.payload);
                break;
            }
            case InfoCustActionTypes.SELECT: {
                draft.selectedInfoCust = action.payload;
                break;
            }
            case InfoCustActionTypes.UPDATE: {
                const { index, ...rest } = action.payload;

                for (let i = 0; i < draft.infoCusts.length; i++) {
                    if (draft.infoCusts[i].index === index) {
                        draft.infoCusts[i] = {
                            ...draft.infoCusts[i],
                            ...rest,
                        };

                        break;
                    }
                }

                break;
            }
            case InfoCustActionTypes.DELETE: {
                const findIndex = draft.infoCusts.findIndex(
                    (v) => v.index === action.payload.index,
                );

                if (findIndex !== -1) {
                    const [deleted] = draft.infoCusts.splice(findIndex, 1);

                    // if (deleted.idx) {
                    //     draft.removedPays = draft.removedPays.concat(deleted);
                    // }
                }

                break;
            }
            case InfoProductActionTypes.CREATE: {
                draft.infoProducts = draft.infoProducts.concat(action.payload);
                break;
            }
            case InfoProductActionTypes.SELECT: {
                draft.selectedInfoProduct = action.payload;
                break;
            }
            case InfoProductActionTypes.UPDATE: {
                const { index, ...rest } = action.payload;

                for (let i = 0; i < draft.infoProducts.length; i++) {
                    if (draft.infoProducts[i].index === index) {
                        draft.infoProducts[i] = {
                            ...draft.infoProducts[i],
                            ...rest,
                        };

                        break;
                    }
                }

                break;
            }
            case InfoProductActionTypes.DELETE: {
                const findIndex = draft.infoProducts.findIndex(
                    (v) => v.index === action.payload.index,
                );

                if (findIndex !== -1) {
                    const [deleted] = draft.infoProducts.splice(findIndex, 1);

                    // if (deleted.idx) {
                    //     draft.removedPays = draft.removedPays.concat(deleted);
                    // }
                }

                break;
            }
            default:
                return state;
        }
    });
