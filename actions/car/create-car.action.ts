import type { Action } from 'redux';
import type { Pay } from '@models/pay';
import type { CorePayload } from '@interfaces/core';

export const CREATE_CAR_KEY = 'CREATE_CAR';

export const CreateCarActionTypes = {
    REQUEST: `${CREATE_CAR_KEY}_REQUEST`,
    SUCCESS: `${CREATE_CAR_KEY}_SUCCESS`,
    FAILURE: `${CREATE_CAR_KEY}_FAILURE`,
} as const;

export interface CreateCarRequestPayload extends CorePayload {
    // 담당자 ID
    userid: string;
    // 보험사 코드
    wcode: number;
    // 계약번호
    cnum: string;
    // 상품코드
    p_code: string;
    // 상품명
    title: string;
    // 보종
    spec: string;
    // 정산보종
    cal_spec: string | null;
    // 계약일자
    // contdate: string;
    // 보장시기
    bo_datefrom: string;
    // 보장만기일
    bo_dateto: string;
    // 보장기간
    bo_desc?: string;
    // 인수구분
    insu?: string;
    // 등급
    rate?: string;
    // 보험료
    payment: number;
    // 납입방법
    cycle?: string;
    // 전보험사
    pre_wcode?: number;
    // 전계약번호
    pre_cnum?: string;
    // 계약자 ID
    c_idx?: number;
    // 계약자 이름
    c_name?: string;
    // 피보험자 목록
    // p_persons: Insured[];
    // 납입실적 목록
    pays?: Pay[];
    // 비교견적 인덱스
    est_idx?: string;
    // 차량번호
    carnum?: string;
    // 정산구분
    cal_type?: string;
    // 청약설계
    sul_dist?: string;
    // 운전자 범위
    carfamily?: string;
    // 최저운전자 연령
    carage?: string;
    // 블랙박스 관련
    blackbox_date?: string;
    blackbox_price?: number;
}

export interface CreateCarRequestAction extends Action<string> {
    payload: CreateCarRequestPayload;
}

export interface CreateCarSuccessAction extends Action<string> {}

export function createCarRequest(
    payload: CreateCarRequestPayload,
): CreateCarRequestAction {
    return {
        type: CreateCarActionTypes.REQUEST,
        payload,
    };
}

export function createCarSuccess(): CreateCarSuccessAction {
    return {
        type: CreateCarActionTypes.SUCCESS,
    };
}
