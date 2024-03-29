import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { startOfMonth } from 'date-fns';
import { HrState } from '@reducers/hr';
import { AppState } from '@reducers/index';
import { useSelect } from '@hooks/use-select';
import longConstants from '@constants/options/long';
import { MySelect } from '@components/select';
import { SearchFilterForm } from '@partials/common/form/SearchFilter';
import { SearchFilterOrgaSelect } from '@partials/common/select/SearchFilterOrga';
import { SearchFilterUserSelect } from '@partials/common/select/SearchFilterUser';
import { SearchFilterDatepicker } from '@partials/common/datepicker/SearchFilter';
import { SearchFilterKeywordInput } from '@partials/common/input/SearchFilterKeyword';
import { findSelectOption } from '@utils/getter';
import { SearchFilterUserCheckbox } from '@partials/common/checkbox/SearchFilterCheckUser';
import { CollapseButton } from '@components/Collapse';
import { SearchFilterCompanySelect } from '@partials/common/select/SearchFilterCompany';
import { PopupTriggerSelect } from '@components/select/PopupTrigger';

import { LongWhoiSettingTemplate } from './WhoiSetting';
import { SearchFilterLongSpecSelect } from '@partials/common/select/SearchFilterLongSpec';

interface Props {}

export const LongSilSearchFilter: FC<Props> = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const { longViewCompanies } = useSelector<AppState, HrState>(
        (props) => props.hr,
    );

    // 확장 여부
    const [expand, setExpand] = useState(false);
    // 검색필터 - 현상태
    const [status, setStatus] = useSelect(longConstants.silStatus);
    // 검색필터 - 납입주기
    const [pay_cycle, setPayCycle] = useSelect(longConstants.payCycle2);
    // 검색필터 - 납입방법
    const [cycle, setCycle] = useSelect(longConstants.payCycle2);
    // 검색필터 - 입금구분
    const [sildist, setSildist] = useSelect(longConstants.silDist);
    // 검색필터 - 회차
    const [whoi, setWhoi] = useState('1~999');

    useEffect(() => {
        const { status, pay_cycle, cycle, sildist, whoi } = router.query;

        if (status) {
            setStatus(findSelectOption(status, longConstants.silStatus));
        }

        if (pay_cycle) {
            setPayCycle(findSelectOption(pay_cycle, longConstants.payCycle2));
        }

        if (cycle) {
            setCycle(findSelectOption(cycle, longConstants.payCycle2));
        }

        if (sildist) {
            setSildist(findSelectOption(sildist, longConstants.silDist));
        }

        if (whoi) {
            setWhoi(whoi as string);
        }
    }, [router]);

    return (
        <SearchFilterForm>
            <CollapseButton
                type="horizontal"
                expand={expand}
                setExpand={setExpand}
            />
            <div className={`${displayName}__filters`}>
                <div className={`${displayName}__filterrow`}>
                    <div className={`${displayName}__filter`}>
                        <SearchFilterOrgaSelect />
                        <SearchFilterUserSelect />
                        <SearchFilterUserCheckbox />
                    </div>
                    <div className={`${displayName}__filter`}>
                        <div className={`${displayName}__divider`}></div>
                        <SearchFilterCompanySelect
                            options={longViewCompanies}
                        />
                        <SearchFilterLongSpecSelect />
                        <div className={`${displayName}__field`}>
                            <label
                                className={`${displayName}__label`}
                                htmlFor="sildist"
                            >
                                입금구분
                            </label>
                            <div style={{ width: 110 }}>
                                <MySelect
                                    id="sildist"
                                    placeholder="선택"
                                    {...sildist}
                                />
                            </div>
                        </div>
                        <div className={`${displayName}__field`}>
                            <span className={`${displayName}__label`}>
                                회차
                            </span>
                            <div style={{ width: 130 }}>
                                <PopupTriggerSelect
                                    id="whoi"
                                    title={whoi}
                                    setTitle={setWhoi}
                                >
                                    <LongWhoiSettingTemplate />
                                </PopupTriggerSelect>
                            </div>
                        </div>

                        <div className={`${displayName}__divider`}></div>
                    </div>
                    <div className={`${displayName}__filter`}>
                        <div className={`${displayName}__field`}>
                            <span className={`${displayName}__label`}>
                                영수일
                            </span>
                            <input
                                type="hidden"
                                name="date_type"
                                value="sildate"
                            />
                            <SearchFilterDatepicker
                                defaultValue={[
                                    startOfMonth(new Date()),
                                    new Date(),
                                ]}
                            />
                        </div>
                        <SearchFilterKeywordInput />
                    </div>
                </div>
                <div
                    className={`${displayName}__filterrow ${
                        expand ? '' : `${displayName}__filterrow--hide`
                    } wr-border-t`}
                >
                    <div className={`${displayName}__filter`}>
                        <div className={`${displayName}__field`}>
                            <label
                                className={`${displayName}__label`}
                                htmlFor="cycle"
                            >
                                납입방법
                            </label>
                            <div style={{ width: 100 }}>
                                <MySelect
                                    id="cycle"
                                    placeholder="선택"
                                    {...cycle}
                                />
                            </div>
                        </div>
                        <div className={`${displayName}__field`}>
                            <label
                                className={`${displayName}__label`}
                                htmlFor="status"
                            >
                                현상태
                            </label>
                            <div style={{ width: 110 }}>
                                <MySelect
                                    id="status"
                                    placeholder="선택"
                                    {...status}
                                />
                            </div>
                        </div>
                        <div className={`${displayName}__field`}>
                            <label
                                className={`${displayName}__label`}
                                htmlFor="pay_cycle"
                            >
                                납입주기
                            </label>
                            <div style={{ width: 100 }}>
                                <MySelect
                                    id="pay_cycle"
                                    placeholder="선택"
                                    {...pay_cycle}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SearchFilterForm>
    );
};
