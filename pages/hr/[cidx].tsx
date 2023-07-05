import type { NextPage } from 'next';
import type { CoreSelectOption, CoreTabOption } from '@interfaces/core';
import Head from 'next/head';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import { wrapper } from '@store/redux';
import { MySelect } from '@components/select';
import { DETAIL_PAGE_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { IncomeSettings } from '@partials/detail/tabpanels/IncomeSettings';
import { GuaranteeSettings } from '@partials/detail/tabpanels/GuaranteeSettings';
import { AuthoritySettings } from '@partials/detail/tabpanels/AuthoritySettings';
import { QualSettings } from '@partials/detail/tabpanels/QualSettings';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import variables from '@styles/_variables.module.scss';
// 임시
import {
    getBasicPaymentsRequest,
    getBasicPaymentsSuccess,
} from '@actions/long/get-basic-payments.action';
import {
    getOverridesRequest,
    getOverridesSuccess,
} from '@actions/long/get-overrides.action';
import { MyLayout } from '@components/Layout';
import { useInput } from '@hooks/use-input';
import {
    BIRTH_TYPE,
    EMAIL_COM,
    EMP_STATUS,
    MOBILE_COM,
    USER_TYPE,
} from '@constants/selectOption';
import { MyFooter } from '@components/footer';
// import { AccessibleText } from '@components/AccessibleText';

const CreateUser: NextPage = () => {
    const dispatch = useDispatch();

    const [tab, setTab] = useState<CoreTabOption>(DETAIL_PAGE_TABS[0]);

    const [editable, setEditable] = useState(false);

    const name = useInput('홍길동');

    const title = useInput('실장');
    // 주민번호
    const idnum1 = useInput('900512-2183512');

    const birthday = useInput('1990-05-12');
    // 양력 or 음력
    const [birthType, setBirthType] = useState<CoreSelectOption | null>(
        BIRTH_TYPE[0],
    );

    const mobile = useInput('010-1234-5678');

    const [mobileCom, setMobileCom] = useState<CoreSelectOption | null>(
        MOBILE_COM[0],
    );

    const telphone = useInput('070-4881-6052');

    const telDirect = useInput('6052');

    const email = useInput('tester');

    const [emailCom, setEmailCom] = useState<CoreSelectOption | null>(
        EMAIL_COM[0],
    );

    const postcode = useInput('08195');

    const address1 = useInput('경기도 안양시 동안구 시민대로 383');

    const address2 = useInput('(관양동, 디지털엠파이어빌딩)');

    const address3 = useInput('B동 1102호');

    const [userType, setUserType] = useState<CoreSelectOption | null>(
        USER_TYPE[0],
    );

    const [status, setStatus] = useState<CoreSelectOption | null>(
        EMP_STATUS[0],
    );

    const [d, setD] = useState<[Date, Date] | null>([
        new Date('2022-02-01'),
        new Date('2022-03-01'),
    ]);

    const [org, setOrg] = useState<CoreSelectOption | null>(null);

    const handleClickTab = (tab: CoreTabOption) => {
        setTab(tab);
    };

    const handleChangeBirthType = (birthType: CoreSelectOption | null) => {
        setBirthType(birthType);
    };

    const handleChangeMobileCom = (mobileCom: CoreSelectOption | null) => {
        setMobileCom(mobileCom);
    };

    const handleChangeEmailCom = (emailCom: CoreSelectOption | null) => {
        setEmailCom(emailCom);
    };

    const handleChangeUserType = (emailCom: CoreSelectOption | null) => {
        setUserType(emailCom);
    };

    const handleChangeStatus = (userType: CoreSelectOption | null) => {
        setStatus(userType);
    };

    const handleChangeDate = (value: [Date, Date] | null) => {
        setD(value);
    };

    const commonLabelType = editable ? 'active' : 'disable';

    return (
        <>
            <Head>
                <title>상세페이지</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <MyLayout>
                <div className="wr-pages-detail wr-form row">
                    <div className="col-4">
                        <div className="wr-pages-detail__left wr-frame__section">
                            <div className="wr-pages-detail__block">
                                <div className="wr-group">
                                    <span className="wr-pages-detail__department">
                                        직할 영업 &#62; 5회사임직원 &#62;
                                        전산개발실
                                    </span>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        type="button"
                                    >
                                        부서변경
                                    </button>
                                </div>
                            </div>
                            <div className="wr-pages-detail__block">
                                <div className="row">
                                    <div className="col-8">
                                        <WithLabel
                                            id="idnum1"
                                            label="사원번호"
                                            type="disable"
                                        >
                                            <MyInput
                                                type="text"
                                                id="idnum1"
                                                placeholder="사원번호"
                                                value="W1055"
                                                readOnly
                                            />
                                        </WithLabel>
                                        <WithLabel
                                            id="name"
                                            label="고객명"
                                            type={commonLabelType}
                                        >
                                            <MyInput
                                                type="text"
                                                id="name"
                                                placeholder="고객명"
                                                readOnly={!editable}
                                                {...name}
                                            />
                                        </WithLabel>
                                        <WithLabel
                                            id="title"
                                            label="직함"
                                            type={commonLabelType}
                                        >
                                            <MyInput
                                                type="text"
                                                id="title"
                                                placeholder="직함"
                                                readOnly={!editable}
                                                {...title}
                                            />
                                        </WithLabel>
                                        <WithLabel
                                            id="sNum"
                                            label="주민번호"
                                            type={commonLabelType}
                                        >
                                            <MyInput
                                                type="text"
                                                id="sNum"
                                                placeholder="주민번호"
                                                readOnly={!editable}
                                                {...idnum1}
                                                // button={{
                                                //     type: 'button',
                                                //     children: (
                                                //         <>
                                                //             <span>보기</span>
                                                //         </>
                                                //     ),
                                                // }}
                                            />
                                        </WithLabel>
                                        <WithLabel
                                            id="birthday"
                                            label="생년월일"
                                            type={commonLabelType}
                                        >
                                            <div className="wr-pages-detail__with">
                                                <MyInput
                                                    type="text"
                                                    id="birthday"
                                                    placeholder="생년월일"
                                                    readOnly={!editable}
                                                    {...birthday}
                                                />
                                                <MySelect
                                                    options={BIRTH_TYPE}
                                                    value={birthType}
                                                    onChange={
                                                        handleChangeBirthType
                                                    }
                                                    placeholder={'선택'}
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                />
                                            </div>
                                        </WithLabel>
                                        <WithLabel
                                            id="mobile"
                                            label="핸드폰"
                                            type={commonLabelType}
                                        >
                                            <div className="wr-pages-detail__with">
                                                <MyInput
                                                    type="text"
                                                    id="mobile"
                                                    placeholder="핸드폰"
                                                    readOnly={!editable}
                                                    {...mobile}
                                                />
                                                <MySelect
                                                    options={MOBILE_COM}
                                                    value={mobileCom}
                                                    onChange={
                                                        handleChangeMobileCom
                                                    }
                                                    placeholder={'선택'}
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                />
                                            </div>
                                        </WithLabel>
                                        <WithLabel
                                            id="telephone"
                                            label="내선번호"
                                            type={commonLabelType}
                                        >
                                            <div className="wr-pages-detail__with">
                                                <MyInput
                                                    type="text"
                                                    id="telephone"
                                                    placeholder="내선번호"
                                                    readOnly={!editable}
                                                    {...telphone}
                                                />
                                                <MyInput
                                                    type="text"
                                                    placeholder="직통번호"
                                                    readOnly={!editable}
                                                    {...telDirect}
                                                />
                                            </div>
                                        </WithLabel>
                                    </div>
                                    <div className="col-4">
                                        <div className="wr-ml">
                                            <div className="wr-pages-detail__avatar">
                                                <img
                                                    src="http://via.placeholder.com/200x255"
                                                    className="img-thumbnail"
                                                    alt="..."
                                                />
                                            </div>
                                            <WithLabel
                                                id="user_type"
                                                label="영업가족"
                                                type={commonLabelType}
                                            >
                                                <MySelect
                                                    inputId="user_type"
                                                    options={USER_TYPE}
                                                    value={userType}
                                                    onChange={
                                                        handleChangeUserType
                                                    }
                                                    placeholder={'선택'}
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                />
                                            </WithLabel>
                                            <WithLabel
                                                id="status"
                                                label="재직현황"
                                                type={commonLabelType}
                                            >
                                                <MySelect
                                                    inputId="status"
                                                    options={EMP_STATUS}
                                                    value={status}
                                                    onChange={
                                                        handleChangeStatus
                                                    }
                                                    placeholder={'선택'}
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wr-pages-detail__block">
                                <div className="row">
                                    <div className="col">
                                        <div className="row">
                                            <div className="col-6">
                                                <WithLabel
                                                    id="email"
                                                    label="이메일"
                                                    type={commonLabelType}
                                                >
                                                    <MyInput
                                                        type="email"
                                                        id="email"
                                                        placeholder="이메일"
                                                        {...email}
                                                    />
                                                </WithLabel>
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <MySelect
                                                        options={EMAIL_COM}
                                                        value={emailCom}
                                                        onChange={
                                                            handleChangeEmailCom
                                                        }
                                                        placeholder={'선택'}
                                                        placeHolderFontSize={16}
                                                        height={
                                                            variables.detailFilterHeight
                                                        }
                                                        isDisabled={!editable}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row wr-mt wr-mb">
                                            <div className="col-6">
                                                <WithLabel
                                                    id="postcode"
                                                    label="주소"
                                                    type={commonLabelType}
                                                >
                                                    <div className="wr-pages-detail__with">
                                                        <MyInput
                                                            type="text"
                                                            id="postcode"
                                                            placeholder="우편번호"
                                                            readOnly
                                                            {...postcode}
                                                            // button={{
                                                            //     type: 'button',
                                                            //     children: (
                                                            //         <>
                                                            //             <span>
                                                            //                 찾기
                                                            //             </span>
                                                            //         </>
                                                            //     ),
                                                            // }}
                                                        />
                                                    </div>
                                                </WithLabel>
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <MyInput
                                                        type="email"
                                                        placeholder=""
                                                        readOnly
                                                        {...address1}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row wr-mt">
                                            <div className="col-6">
                                                <WithLabel
                                                    id="addr2"
                                                    label="상세주소"
                                                    type={commonLabelType}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="addr2"
                                                        placeholder="상세주소"
                                                        readOnly
                                                        {...address3}
                                                    />
                                                </WithLabel>
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <MyInput
                                                        type="text"
                                                        placeholder=""
                                                        readOnly
                                                        {...address2}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row wr-mt">
                                            <div className="col-6">
                                                <WithLabel
                                                    id="eDate"
                                                    label="입사일"
                                                    type="active"
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="eDate"
                                                        placeholder="2023-02-11"
                                                    />
                                                </WithLabel>
                                            </div>
                                            <div className="col-6">
                                                <div className="wr-ml">
                                                    <WithLabel
                                                        id="dDate"
                                                        label="퇴사일"
                                                        type="active"
                                                    >
                                                        <MyInput
                                                            type="text"
                                                            id="dDate"
                                                            placeholder="2023-02-11"
                                                        />
                                                    </WithLabel>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <WithLabel
                                            id="attractor"
                                            label="유치자"
                                            type="active"
                                        >
                                            <MyInput
                                                type="text"
                                                id="attractor"
                                                placeholder="홍길순 (W0010)"
                                                readOnly
                                                button={{
                                                    type: 'button',
                                                    children: (
                                                        <>
                                                            <span>찾기</span>
                                                        </>
                                                    ),
                                                }}
                                            />
                                        </WithLabel> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="wr-pages-detail__right">
                            <div className="wr-pages-detail__lock"></div>
                            <ul className="wr-tab__wrap" role="tablist">
                                {DETAIL_PAGE_TABS.map((v) => (
                                    <MyTab
                                        key={v.id}
                                        onClick={handleClickTab}
                                        isActive={v.id === tab.id}
                                        {...v}
                                    />
                                ))}
                                <li className="wr-tab__line"></li>
                            </ul>
                            <div className="wr-pages-detail__body wr-frame__tabbody">
                                <IncomeSettings
                                    hidden={tab.id !== 'tabIncome'}
                                    {...tab}
                                />
                                <GuaranteeSettings
                                    hidden={tab.id !== 'tabGuarantee'}
                                    {...tab}
                                />
                                {/* <AuthoritySettings
                                    hidden={tab.id !== 'tabAuthority'}
                                    {...tab}
                                /> */}
                                <QualSettings
                                    hidden={tab.id !== 'tabQual'}
                                    {...tab}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <MyFooter>
                    <div className="wr-pages-detail__footer">
                        <div></div>
                        <div>
                            <button
                                className="btn btn-primary btn-sm"
                                type="button"
                            >
                                등록
                            </button>
                        </div>
                    </div>
                </MyFooter>
            </MyLayout>
        </>
    );
};

export default CreateUser;
