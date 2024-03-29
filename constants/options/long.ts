import type { CoreSelectOption } from '@interfaces/core';

// 보장기간
const L_DURATION: CoreSelectOption[] = Array.from({ length: 50 }).map(
    (_, i) => ({
        label: `${i + 1}년`,
        value: `${i + 1}`,
    }),
);
// 필드목록
const L_FIELDS: CoreSelectOption[] = [
    {
        label: '계약번호',
        value: 'cnum',
        isFixed: false,
    },
    {
        label: '피보험자',
        value: 'p_name',
        isFixed: false,
    },
    {
        label: '계약자',
        value: 'c_name',
        isFixed: false,
    },
    {
        label: '상품코드',
        value: 'p_code',
        isFixed: false,
    },
    {
        label: '상품명',
        value: 'title',
        isFixed: false,
    },
    {
        label: '납입종기',
        value: 'pay_dateto',
        isFixed: false,
    },
    {
        label: '납입기간',
        value: 'pay_du',
        isFixed: false,
    },
    {
        label: '실적보험료',
        value: 'pay',
        isFixed: false,
    },
    {
        label: '수정보험료',
        value: 'tp',
        isFixed: false,
    },
    {
        label: '사용인코드',
        value: 'fccode',
        isFixed: false,
    },
];
// 납입주기
const PAY_CYCLE: CoreSelectOption[] = [
    {
        label: '월납',
        value: '1',
        isFixed: false,
    },
    {
        label: '3월납',
        value: '3',
        isFixed: false,
    },
    {
        label: '6월납',
        value: '6',
        isFixed: false,
    },
    {
        label: '연납',
        value: '12',
        isFixed: false,
    },
    {
        label: '일시납',
        value: '0',
        isFixed: false,
    },
];
const PAY_CYCLE2: CoreSelectOption[] = [
    {
        label: '전체',
        value: '',
        isFixed: false,
    },
    {
        label: '월납',
        value: '1',
        isFixed: false,
    },
    {
        label: '비월납',
        value: '99',
        isFixed: false,
    },
    {
        label: '일시납',
        value: '0',
        isFixed: false,
    },
    {
        label: '3월납',
        value: '3',
        isFixed: false,
    },
    {
        label: '6월납',
        value: '6',
        isFixed: false,
    },
    {
        label: '연납',
        value: '12',
        isFixed: false,
    },
];
// 납입기간
const PAY_DURATION: CoreSelectOption[] = [
    {
        label: '1년',
        value: '1',
        isFixed: false,
    },
    {
        label: '5년',
        value: '5',
        isFixed: false,
    },
    {
        label: '10년',
        value: '10',
        isFixed: false,
    },
    {
        label: '20년',
        value: '20',
        isFixed: false,
    },
    {
        label: '30년',
        value: '30',
        isFixed: false,
    },
    {
        label: '종신',
        value: '종신',
        isFixed: false,
    },
];

// 계약 상태
const STATUS_BEFORE: CoreSelectOption[] = [
    {
        label: '정상유지',
        value: '정상유지',
        isFixed: false,
    },
    {
        label: '계약철회',
        value: '계약철회',
        isFixed: false,
    },
    {
        label: '품보해지',
        value: '품보해지',
        isFixed: false,
    },
    {
        label: '민원해지',
        value: '민원해지',
        isFixed: false,
    },
];
const STATUS_AFTER: CoreSelectOption[] = [
    {
        label: '임의해지',
        value: '임의해지',
        isFixed: false,
    },
    {
        label: '실효해지',
        value: '실효해지',
        isFixed: false,
    },
    {
        label: '미납실효',
        value: '미납실효',
        isFixed: false,
    },
    {
        label: '보장종료',
        value: '보장종료',
        isFixed: false,
    },
    {
        label: '계약종료',
        value: '계약종료',
        isFixed: false,
    },
    {
        label: '타사이관',
        value: '타사이관',
        isFixed: false,
    },
];
const STATUS: CoreSelectOption[] = [...STATUS_BEFORE, ...STATUS_AFTER];
const BO_STATUS: CoreSelectOption[] = [
    {
        label: '전체',
        value: '',
        isFixed: false,
    },
    ...STATUS_BEFORE,
    {
        label: '미유지',
        value: '미유지',
        isFixed: false,
        color: 'red',
        fontWeight: 'bold',
    },
    ...STATUS_AFTER,
];
const SIL_STATUS: CoreSelectOption[] = [
    {
        label: '전체',
        value: '',
        isFixed: false,
    },
    ...STATUS_BEFORE,
    {
        label: '미유지',
        value: '미유지',
        isFixed: false,
        color: 'red',
        fontWeight: 'bold',
    },
    ...STATUS_AFTER,
];

