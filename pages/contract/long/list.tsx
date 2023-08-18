import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { CoreSelectOption } from '@interfaces/core';
import type { LongState } from '@reducers/long';
import Head from 'next/head';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import dayjs from 'dayjs';
import { DateRangePicker } from 'rsuite';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';
import { MyTable } from '@components/table';
import { wrapper } from '@store/redux';
import { MySelect } from '@components/select';
import { MyPagination } from '@components/pagination';
import { WithLabel } from '@components/WithLabel';
import { SearchInput } from '@components/input/Search';
import { MyLayout } from '@components/Layout';
import { MyFooter } from '@components/footer';
import { useColumn } from '@hooks/use-column';
import { useLinkTab } from '@hooks/use-tab';
import { getOrgasRequest } from '@actions/hr/get-orgas';
import { HrState } from '@reducers/hr';
import { useSelect } from '@hooks/use-select';
import { getUsersRequest } from '@actions/hr/get-users';
import { useInput, useNumbericInput } from '@hooks/use-input';
import coreConstants from '@constants/core';
import { MyInput } from '@components/input';
import { useDateRangepicker } from '@hooks/use-datepicker';
import { permissionMiddleware } from '@utils/middleware/permission';
import {
    getLongsRequest,
    getLongsSuccess,
} from '@actions/long/get-longs.action';
import { DISTS, PRODUCT_TYPE } from '@constants/selectOption';
import { getCompaniesRequest } from '@actions/hr/get-companies';
import longConstants from '@constants/options/long';

