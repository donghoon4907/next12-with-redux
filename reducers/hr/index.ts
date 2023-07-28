import type { Reducer } from 'redux';
import type { CoreSelectOption } from '@interfaces/core';
import type { Guarantee } from '@models/guarantee';
import type { Code } from '@models/code';
import type { OrgaDetail } from '@models/orga';
import produce from 'immer';
import { GetOrgasActionTypes } from '@actions/hr/get-orgas';
import { DepartActionTypes } from '@actions/hr/set-depart.action';
import { GetUsersActionTypes } from '@actions/hr/get-users';
import { GetCompaniesActionTypes } from '@actions/hr/get-companies';
// import { GetPermissionActionTypes } from '@actions/hr/get-permission.action';
// import { GetIpActionTypes } from '@actions/hr/get-ip.action';
import { PermissionActionTypes } from '@actions/hr/set-permission.action';
import { GetBanksActionTypes } from '@actions/hr/get-banks';
import { GuaranteeActionTypes } from '@actions/hr/set-guarantee.action';
import { GetAgenciesActionTypes } from '@actions/hr/get-agencys';
import { CodeActionTypes } from '@actions/hr/set-code.action';
import { GetOrgaActionTypes } from '@actions/hr/get-orga';
import { GetUserActionTypes } from '@actions/hr/get-user';

export interface HrState {
    /**
     * 보험사목록
     */
    companies: CoreSelectOption[];
    /**
     * 은행목록
     */
    banks: CoreSelectOption[];
    /**
     * 기관목록
     */
    agencies: CoreSelectOption[];
    /**
     * 부서목록
     */
    orgas: CoreSelectOption[];
    /**
     * 부서상세
     */
    orga: OrgaDetail | null;
    /**
     * 영업가족 목록
     */
    users: CoreSelectOption[];
    /**
     * 영업가족 상세
     */
    user: any;
    /**
     * 선택한 부서(조직)
     */
    selectedOrga: CoreSelectOption | null;
    /**
     * 로그인한 사용자 정보
     */
    loggedInUser: any;
    /**
     * 사용자 환경의 IP
     */
    // ip: string;
    /**
     * 보증 설정 목록
     */
    guarantees: Guarantee[];
    /**
     * 삭제된 보증 설정 목록
     */
    removedGuarantees: Guarantee[];
    /**
     * 보험사 코드 목록
     */
    codes: Code[];
    /**
     * 삭제된 보험사 코드 목록
     */
    removedCodes: Code[];
}

const initialState: HrState = {
    companies: [],
    banks: [],
    agencies: [],
    orgas: [],
    orga: null,
    users: [],
    user: null,
    selectedOrga: null,
    loggedInUser: null,
    // ip: '',
    guarantees: [],
    removedGuarantees: [],
    codes: [],
    removedCodes: [],
};

export const hrReducer: Reducer<HrState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GetCompaniesActionTypes.SUCCESS: {
                draft.companies = action.payload;
                break;
            }
            case GetBanksActionTypes.SUCCESS: {
                draft.banks = action.payload;
                break;
            }
            case GetAgenciesActionTypes.SUCCESS: {
                draft.agencies = action.payload;
                break;
            }
            case GetOrgasActionTypes.SUCCESS: {
                draft.orgas = action.payload;
                break;
            }
            case GetOrgaActionTypes.SUCCESS: {
                draft.orga = action.payload;
                break;
            }
            case GetUsersActionTypes.SUCCESS: {
                draft.users = action.payload;
                break;
            }
            case GetUserActionTypes.SUCCESS: {
                draft.user = action.payload;
                break;
            }
            case DepartActionTypes.UPDATE: {
                draft.selectedOrga = action.payload;
                break;
            }
            // case GetPermissionActionTypes.SUCCESS: {
            //     draft.loggedInUser = action.payload;
            //     break;
            // }
            // case GetIpActionTypes.SUCCESS: {
            //     draft.ip = action.payload.ip;
            //     break;
            // }
            case PermissionActionTypes.UPDATE: {
                draft.loggedInUser = action.payload;
                break;
            }
            case GuaranteeActionTypes.CREATE: {
                draft.guarantees = draft.guarantees.concat(action.payload);
                break;
            }
            case GuaranteeActionTypes.UPDATE: {
                const { index, ...rest } = action.payload;

                for (let i = 0; i < draft.guarantees.length; i++) {
                    if (draft.guarantees[i].index === index) {
                        draft.guarantees[i] = {
                            ...draft.guarantees[i],
                            ...rest,
                        };

                        break;
                    }
                }

                break;
            }
            case GuaranteeActionTypes.DELETE: {
                const findIndex = draft.guarantees.findIndex(
                    (v) => v.index === action.payload.index,
                );

                if (findIndex !== -1) {
                    const [deleted] = draft.guarantees.splice(findIndex, 1);

                    if (deleted.idx) {
                        draft.removedGuarantees =
                            draft.removedGuarantees.concat(deleted);
                    }
                }

                break;
            }
            case CodeActionTypes.CREATE: {
                draft.codes = draft.codes.concat(action.payload);
                break;
            }
            case CodeActionTypes.UPDATE: {
                const { index, ...rest } = action.payload;

                for (let i = 0; i < draft.codes.length; i++) {
                    if (draft.codes[i].index === index) {
                        draft.codes[i] = {
                            ...draft.codes[i],
                            ...rest,
                        };

                        break;
                    }
                }

                break;
            }
            case CodeActionTypes.DELETE: {
                const findIndex = draft.codes.findIndex(
                    (v) => v.index === action.payload.index,
                );

                if (findIndex !== -1) {
                    const [deleted] = draft.codes.splice(findIndex, 1);

                    if (deleted.idx) {
                        draft.removedCodes = draft.removedCodes.concat(deleted);
                    }
                }

                break;
            }
            default:
                return state;
        }
    });