// 수금 상태
const PAY_STATUS: CoreSelectOption[] = [
    {
        label: '납입중',
        value: '납입중',
        isFixed: false,
    },
    {
        label: '납입유예',
        value: '납입유예',
        isFixed: false,
    },
    {
        label: '납입면제',
        value: '납입면제',
        isFixed: false,
    },
    {
        label: '납입완료',
        value: '납입완료',
        isFixed: false,
    },
    {
        label: '부활대상',
        value: '부활대상',
        isFixed: false,
    },
    {
        label: '납입불가',
        value: '납입불가',
        isFixed: false,
    },
    // {
    //     label: '임의해지',
    //     value: '임의해지',
    //     isFixed: false,
    // },
    // {
    //     label: '미납실효',
    //     value: '미납실효',
    //     isFixed: false,
    // },
    // {
    //     label: '보장종료',
    //     value: '보장종료',
    //     isFixed: false,
    // },
    // {
    //     label: '계약종료',
    //     value: '계약종료',
    //     isFixed: false,
    // },
    // {
    //     label: '타사이관',
    //     value: '타사이관',
    //     isFixed: false,
    // },
];

// 납입구분
const PAY_DIST: CoreSelectOption[] = [
    // {
    //     label: '신규',
    //     value: '신규',
    //     isFixed: false,
    // },
    {
        label: '계속',
        value: '계속',
        isFixed: false,
    },
    // {
    //     label: '계속취소',
    //     value: '계속취소',
    //     isFixed: false,
    // },
    {
        label: '철회',
        value: '철회',
        isFixed: false,
    },
    {
        label: '취소',
        value: '취소',
        isFixed: false,
    },
    {
        label: '환급',
        value: '환급',
        isFixed: false,
    },
    {
        label: '추징',
        value: '추징',
        isFixed: false,
    },
];

// 배서구분
const BAESE_DIST: CoreSelectOption[] = [
    {
        label: '실효',
        value: '실효',
        isFixed: false,
    },
    {
        label: '해지',
        value: '해지',
        isFixed: false,
    },
    {
        label: '감액',
        value: '감액',
        isFixed: false,
    },
    {
        label: '부활',
        value: '부활',
        isFixed: false,
    },
];

// 금종
const PAY_KIND: CoreSelectOption[] = [
    {
        label: '카드',
        value: '카드',
        isFixed: false,
    },
    {
        label: '현금',
        value: '현금',
        isFixed: false,
    },
];
// 정산구분
const CAL_TYPE: CoreSelectOption[] = [
    {
        label: '기본정산',
        value: '기본정산',
        isFixed: false,
    },
    {
        label: '기본정산 + 갱신',
        value: '기본정산 + 갱신',
        isFixed: false,
    },
    {
        label: '보류(회차변환O)',
        value: '보류(회차변환O)',
        isFixed: false,
    },
    {
        label: '보류(회차변환X)',
        value: '보류(회차변환X)',
        isFixed: false,
    },
    {
        label: '정산안함',
        value: '정산안함',
        isFixed: false,
    },
];
// 본인계약여부
const L_FAMILY: CoreSelectOption[] = [
    {
        label: '해당없음',
        value: '',
        isFixed: false,
    },
    {
        label: '본인계약',
        value: 'Y',
        isFixed: false,
    },
    {
        label: '가족계약',
        value: 'N',
        isFixed: false,
    },
];
// 보종 목록
const P_TYPE: CoreSelectOption[] = [
    {
        label: '인보장',
        value: '인보장',
        isFixed: false,
    },
    {
        label: '재물',
        value: '재물',
        isFixed: false,
    },
    {
        label: '연저축',
        value: '연저축',
        isFixed: false,
    },
];
// 보종 목록
const P_TYPE2: CoreSelectOption[] = [
    {
        label: '전체',
        value: '',
        isFixed: false,
    },
    ...P_TYPE,
];
// 고객경로
const SOURCE_ROOT: CoreSelectOption[] = [
    {
        label: '전체',
        value: '',
        isFixed: false,
    },
    {
        label: '모집',
        value: '모집',
        isFixed: false,
    },
    {
        label: 'DB전체',
        value: 'db',
        isFixed: false,
    },
    {
        label: '퇴직자',
        value: '퇴직자',
        isFixed: false,
    },
    {
        label: '홈쇼핑',
        value: '홈쇼핑',
        isFixed: false,
    },
    {
        label: '태아',
        value: '태아',
        isFixed: false,
    },
    {
        label: '플랫폼',
        value: '플랫폼',
        isFixed: false,
    },
    {
        label: '병원',
        value: '병원',
        isFixed: false,
    },
    {
        label: '업셀링M',
        value: '업셀링M',
        isFixed: false,
    },
    {
        label: '기타',
        value: '기타',
        isFixed: false,
    },
];

