import type { FC, FormEvent, ChangeEvent } from 'react';
import type { AppState } from '@reducers/index';
import type { ContractState } from '@reducers/contract';
import type { Spe } from '@models/spe';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { WithLabel } from '@components/WithLabel';
import { MyButton } from '@components/button';
import { MyInput } from '@components/input';
import { MyDatepicker } from '@components/datepicker';
import { useInput, usePhoneInput } from '@hooks/use-input';
import { useDatepicker } from '@hooks/use-datepicker';
import { birthdayToAge } from '@utils/calculator';
import { createInsured } from '@actions/contract/common/set-insured.action';
import { generateIndex } from '@utils/generate';
import { MyCheckbox } from '@components/checkbox';
import { isEmpty } from '@utils/validator/common';
import { useApi } from '@hooks/use-api';
import { getUserCustomersRequest } from '@actions/customer/get-user-customers';
import { showInsuredSearchModal } from '@actions/modal/customer-search.action';
import { convertPhoneNumber } from '@utils/converter';
import { updateLoadedInsured } from '@actions/contract/common/set-contractor.action';
import { MyRadio } from '@components/radio';
import { WithText } from '@components/WithText';

interface Props {
    userid: string;
}

export const GeneralInsuredForm: FC<Props> = ({ userid }) => {
    const dispatch = useDispatch();

    const { insureds, loadedInsured, loadedContract } = useSelector<
        AppState,
        ContractState
    >((state) => state.contract);
    const getUserCustomers = useApi(getUserCustomersRequest);

    // 구분
    const [dist, setDist] = useState('피보험자');
    // 계약자와 동일
    const [checkContract, setCheckContract] = useState(false);
    // 태아
    const [checkFetus, setCheckFetus] = useState(false);
    // 피보험자명
    const [name, setName] = useInput('');
    // 피보험물명
    const [tname, setTname] = useInput('');
    // 소재지
    const [taddr, setTaddr] = useInput('');
    // 연락처
    const [tel, setTel] = usePhoneInput('');
    // 직업
    const [job, setJob] = useInput('');
    // 생년월일
    const [birthday, setBirthday] = useDatepicker(null);
    // 성별
    const [gender, setGender] = useState('남');
    // 계약자와 동일 혹은 태아 체크 시 피보험자명 비활성
    const isDisabledName = checkContract || checkFetus;
    // 계약자와 동일 혹은 고객정보연결 시 비활성
    const isDisabledAnother = checkContract || loadedInsured;
    // 생년월일로 나이 계산
    let age = -1;
    if (birthday.value) {
        age = birthdayToAge(birthday.value);
    }

    const handleChangeDist = (evt: ChangeEvent<HTMLInputElement>) => {
        setDist(evt.target.value);
    };

    const handleChangeGender = (evt: ChangeEvent<HTMLInputElement>) => {
        setGender(evt.target.value);
    };

    const handleCheckContract = (evt: ChangeEvent<HTMLInputElement>) => {
        if (evt.target.checked) {
            // 계약자 설정 체크
            if (!loadedContract) {
                return alert('먼저 계약자를 설정하세요.');
            }
            // 고객정보연결한 경우 체크
            let tf = true;
            if (loadedInsured) {
                tf = confirm(
                    '고객정보가 연결된 상태입니다. 계약자 정보를 불러오시겠습니까?',
                );
            }

            if (!tf) {
                return;
            }
            // 계약자 설정 로드
            setName(loadedContract.name || '');
            setTel(
                loadedContract.mobile
                    ? convertPhoneNumber(loadedContract.mobile)
                    : '',
            );
            setJob(loadedContract.job || '');
            setBirthday(new Date(loadedContract.birthday || null));
            // 고객정보연결 초기화
            dispatch(updateLoadedInsured(null));
            setCheckContract(true);

            if (checkFetus) {
                setCheckFetus(false);
            }
        } else {
            setCheckContract(false);
        }
    };

    const handleCheckFetus = (evt: ChangeEvent<HTMLInputElement>) => {
        if (evt.target.checked) {
            // 고객정보연결한 경우 체크
            let tf = true;
            if (loadedInsured) {
                tf = confirm(
                    '고객정보가 연결된 상태입니다. 태아로 설정하시겠습니까?',
                );
            }

            if (!tf) {
                return;
            }
            // 필드 초기화
            handleClear();
            // 계약자 설정 로드
            setName('태아');

            setCheckFetus(true);
        } else {
            setCheckFetus(false);
        }
    };

    const handleCreatePerson = () => {
        if (isEmpty(name.value)) {
            return alert('피보험자명을 입력하세요');
        }
        // p_idx의 우선순위
        // 1. 계약자와 동일 체크
        // 2. 고객정보연결
        dispatch(
            createInsured({
                index: generateIndex(insureds),
                checked: false,
                name: name.value,
                tel: isEmpty(tel.value) ? '' : tel.value.replace(/\-/g, ''),
                job: isEmpty(job.value) ? '' : job.value,
                birthday: birthday.value
                    ? dayjs(birthday.value).format('YYYY-MM-DD')
                    : '',
                sex: gender ? gender : '',
                dist: '피보험자',
                p_idx: checkContract
                    ? loadedContract.idx
                    : loadedInsured
                    ? loadedInsured.idx
                    : undefined,
            }),
        );

        handleClear();
    };

    const handleCreateThing = () => {
        if (isEmpty(tname.value)) {
            return alert('피보험물을 입력하세요');
        }

        dispatch(
            createInsured({
                index: generateIndex(insureds),
                checked: false,
                name: tname.value,
                p_address: taddr.value,
                dist: '피보험물',
            }),
        );

        handleClear();
    };

    const handleClear = () => {
        setDist('피보험자');
        setName('');
        setTname('');
        setTaddr('');
        setTel('');
        setJob('');
        setBirthday(null);
        setGender('');
        dispatch(updateLoadedInsured(null));
        setCheckContract(false);
        setCheckFetus(false);
    };

    const handleSearchCustomer = (evt: FormEvent) => {
        evt.preventDefault();

        if (isEmpty(name.value)) {
            return alert('피보험자명을 입력하세요.');
        }

        getUserCustomers({ userid, username: name.value }, () => {
            dispatch(showInsuredSearchModal());
        });
    };
    // 고객정보연결 시 동작
    useEffect(() => {
        if (loadedInsured) {
            setName(loadedInsured.name || '');
            setTel(
                loadedInsured.mobile
                    ? convertPhoneNumber(loadedInsured.mobile)
                    : '',
            );
            setJob(loadedInsured.job || '');
            setBirthday(new Date(loadedInsured.birthday || null));
        }
    }, [loadedInsured]);
    // 계약자 설정 변경 시 동작
    useEffect(() => {
        // 계약자와 동일 체크된 경우만 동작
        if (checkContract && loadedContract) {
            setName(loadedContract.name || '');
            setTel(convertPhoneNumber(loadedContract.mobile) || '');
            setJob(loadedContract.job || '');
            setBirthday(new Date(loadedContract.birthday || null));
        }
    }, [checkContract, loadedContract]);

    return (
        <div className="wr-pages-detail__content">
            <div className="wr-pages-detail__subtitle">
                <strong>{dist} 추가</strong>
            </div>
            <div className="wr-pages-detail__buttons">
                <MyRadio
                    id="gif_is_person"
                    label="피보험자"
                    value="피보험자"
                    name="gif_dist"
                    checked={dist === '피보험자'}
                    onChange={handleChangeDist}
                />
                <MyRadio
                    id="gif_is_thing"
                    label="피보험물"
                    value="피보험물"
                    name="gif_dist"
                    checked={dist === '피보험물'}
                    onChange={handleChangeDist}
                />
            </div>
            {dist === '피보험자' && (
                <>
                    <div className="row">
                        <div className="col">
                            <form onSubmit={handleSearchCustomer}>
                                <WithLabel
                                    id="gif_name"
                                    label="피보험자명"
                                    type="active"
                                >
                                    <MyInput
                                        type="search"
                                        id="gif_name"
                                        placeholder="피보험자명"
                                        disabled={isDisabledName}
                                        {...name}
                                        button={{
                                            type: 'submit',
                                            className: 'btn-primary btn-md',
                                            disabled: isDisabledName,
                                            children: (
                                                <>
                                                    <span>고객정보연결</span>
                                                </>
                                            ),
                                        }}
                                    />
                                </WithLabel>
                            </form>
                        </div>
                    </div>
                    {!checkFetus && (
                        <>
                            <div className="row wr-mt">
                                <div className="col">
                                    <WithLabel
                                        id="gif_tel"
                                        label="연락처"
                                        type="active"
                                    >
                                        <MyInput
                                            id="gif_tel"
                                            placeholder="연락처"
                                            disabled={isDisabledAnother}
                                            {...tel}
                                        />
                                    </WithLabel>
                                </div>
                                <div className="col">
                                    <WithLabel
                                        id="gif_job"
                                        label="직업"
                                        type="active"
                                    >
                                        <MyInput
                                            id="gif_job"
                                            placeholder="직업"
                                            disabled={isDisabledAnother}
                                            {...job}
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                            <div className="row wr-mt">
                                <div className="col">
                                    <WithLabel
                                        id="gif_birthday"
                                        label="생년월일"
                                        type="active"
                                    >
                                        <MyDatepicker
                                            id="gif_birthday"
                                            size="md"
                                            placeholder="생년월일"
                                            disabled={isDisabledAnother}
                                            hooks={birthday}
                                        />
                                        {age !== -1 && (
                                            <div className="wr-with__extension wr-form__unit wr-border-l--hide">
                                                만 {age - 1}세
                                            </div>
                                        )}
                                    </WithLabel>
                                </div>
                                <div className="col">
                                    <WithText label="성별" type="active">
                                        <div className="wr-with__container">
                                            <MyRadio
                                                id="gif_is_man"
                                                label="남"
                                                value="남"
                                                name="gif_gender"
                                                checked={gender === '남'}
                                                onChange={handleChangeGender}
                                            />
                                            <MyRadio
                                                id="gif_is_woman"
                                                label="여"
                                                value="여"
                                                name="gif_gender"
                                                checked={gender === '여'}
                                                onChange={handleChangeGender}
                                            />
                                        </div>
                                    </WithText>
                                </div>
                            </div>
                        </>
                    )}
                    <div className="wr-pages-detail__toolbar wr-mt">
                        <div className="wr-pages-detail__buttons">
                            <MyCheckbox
                                id="gif_is_contract"
                                label="계약자와 동일"
                                onChange={handleCheckContract}
                                checked={checkContract}
                            />
                            <MyCheckbox
                                id="gif_is_fetus"
                                label="태아"
                                onChange={handleCheckFetus}
                                checked={checkFetus}
                            />
                        </div>
                        <div>
                            <MyButton
                                className="btn-primary btn-sm"
                                onClick={handleCreatePerson}
                            >
                                추가
                            </MyButton>
                        </div>
                    </div>
                </>
            )}
            {dist === '피보험물' && (
                <>
                    <div className="row">
                        <div className="col">
                            <WithLabel
                                id="gif_tname"
                                label="피보험물"
                                type="active"
                            >
                                <MyInput
                                    id="gif_tname"
                                    placeholder="피보험물"
                                    disabled={isDisabledAnother}
                                    {...tname}
                                />
                            </WithLabel>
                        </div>
                    </div>
                    <div className="row wr-mt">
                        <div className="col">
                            <WithLabel
                                id="gif_adress"
                                label="소재지"
                                type="active"
                            >
                                <MyInput
                                    id="gif_adress"
                                    placeholder="소재지"
                                    disabled={isDisabledAnother}
                                    {...taddr}
                                />
                            </WithLabel>
                        </div>
                    </div>
                    <div className="wr-pages-detail__toolbar wr-mt">
                        <div className="wr-pages-detail__buttons"></div>
                        <div>
                            <MyButton
                                className="btn-primary btn-sm"
                                onClick={handleCreateThing}
                            >
                                추가
                            </MyButton>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
