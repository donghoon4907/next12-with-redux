import type { CoreTabOption } from '@interfaces/core';
/**
 * 영업가족 상세 페이지 탭 목록
 */
export const HR_DETAIL_TABS: CoreTabOption[] = [
    { id: 'tabIncome', label: '소득설정', panelId: 'tabpanelIncome' },
    { id: 'tabGuarantee', label: '보증설정', panelId: 'tabpanelGuarantee' },
    { id: 'tabAuthority', label: '권한설정', panelId: 'tabpanelAuthority' },
    {
        id: 'tabAsso',
        label: '협회자격관리',
        panelId: 'tabpanelAsso',
    },
];
/**
 * 장기 계약 상세 페이지 탭 목록
 */
export const LONG_DETAIL_TABS: CoreTabOption[] = [
    { id: 'tabPays', label: '납입실적', panelId: 'tabpanelPays' },
    {
        id: 'tabBuhwal',
        label: '미유지/부활',
        panelId: 'tabpanelBuhwal',
    },
    {
        id: 'tabContact',
        label: '고객상담',
        panelId: 'tabpanelContact',
        isHideMode: 'create',
    },
];
/**
 * 일반 계약 상세 페이지 탭 목록
 */
export const GEN_DETAIL_TABS: CoreTabOption[] = [
    {
        id: 'tabCustomer',
        label: '고객상세및동의현황',
        panelId: 'tabpanelCustomer',
    },
    { id: 'tabPays', label: '납입실적', panelId: 'tabpanelPays' },
    { id: 'tabCalcPerform', label: '정산실적', panelId: 'tabpanelCalcPerform' },
    { id: 'tabContactHis', label: '접촉이력', panelId: 'tabpanelContactHis' },
    { id: 'tabChangeHis', label: '변경내역', panelId: 'tabpanelChangeHis' },
];
/**
 * 자동차 계약 상세 페이지 탭 목록
 */
export const CAR_DETAIL_TABS: CoreTabOption[] = [
    { id: 'tabPays', label: '납입실적', panelId: 'tabpanelPays' },
    {
        id: 'tabCompare',
        label: '차량 / 담보 / 요율',
        panelId: 'tabpanelCompare',
    },
    {
        id: 'tabContact',
        label: '고객상담',
        panelId: 'tabpanelContact',
        isHideMode: 'create',
    },
];
/**
 * 고객 상세 페이지 탭 목록
 */
export const CUSTOMER_DETAIL_TABS: CoreTabOption[] = [
    {
        id: 'tabExcontract',
        label: '타사계약',
        panelId: 'tabpanelExcontract',
    },
    {
        id: 'tabCustcar',
        label: '피담보물/차량',
        panelId: 'tabpanelCustcar',
    },
    { id: 'tabFamily', label: '가족/지인', panelId: 'tabpanelFamily' },
    {
        id: 'tabEvent',
        label: '기념일관리',
        panelId: 'tabpanelEvent',
    },
    {
        id: 'tabContact',
        label: '고객상담',
        panelId: 'tabpanelContact',
        isHideMode: 'create',
    },
];
/**
 * 게시판 등록 페이지 탭 목록
 */
export const BOARD_SETTING_TABS: CoreTabOption[] = [
    { id: 'tabSetBody', label: '본문설정', panelId: 'tabpanelSetBody' },
    { id: 'tabSetFile', label: '파일첨부', panelId: 'tabpanelSetFile' },
    { id: 'tabSetView', label: '보기설정', panelId: 'tabpanelSetView' },
];
/**
 * 사업부 상세 페이지 탭 목록
 */
export const DEPART_DETAIL_TABS: CoreTabOption[] = [
    { id: 'tabCommission', label: '수수료규정', panelId: 'tabpanelCommission' },
    { id: 'tabPayment', label: '지급설정', panelId: 'tabpanelPayment' },
    { id: 'tabMemo', label: '메모', panelId: 'tabpanelMemo' },
    {
        id: 'tabAssociationRegist',
        label: '협회등록정보',
        panelId: 'tabpanelAssociationRegist',
    },
    {
        id: 'tabRentalAsset',
        label: '임대자산',
        panelId: 'tabpanelRentalAsset',
    },
];
/**
 * 사업부 상세 페이지 탭 목록
 */
export const ORGA_DETAIL_TABS: CoreTabOption[] = [
    // { id: 'tabCommission', label: '수수료규정', panelId: 'tabpanelCommission' },
    { id: 'tabAsso', label: '협회자격관리', panelId: 'tabpanelAsso' },
];