// 입금구분
const SIL_DIST: CoreSelectOption[] = [
    {
        label: '전체',
        value: '',
        isFixed: false,
    },
    {
        label: '성적',
        value: '성적',
        isFixed: false,
        fontWeight: 'bold',
    },
    {
        label: '신규',
        value: '신규',
        isFixed: false,
    },
    {
        label: '철회',
        value: '철회',
        isFixed: false,
    },
    {
        label: '취소',
        value: '취소',
        isFixed: false,
    },
    {
        label: '실효',
        value: '실효',
        isFixed: false,
    },
    {
        label: '해지',
        value: '해지',
        isFixed: false,
    },
    {
        label: '부활',
        value: '부활',
        isFixed: false,
    },
    {
        label: '감액',
        value: '감액',
        isFixed: false,
    },
    {
        label: '계속분',
        value: '계속분',
        isFixed: false,
        fontWeight: 'bold',
    },
    {
        label: '계속',
        value: '계속',
        isFixed: false,
    },
    {
        label: '계속취소',
        value: '계속취소',
        isFixed: false,
    },
    {
        label: '기타',
        value: '기타',
        isFixed: false,
    },
    {
        label: '추징',
        value: '추징',
        isFixed: false,
    },
    {
        label: '환급',
        value: '환급',
        isFixed: false,
    },
];

// 회차
const WHOI: CoreSelectOption[] = [
    {
        label: '전체',
        value: '1,999',
        isFixed: false,
    },
    {
        label: '초회',
        value: '1,1',
        isFixed: false,
    },
    {
        label: '초년도',
        value: '1,12',
        isFixed: false,
    },
    {
        label: '2차년도이상',
        value: '13,999',
        isFixed: false,
    },
];

// 청약서제출여부
const SUBS_SUBMISSION: CoreSelectOption[] = [
    {
        label: '미제출',
        value: '미제출',
        isFixed: false,
    },
    {
        label: '회사',
        value: '회사',
        isFixed: false,
    },
    {
        label: '보험사',
        value: '보험사',
        isFixed: false,
    },
];

const rootSelectOptions = {
    payCycle: PAY_CYCLE,
    payCycle2: PAY_CYCLE2,
    payDu: PAY_DURATION,
    status: STATUS,
    boStatus: BO_STATUS,
    silStatus: SIL_STATUS,
    pStatus: PAY_STATUS,
    pDist: PAY_DIST,
    baeseDist: BAESE_DIST,
    payKind: PAY_KIND,
    calType: CAL_TYPE,
    family: L_FAMILY,
    productType: P_TYPE,
    productType2: P_TYPE2,
    fields: L_FIELDS,
    duration: L_DURATION,
    sourceroot: SOURCE_ROOT,
    silDist: SIL_DIST,
    whoi: WHOI,
    subsSubmission: SUBS_SUBMISSION,
};

export default rootSelectOptions;
