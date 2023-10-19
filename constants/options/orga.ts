import type { CoreSelectOption } from '@interfaces/core';

// 조직등급
const GRADE: CoreSelectOption[] = [
    {
        label: '전체',
        value: '',
        isFixed: false,
    },
    {
        label: '회사',
        value: '1',
        isFixed: false,
    },
    {
        label: '본부',
        value: '2',
        isFixed: false,
    },
    {
        label: '지점',
        value: '3',
        isFixed: false,
    },
    {
        label: '팀',
        value: '4',
        isFixed: false,
    },
];

// 현상태
const STATUS: CoreSelectOption[] = [
    {
        label: '전체',
        value: '',
        isFixed: false,
    },
    {
        label: '운영중',
        value: '운영중',
        isFixed: false,
    },
    {
        label: '폐점',
        value: '폐점',
        isFixed: false,
    },
];

const rootSelectOptions = {
    rate: GRADE,
    status: STATUS,
};

export default rootSelectOptions;