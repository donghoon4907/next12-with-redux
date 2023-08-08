import type { FC } from 'react';
import type { CoreSelectOption } from '@interfaces/core';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MySelect } from '@components/select';
import { CUSTOMER_DETAIL_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import variables from '@styles/_variables.module.scss';
import { MyLayout } from '@components/Layout';
import { MyFooter } from '@components/footer';
import { useSelect } from '@hooks/use-select';
import { MyButton } from '@components/button';
import { showUserHistoryModal } from '@actions/modal/user-history.action';
import { useTab } from '@hooks/use-tab';
import { MyDatepicker } from '@components/datepicker';
import { usePostcode } from '@hooks/use-postcode';
import { ContactHisTabpanel } from '@partials/customer/tabpanels/ContactHis';
import { HoldingContractTabpanel } from '@partials/customer/tabpanels/HoldingContract';
import { OtherContractTabpanel } from '@partials/customer/tabpanels/OtherContract';
import { SecuredDebtTabpanel } from '@partials/customer/tabpanels/SecuredDebt';
import { FamilyTabpanel } from '@partials/customer/tabpanels/Family';
import { AnniversaryTabpanel } from '@partials/customer/tabpanels/Anniversary';
import customerConstants from '@constants/options/customer';
import userConstants from '@constants/options/user';
import { useDatepicker } from '@hooks/use-datepicker';
import { isEmpty } from '@utils/validator/common';
import { CustomerManagerAccordion } from '@components/accordion/CustomerManagerHistory';
import {
    useInput,
    useNumbericInput,
    usePhoneInput,
    useResidentNumberInput,
} from '@hooks/use-input';
import { UserHistoryModal } from '@components/modal/UserHistory';

interface Props {
    /**
     * 모드: true(수정) / false(등록)
     */
    mode: 'create' | 'update';
    /**
     * 고객명 기본 값
     */
    defaultName?: string;
    /**
     * 고객구분 기본 값
     */
    defaultCusttype?: CoreSelectOption;
    /**
     * 주민번호 기본 값
     */
    defaultIdnum1?: string;
    /**
     * 사업자등록번호 기본 값
     */
    defaultComRegNum?: string;
    /**
     * 나이 기본 값
     */
    defaultAge?: string;
    defaultAgeType?: CoreSelectOption;
    /**
     * 생년월일 기본 값
     */
    defaultBirthday?: string;
    defaultBtype?: boolean;
    /**
     * 법인설립일 기본 값
     */
    defaultIdate?: string;
    /**
     * 상령일 기본 값
     */
    defaultSday?: string;
    /**
     * 핸드폰 기본 값
     */
    defaultMobile?: string;
    defaultMobileCom?: CoreSelectOption;
    /**
     * 대표전화 기본 값
     */
    defaultPhone?: string;
    /**
     * 이메일 기본 값
     */
    defaultEmail?: string;
    defaultEmailCom?: CoreSelectOption;
    /**
     * 홈페이지 기본 값
     */
    defaultHomepage?: string;
    /**
     * 우편번호 기본 값
     */
    defaultPostCode?: string;
    defaultAddress1?: string;
    defaultAddress2?: string;
    defaultAddress3?: string;
    /**
     * 유입경로 기본 값
     */
    defaultInflowPath?: CoreSelectOption;
    /**
     * 고객등급 기본 값
     */
    defaultGrade?: CoreSelectOption;
    /**
     * 개인정보활용동의 기본 값
     */
    defaultPia?: CoreSelectOption;
    /**
     * 동의일시 기본 값
     */
    defaultAday?: string;
    /**
     * 고객생성일시 기본 값
     */
    defaultCreateDay?: string;
    /**
     * 회사명 기본 값
     */
    defaultCompany?: string;
    /**
     * 부서/직함 기본 값
     */
    defaultTitle?: string;
    /**
     * 회사 전화번호 기본 값
     */
    defaultComPhone?: string;
    /**
     * 팩스 기본 값
     */
    defaultCfax?: string;
    /**
     * 회사 우편번호 기본 값
     */
    defaultCpostcode?: string;
    defaultCaddress1?: string;
    defaultCaddress2?: string;
    defaultCaddress3?: string;
}

export const CustomerForm: FC<Props> = ({
    mode,
    defaultName = '',
    defaultCusttype = customerConstants.division[0],
    defaultIdnum1 = '',
    defaultComRegNum = '',
    defaultAge = '',
    defaultAgeType = customerConstants.age[0],
    defaultBirthday = null,
    defaultBtype = true,
    defaultIdate = null,
    defaultSday = null,
    defaultMobile = '',
    defaultMobileCom = userConstants.mobileCom[0],
    defaultPhone = '',
    defaultEmail = '',
    defaultEmailCom = userConstants.emailCom[0],
    defaultHomepage = '',
    defaultPostCode = '',
    defaultAddress1 = '',
    defaultAddress2 = '',
    defaultAddress3 = '',
    defaultInflowPath = customerConstants.inflowPath[0],
    defaultGrade = customerConstants.grade[0],
    defaultPia = customerConstants.pia[0],
    defaultAday = null,
    defaultCreateDay = null,
    defaultCompany = '',
    defaultTitle = '',
    defaultComPhone = '',
    defaultCfax = '',
    defaultCpostcode = '',
    defaultCaddress1 = '',
    defaultCaddress2 = '',
    defaultCaddress3 = '',
}) => {
    const displayName = 'wr-pages-customer-detail';

    const dispatch = useDispatch();

    const { loggedInUser } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    // const createUser = useApi(createUserRequest);
    // 탭 관리
    const [tab, setTab] = useTab(CUSTOMER_DETAIL_TABS[0]);
    // 수정 모드 여부
    const [editable, setEditable] = useState(mode === 'create' ? true : false);
    // 고객명
    const [name] = useInput(defaultName, { noSpace: true });
    // 고객구분
    const [custtype] = useSelect(customerConstants.division, defaultCusttype);
    // 주민번호
    const [idnum1] = useResidentNumberInput(defaultIdnum1);
    // 사업자등록번호
    const [comRegNum] = useNumbericInput(defaultComRegNum);
    // 나이
    const [age] = useNumbericInput(defaultAge);
    const [ageType] = useSelect(customerConstants.age, defaultAgeType);
    // 생년월일
    const [birthday] = useDatepicker(
        defaultBirthday ? new Date(defaultBirthday) : null,
    );
    const [bType, setBtype] = useState(defaultBtype);
    // 법인설립일
    const [iDate] = useDatepicker(defaultIdate ? new Date(defaultIdate) : null);
    // 상령일
    const [sDay] = useDatepicker(defaultSday ? new Date(defaultSday) : null);
    // 핸드폰
    const [mobile] = usePhoneInput(defaultMobile);
    const [mobileCom] = useSelect(userConstants.mobileCom, defaultMobileCom);
    // 대표전화
    const [phone] = usePhoneInput(defaultPhone);
    // 이메일
    const [email] = useInput(defaultEmail, { noSpace: true });
    const [emailCom] = useSelect(userConstants.emailCom, defaultEmailCom);
    // 홈페이지
    const [homepage] = useInput(defaultHomepage, { noSpace: true });
    // 우편번호
    const [postcode, address1, address2, onClickPostcode] = usePostcode(
        {
            postcode: defaultPostCode,
            address1: defaultAddress1,
            address2: defaultAddress2,
        },
        { disabled: !editable },
    );
    // 상세 주소
    const [address3] = useInput(defaultAddress3);
    // 유입경로
    const [inflowPath] = useSelect(
        customerConstants.inflowPath,
        defaultInflowPath,
    );
    // 고객등급
    const [grade] = useSelect(customerConstants.grade, defaultGrade);
    // 개인정보활용동의
    const [pia] = useSelect(customerConstants.pia, defaultPia);
    // 동의일시
    const [aDay] = useDatepicker(defaultAday ? new Date(defaultAday) : null);
    // 고객생성일시
    const [createDay] = useDatepicker(
        defaultCreateDay ? new Date(defaultCreateDay) : null,
    );
    // 회사명
    const [company] = useInput(defaultCompany);
    // 부서/직함
    const [title] = useInput(defaultTitle);
    // 회사 전화번호
    const [comPhone] = usePhoneInput(defaultComPhone);
    // 팩스
    const [cFax] = usePhoneInput(defaultCfax);
    // 회사 우편번호
    const [cPostcode, cAddress1, cAddress2, onClickCPostcode] = usePostcode(
        {
            postcode: defaultCpostcode,
            address1: defaultCaddress1,
            address2: defaultCaddress2,
        },
        { disabled: !editable },
    );
    // 회사 상세 주소
    const [cAddress3] = useInput(defaultCaddress3);
    const labelType = editable ? 'active' : 'disable';
    // 개인 여부
    const isIndividual = custtype.value?.value === '개인';
    // 법인 여부
    const isCorporation = custtype.value?.value === '법인';

    const handleClickChangeHistory = () => {
        dispatch(showUserHistoryModal());
    };

    // 취소 버튼 클릭 핸들러
    const handleClickCancel = () => {
        const tf = confirm('수정을 취소하시겠습니까?');

        if (tf) {
            setEditable(false);
        }
    };

    const handleClickModify = () => {
        setEditable(true);
    };

    const handleCreate = () => {
        const payload = createPayload();

        // const createUserDto = new CreateUserDTO(payload);

        // if (createUserDto.requiredValidate()) {
        //     createUser(createUserDto.getPayload(), ({ userid }) => {
        //         if (userid) {
        //             // 프로필 사진을 설정한 경우
        //             if (lastSetPortraitImageFile) {
        //                 const formData = new FormData();

        //                 formData.append('file', lastSetPortraitImageFile);

        //                 upload(
        //                     {
        //                         userid,
        //                         formData,
        //                     },
        //                     () => {
        //                         alert('사용자가 등록되었습니다.');
        //                     },
        //                 );
        //             } else {
        //                 alert('사용자가 등록되었습니다.');
        //             }
        //         }
        //     });
        // }
    };

    const handleUpdate = () => {
        const payload = createPayload();

        // const updateUserDto = new UpdateUserDTO(payload);

        // if (updateUserDto.requiredValidate()) {
        //     updateUser(updateUserDto.getPayload(), ({ Message }) => {
        //         if (Message === 'Success') {
        //             // 프로필 사진을 설정한 경우
        //             if (lastSetPortraitImageFile) {
        //                 const formData = new FormData();

        //                 formData.append('file', lastSetPortraitImageFile);

        //                 upload(
        //                     {
        //                         userid,
        //                         formData,
        //                     },
        //                     () => {
        //                         alert('수정되었습니다.');
        //                     },
        //                 );
        //             } else {
        //                 alert('수정되었습니다.');
        //             }
        //         }
        //     });
        // }
    };

    const createPayload = () => {
        const payload: any = {
            custtype: custtype.value?.value,
            idnum1: idnum1.value.replace(/-/g, ''),
        };

        if (!isEmpty(name.value)) {
            payload['name'] = name.value;
        }

        if (!isEmpty(birthday.value)) {
            payload['birthday'] = birthday.value;
        }

        if (typeof bType === 'boolean') {
            payload['b_type'] = bType;
        }

        if (isIndividual) {
        }

        return payload;
    };

    return (
        <>
            <MyLayout>
                <div className={`${displayName} row`}>
                    <div className="col-5">
                        <div
                            className={`${displayName}__left wr-frame__section`}
                        >
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <CustomerManagerAccordion
                                        defaultTitle={`${loggedInUser.user_info.fulls} ${loggedInUser.user_info.name}`}
                                        data={[]}
                                    />
                                </div>
                            </div>
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <div className="row">
                                        <div className="col-6">
                                            <WithLabel
                                                id="name"
                                                label="고객명"
                                                type={labelType}
                                            >
                                                <MyInput
                                                    type="text"
                                                    id="name"
                                                    placeholder="고객명"
                                                    disabled={!editable}
                                                    {...name}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    id="custtype"
                                                    label="고객구분"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="custtype"
                                                        placeholder="선택"
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        {...custtype}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col-6">
                                            {isIndividual && (
                                                <WithLabel
                                                    id="idnum1"
                                                    label="주민번호"
                                                    type={labelType}
                                                    // isRequired={editable}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="idnum1"
                                                        placeholder="주민번호"
                                                        disabled={!editable}
                                                        {...idnum1}
                                                    />
                                                </WithLabel>
                                            )}
                                            {isCorporation && (
                                                <WithLabel
                                                    id="comRegNum"
                                                    label="사업자등록번호"
                                                    type={labelType}
                                                    isRequired={editable}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="comRegNum"
                                                        placeholder="사업자등록번호"
                                                        disabled={!editable}
                                                        {...comRegNum}
                                                    />
                                                </WithLabel>
                                            )}
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                {isIndividual && (
                                                    <WithLabel
                                                        id="birthday"
                                                        label="생년월일"
                                                        type={labelType}
                                                    >
                                                        <MyDatepicker
                                                            id="birthday"
                                                            size="md"
                                                            placeholder="생년월일"
                                                            disabled={!editable}
                                                            hooks={birthday}
                                                        />
                                                        <div
                                                            style={{
                                                                width: 70,
                                                            }}
                                                        >
                                                            <MyButton
                                                                className={
                                                                    bType
                                                                        ? 'btn-primary'
                                                                        : 'btn-secondary'
                                                                }
                                                                onClick={() =>
                                                                    setBtype(
                                                                        !bType,
                                                                    )
                                                                }
                                                            >
                                                                {bType
                                                                    ? '양력'
                                                                    : '음력'}
                                                            </MyButton>
                                                            {/* <MySelect
                                                                placeholder={
                                                                    '선택'
                                                                }
                                                                placeHolderFontSize={
                                                                    16
                                                                }
                                                                height={
                                                                    variables.detailFilterHeight
                                                                }
                                                                placement="right"
                                                                isDisabled={
                                                                    !editable
                                                                }
                                                                {...bType}
                                                            /> */}
                                                        </div>
                                                    </WithLabel>
                                                )}
                                                {isCorporation && (
                                                    <WithLabel
                                                        id="iDate"
                                                        label="법인설립일"
                                                        type={labelType}
                                                    >
                                                        <MyDatepicker
                                                            id="iDate"
                                                            size="md"
                                                            placeholder="법인설립일"
                                                            disabled={!editable}
                                                            hooks={iDate}
                                                        />
                                                    </WithLabel>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {isIndividual && (
                                        <div className="row wr-mt">
                                            <div className="col-6">
                                                <WithLabel
                                                    id="age"
                                                    label="나이"
                                                    type={labelType}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="age"
                                                        placeholder="나이"
                                                        disabled={!editable}
                                                        {...age}
                                                    />
                                                    <div style={{ width: 230 }}>
                                                        <MySelect
                                                            placeholder="선택"
                                                            placeHolderFontSize={
                                                                16
                                                            }
                                                            height={
                                                                variables.detailFilterHeight
                                                            }
                                                            placement="right"
                                                            isDisabled={
                                                                !editable
                                                            }
                                                            {...ageType}
                                                        />
                                                    </div>
                                                </WithLabel>
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <WithLabel
                                                        id="sDay"
                                                        label="상령일"
                                                        type={labelType}
                                                    >
                                                        <MyDatepicker
                                                            id="sDay"
                                                            size="md"
                                                            placeholder="상령일"
                                                            disabled={!editable}
                                                            hooks={sDay}
                                                        />
                                                    </WithLabel>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <div className="row">
                                        <div className="col-6">
                                            {isIndividual && (
                                                <WithLabel
                                                    id="mobile"
                                                    label="핸드폰"
                                                    type={labelType}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="mobile"
                                                        placeholder="핸드폰"
                                                        disabled={!editable}
                                                        {...mobile}
                                                    />
                                                    <div style={{ width: 230 }}>
                                                        <MySelect
                                                            placeholder={'선택'}
                                                            placeHolderFontSize={
                                                                16
                                                            }
                                                            height={
                                                                variables.detailFilterHeight
                                                            }
                                                            placement="right"
                                                            isDisabled={
                                                                !editable
                                                            }
                                                            {...mobileCom}
                                                        />
                                                    </div>
                                                </WithLabel>
                                            )}
                                            {isCorporation && (
                                                <WithLabel
                                                    id="phone"
                                                    label="대표전화"
                                                    type={labelType}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="phone"
                                                        placeholder="대표전화"
                                                        disabled={!editable}
                                                        {...phone}
                                                    />
                                                </WithLabel>
                                            )}
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                {isIndividual && (
                                                    <WithLabel
                                                        id="email"
                                                        label="이메일"
                                                        type={labelType}
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            id="email"
                                                            placeholder="이메일"
                                                            disabled={!editable}
                                                            {...email}
                                                        />
                                                        <div
                                                            style={{
                                                                width: 350,
                                                            }}
                                                        >
                                                            <MySelect
                                                                placeholder={
                                                                    '선택'
                                                                }
                                                                placeHolderFontSize={
                                                                    16
                                                                }
                                                                height={
                                                                    variables.detailFilterHeight
                                                                }
                                                                isDisabled={
                                                                    !editable
                                                                }
                                                                placement="right"
                                                                {...emailCom}
                                                            />
                                                        </div>
                                                    </WithLabel>
                                                )}
                                                {isCorporation && (
                                                    <WithLabel
                                                        id="homepage"
                                                        label="홈페이지"
                                                        type={labelType}
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            id="homepage"
                                                            placeholder="홈페이지"
                                                            disabled={!editable}
                                                            {...homepage}
                                                        />
                                                    </WithLabel>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {isIndividual && (
                                        <>
                                            <div className="row wr-mt">
                                                <div className="col-6">
                                                    <WithLabel
                                                        label="주소"
                                                        type={labelType}
                                                    >
                                                        <div className="wr-pages-detail__with">
                                                            <MyInput
                                                                type="text"
                                                                placeholder="우편번호"
                                                                disabled
                                                                onClick={
                                                                    onClickPostcode
                                                                }
                                                                {...postcode}
                                                                button={{
                                                                    type: 'button',
                                                                    disabled:
                                                                        !editable,
                                                                    onClick:
                                                                        onClickPostcode,
                                                                    children: (
                                                                        <>
                                                                            <span>
                                                                                찾기
                                                                            </span>
                                                                        </>
                                                                    ),
                                                                }}
                                                            />
                                                        </div>
                                                    </WithLabel>
                                                </div>
                                                <div className="col-6">
                                                    <div className="wr-ml">
                                                        <MyInput
                                                            type="text"
                                                            placeholder="주소1"
                                                            disabled
                                                            {...address1}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row wr-mt">
                                                <div className="col-6">
                                                    <WithLabel
                                                        id="addr3"
                                                        label="상세주소"
                                                        type={labelType}
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            id="addr3"
                                                            placeholder="상세주소"
                                                            disabled={!editable}
                                                            {...address3}
                                                        />
                                                    </WithLabel>
                                                </div>
                                                <div className="col-6">
                                                    <div className="wr-ml">
                                                        <MyInput
                                                            type="text"
                                                            placeholder="주소2"
                                                            disabled
                                                            {...address2}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="wr-pages-detail__block">
                                <div className="wr-pages-detail__content">
                                    <div className="row">
                                        <div className="col-6">
                                            <WithLabel
                                                id="inflowPath"
                                                label="유입경로"
                                                type={labelType}
                                            >
                                                <MySelect
                                                    inputId="inflowPath"
                                                    placeholder="유입경로"
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                    {...inflowPath}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    id="grade"
                                                    label="고객등급"
                                                    type={labelType}
                                                >
                                                    <MySelect
                                                        inputId="grade"
                                                        placeholder="고객등급"
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                        {...grade}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col-6">
                                            <WithLabel
                                                id="pia"
                                                label="개인정보동의"
                                                type={labelType}
                                            >
                                                <MySelect
                                                    inputId="pia"
                                                    placeholder="개인정보동의"
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                    {...pia}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    id="aDay"
                                                    label="동의일시"
                                                    type={labelType}
                                                >
                                                    <MyDatepicker
                                                        id="aDay"
                                                        size="md"
                                                        placeholder="동의일시"
                                                        format="YYYY-MM-DD HH:mm"
                                                        disabled={!editable}
                                                        hooks={aDay}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row wr-mt">
                                        <div className="col-6">
                                            <WithLabel
                                                id="createDay"
                                                label="고객생성일시"
                                                type={labelType}
                                            >
                                                <MyDatepicker
                                                    id="createDay"
                                                    size="md"
                                                    placeholder="고객생성일시"
                                                    format="YYYY-MM-DD HH:mm"
                                                    disabled={!editable}
                                                    hooks={createDay}
                                                />
                                            </WithLabel>
                                        </div>
                                        <div className="col-6">
                                            <div className="wr-ml">
                                                <WithLabel
                                                    id="job"
                                                    label="직업"
                                                    type={labelType}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="job"
                                                        placeholder="직업"
                                                        disabled={!editable}
                                                    />
                                                </WithLabel>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isIndividual && (
                                <div className="wr-pages-detail__block">
                                    <div className="wr-pages-detail__title">
                                        <strong>직장</strong>
                                    </div>
                                    <div className="wr-pages-detail__content">
                                        <div className="row">
                                            <div className="col-6">
                                                <WithLabel
                                                    id="company"
                                                    label="회사명"
                                                    type={labelType}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="company"
                                                        placeholder="회사명"
                                                        disabled={!editable}
                                                        {...company}
                                                    />
                                                </WithLabel>
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <WithLabel
                                                        id="title"
                                                        label="부서/직함"
                                                        type={labelType}
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            id="title"
                                                            placeholder="부서/직함"
                                                            disabled={!editable}
                                                            {...title}
                                                        />
                                                    </WithLabel>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row wr-mt">
                                            <div className="col-6">
                                                <WithLabel
                                                    id="comPhone"
                                                    label="전화번호"
                                                    type={labelType}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="cPhone"
                                                        placeholder="전화번호"
                                                        disabled={!editable}
                                                        {...comPhone}
                                                    />
                                                </WithLabel>
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <WithLabel
                                                        id="cFax"
                                                        label="팩스"
                                                        type={labelType}
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            id="cFax"
                                                            placeholder="팩스"
                                                            disabled={!editable}
                                                            {...cFax}
                                                        />
                                                    </WithLabel>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row wr-mt">
                                            <div className="col-6">
                                                <WithLabel
                                                    label="회사주소"
                                                    type={labelType}
                                                >
                                                    <div className="wr-pages-detail__with">
                                                        <MyInput
                                                            type="text"
                                                            placeholder="우편번호"
                                                            disabled
                                                            onClick={
                                                                onClickCPostcode
                                                            }
                                                            {...cPostcode}
                                                            button={{
                                                                type: 'button',
                                                                disabled:
                                                                    !editable,
                                                                onClick:
                                                                    onClickCPostcode,
                                                                children: (
                                                                    <>
                                                                        <span>
                                                                            찾기
                                                                        </span>
                                                                    </>
                                                                ),
                                                            }}
                                                        />
                                                    </div>
                                                </WithLabel>
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <MyInput
                                                        type="text"
                                                        placeholder="주소1"
                                                        disabled
                                                        {...cAddress1}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row wr-mt">
                                            <div className="col-6">
                                                <WithLabel
                                                    id="cAddr3"
                                                    label="상세주소"
                                                    type={labelType}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="cAddr3"
                                                        placeholder="상세주소"
                                                        disabled={!editable}
                                                        {...cAddress3}
                                                    />
                                                </WithLabel>
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <MyInput
                                                        type="text"
                                                        placeholder="주소2"
                                                        disabled
                                                        {...cAddress2}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {isCorporation && (
                                <div className="wr-pages-detail__block">
                                    <div className="wr-pages-detail__title">
                                        <strong>담당자</strong>
                                    </div>
                                    <div className="wr-pages-detail__content">
                                        <div className="row">
                                            <div className="col-6">
                                                <WithLabel
                                                    id="mName"
                                                    label="담당자명"
                                                    type={labelType}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="mName"
                                                        placeholder="담당자명"
                                                        disabled={!editable}
                                                        // {...company}
                                                    />
                                                </WithLabel>
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <WithLabel
                                                        id="mTitle"
                                                        label="부서/직함"
                                                        type={labelType}
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            id="mTitle"
                                                            placeholder="부서/직함"
                                                            disabled={!editable}
                                                            // {...title}
                                                        />
                                                    </WithLabel>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row wr-mt">
                                            <div className="col-6">
                                                <WithLabel
                                                    id="comPhone"
                                                    label="전화번호"
                                                    type={labelType}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="cPhone"
                                                        placeholder="전화번호"
                                                        disabled={!editable}
                                                        // {...comPhone}
                                                    />
                                                </WithLabel>
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <WithLabel
                                                        id="mEmail"
                                                        label="이메일"
                                                        type={labelType}
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            id="mEmail"
                                                            placeholder="이메일"
                                                            disabled={!editable}
                                                            // {...email}
                                                        />
                                                        <div
                                                            style={{
                                                                width: 350,
                                                            }}
                                                        >
                                                            <MySelect
                                                                placeholder={
                                                                    '선택'
                                                                }
                                                                placeHolderFontSize={
                                                                    16
                                                                }
                                                                height={
                                                                    variables.detailFilterHeight
                                                                }
                                                                isDisabled={
                                                                    !editable
                                                                }
                                                                placement="right"
                                                                // {...emailCom}
                                                            />
                                                        </div>
                                                    </WithLabel>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-7">
                        <div className={`${displayName}__right`}>
                            <ul className="wr-tab__wrap" role="tablist">
                                {CUSTOMER_DETAIL_TABS.map((v) => (
                                    <MyTab
                                        key={v.id}
                                        onClick={setTab}
                                        isActive={v.id === tab.id}
                                        {...v}
                                    />
                                ))}
                                <li className="wr-tab__line"></li>
                            </ul>
                            <div
                                className={`${displayName}__body wr-frame__tabbody`}
                            >
                                <ContactHisTabpanel
                                    id="tabpanelContactHis"
                                    tabId="tabContactHis"
                                    hidden={tab.id !== 'tabContactHis'}
                                    editable={editable}
                                />
                                <HoldingContractTabpanel
                                    id="tabpanelHoldingContract"
                                    tabId="tabHoldingContract"
                                    hidden={tab.id !== 'tabHoldingContract'}
                                    editable={editable}
                                />
                                <OtherContractTabpanel
                                    id="tabpanelOtherContract"
                                    tabId="tabOtherContract"
                                    hidden={tab.id !== 'tabOtherContract'}
                                    editable={editable}
                                />
                                <SecuredDebtTabpanel
                                    id="tabpanelSecuredDebt"
                                    tabId="tabSecuredDebt"
                                    hidden={tab.id !== 'tabSecuredDebt'}
                                    editable={editable}
                                />
                                <FamilyTabpanel
                                    id="tabpanelFamily"
                                    tabId="tabFamily"
                                    hidden={tab.id !== 'tabFamily'}
                                    editable={editable}
                                />
                                <AnniversaryTabpanel
                                    id="tabpanelAnniversary"
                                    tabId="tabAnniversary"
                                    hidden={tab.id !== 'tabAnniversary'}
                                    editable={editable}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <MyFooter>
                    <div className="wr-footer__between">
                        <div>
                            <MyButton className="btn-warning">
                                다른 담당자 내용
                            </MyButton>
                        </div>
                        <div className="wr-pages-detail__buttons">
                            {editable && (
                                <MyButton
                                    className="btn-secondary"
                                    onClick={handleClickCancel}
                                >
                                    취소
                                </MyButton>
                            )}
                            {mode === 'create' && (
                                <MyButton
                                    type="button"
                                    className="btn-primary"
                                    onClick={handleCreate}
                                >
                                    등록
                                </MyButton>
                            )}
                            {mode === 'update' && (
                                <MyButton
                                    type="button"
                                    className="btn-primary"
                                    onClick={
                                        editable
                                            ? handleUpdate
                                            : handleClickModify
                                    }
                                >
                                    {editable ? '변경 사항 적용' : '수정'}
                                </MyButton>
                            )}
                        </div>
                    </div>
                </MyFooter>
            </MyLayout>

            <UserHistoryModal />
            {/* <CreateEtcModal /> */}
        </>
    );
};