const Longs: NextPage = () => {
    const dispatch = useDispatch();

    const { orgas, users, longViewCompanies } = useSelector<AppState, HrState>(
        (props) => props.hr,
    );

    const { longs } = useSelector<AppState, LongState>((props) => props.long);

    const tab = useLinkTab();

    const columns = useColumn(longs.fields);

    // 검색필터 - 조직
    const [orga, setOrga] = useState<CoreSelectOption | null>(null);
    // 검색필터 - 영업가족
    const [user] = useSelect(users, null);
    // 검색필터 - 회차
    const [beforeRound] = useNumbericInput('1', { addComma: true });
    const [afterRound] = useNumbericInput('1', { addComma: true });
    // 검색필터 - 계약일자
    const contdate = useDateRangepicker([
        new Date('2023-06-01'),
        new Date('2023-06-30'),
    ]);
    // 검색필터 - 보험사
    const [company] = useSelect(longViewCompanies, null);
    // 검색필터 - 보종
    const [productType] = useSelect(PRODUCT_TYPE, null);
    // 검색필터 - 상품명
    const [ptitle] = useSelect(longs.ptitles, null);
    // 검색필터 - 납입주기
    const [cycle] = useSelect(longConstants.payCycle, null);
    // 검색필터 - 입금구분
    const [dist] = useSelect(DISTS, null);
    // 검색필터 - 검색어
    const [search] = useInput('');

    const handleChangeOrga = (org: CoreSelectOption | null) => {
        setOrga(org);

        if (org !== null) {
            dispatch(getUsersRequest({ idx: org.value }));
        }
    };

    const handleClickRow = ({ cidx, cname }: any) => {
        tab.move(`/contract/long/${cidx}`);
    };

    const handleSearch = () => {
        const condition: any = {};

        if (contdate.value) {
            condition['paydate'] = contdate.value.map((d) =>
                dayjs(d).format(coreConstants.defaultDateFormat),
            );
        }

        dispatch(
            getLongsRequest({
                condition,
                page: 1,
                nums: longs.lastPayload!.nums,
                successAction: getLongsSuccess,
            }),
        );
    };

    return (
        <>
            <Head>
                <title>장기계약목록</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <MyLayout>
                <div className="wr-pages-long-list">
                    {/* <Breadcrumb /> */}
                    <div className="wr-pages-long-list__header">
                        <div className="row">
                            <div className="col-6">
                                <div className="row wr-search__filter">
                                    <div className="col-6">
                                        <WithLabel
                                            id="orga"
                                            label="조직"
                                            type="active"
                                        >
                                            <MySelect
                                                inputId="orga"
                                                options={orgas}
                                                value={orga}
                                                onChange={handleChangeOrga}
                                                placeholder="선택"
                                            />
                                        </WithLabel>
                                    </div>
                                    <div className="col-6">
                                        <div className="wr-ml">
                                            <WithLabel
                                                id="fc"
                                                label="영업가족"
                                                type="active"
                                            >
                                                <MySelect
                                                    inputId="fc"
                                                    placeholder="선택"
                                                    {...user}
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                </div>

                                <div className="row wr-mt">
                                    <div className="col-3">
                                        <WithLabel
                                            id="company"
                                            label="보험사"
                                            type="active"
                                        >
                                            <MySelect
                                                inputId="company"
                                                placeholder="선택"
                                                {...company}
                                            />
                                        </WithLabel>
                                    </div>
                                    <div className="col-3">
                                        <div className="wr-ml">
                                            <WithLabel
                                                id="product_type"
                                                label="보종"
                                                type="active"
                                            >
                                                <MySelect
                                                    inputId="product_type"
                                                    placeholder="선택"
                                                    {...productType}
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="wr-ml">
                                            <WithLabel
                                                id="ptitle"
                                                label="상품명"
                                                type="active"
                                            >
                                                <MySelect
                                                    inputId="ptitle"
                                                    placeholder="선택"
                                                    {...ptitle}
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-6">
                                        {/* <UncontrolledPopover
                                            placement="bottom"
                                            target="round"
                                            trigger="legacy"
                                            // isOpen
                                        >
                                            <PopoverHeader>
                                                회차 설정
                                            </PopoverHeader>
                                            <PopoverBody>
                                                <button
                                                    type="button"
                                                    aria-disabled="false"
                                                    className="rs-btn rs-btn-link rs-btn-sm"
                                                >
                                                    초회
                                                </button>
                                                <button
                                                    type="button"
                                                    aria-disabled="false"
                                                    className="rs-btn rs-btn-link rs-btn-sm"
                                                >
                                                    초년도
                                                </button>
                                                <button
                                                    type="button"
                                                    aria-disabled="false"
                                                    className="rs-btn rs-btn-link rs-btn-sm"
                                                >
                                                    2차년도이상
                                                </button>
                                            </PopoverBody>
                                        </UncontrolledPopover> */}
                                        <div className="wr-ml position-relative">
                                            <WithLabel
                                                id="round"
                                                label="회차"
                                                type="active"
                                            >
                                                <MyInput
                                                    type="text"
                                                    id="round"
                                                    className="text-end"
                                                    placeholder="입력"
                                                    unit="~"
                                                    {...beforeRound}
                                                />
                                                <div
                                                    className="wr-with__extension"
                                                    style={{ width: 150 }}
                                                >
                                                    <MyInput
                                                        type="text"
                                                        id="round_after"
                                                        className="text-end wr-border-l--hide"
                                                        placeholder="입력"
                                                        {...afterRound}
                                                    />
                                                </div>
                                            </WithLabel>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="wr-ml">
                                            <WithLabel
                                                id="datepicker"
                                                label="계약일자"
                                                type="active"
                                            >
                                                <DateRangePicker
                                                    id="datepicker"
                                                    format="yyyy-MM-dd"
                                                    placeholder="기간을 입력 혹은 선택하세요"
                                                    size="sm"
                                                    placement="autoVerticalEnd"
                                                    {...contdate}
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    ranges={[
                                                        {
                                                            label: '전월',
                                                            value: [
                                                                startOfMonth(
                                                                    addMonths(
                                                                        new Date(),
                                                                        -1,
                                                                    ),
                                                                ),
                                                                endOfMonth(
                                                                    addMonths(
                                                                        new Date(),
                                                                        -1,
                                                                    ),
                                                                ),
                                                            ],
                                                        },
                                                        {
                                                            label: '당월',
                                                            value: [
                                                                startOfMonth(
                                                                    new Date(),
                                                                ),
                                                                new Date(),
                                                            ],
                                                        },
                                                    ]}
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                </div>
                                <div className="row wr-mt">
                                    <div className="col-3">
                                        <div className="wr-ml">
                                            <WithLabel
                                                id="cycle"
                                                label="납입주기"
                                                type="active"
                                            >
                                                <MySelect
                                                    inputId="cycle"
                                                    placeholder="선택"
                                                    {...cycle}
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="wr-ml">
                                            <WithLabel
                                                id="dist"
                                                label="입금구분"
                                                type="active"
                                            >
                                                <MySelect
                                                    inputId="dist"
                                                    placeholder="선택"
                                                    {...dist}
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="wr-ml">
                                            <WithLabel
                                                id="search"
                                                label="검색"
                                                type="active"
                                            >
                                                <SearchInput
                                                    id="search"
                                                    placeholder="검색어를 입력하세요"
                                                    {...search}
                                                    onSearch={handleSearch}
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wr-pages-long-list__body wr-table--scrollable wr-table--hover wr-mt">
                        <MyTable
                            columns={columns}
                            data={longs.rows}
                            pageSize={longs.lastPayload?.nums}
                            onClickRow={handleClickRow}
                        />
                    </div>

                    <MyFooter>
                        <MyPagination
                            requestAction={getLongsRequest}
                            successAction={getLongsSuccess}
                            payload={longs.lastPayload}
                            total={longs.total.count}
                        >
                            <span>
                                건수: {longs.total.count.toLocaleString()}
                            </span>
                            <span>
                                실적보험료계: {longs.total.pay.toLocaleString()}
                            </span>
                            <span>
                                수정보험료계: {longs.total.tp.toLocaleString()}
                            </span>
                        </MyPagination>
                    </MyFooter>
                </div>
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask }) => {
        dispatch(getCompaniesRequest('long-view'));

        dispatch(
            getLongsRequest({
                condition: {
                    paydate: ['2023-06-01', '2023-06-30'],
                },
                page: 1,
                nums: 25,
                successAction: getLongsSuccess,
            }),
        );

        dispatch(
            getOrgasRequest({
                idx: '1',
            }),
        );

        dispatch(getUsersRequest({ idx: '1' }));

        dispatch(END);

        await sagaTask?.toPromise();

        return null;
    }),
);

export default Longs;
