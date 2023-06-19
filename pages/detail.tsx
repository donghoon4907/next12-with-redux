import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { DemoState } from '@reducers/demo';
import type { CoreSelectOption } from '@interfaces/core';
import type { ColumnDef } from '@tanstack/react-table';
import Head from 'next/head';
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { LuSearch } from 'react-icons/lu';
import { Header } from '@components/header';
import { Table } from '@components/table';
import { wrapper } from '@store/redux';
import { demoRequest, demoSuccess } from '@actions/demo/demo.action';
// import { SHOW_COUNTS } from '@constants/selectOption';
import { MySelect } from '@components/select';
import { Label } from '@components/label';
import { X_SEARCH_FILTERS, X_SEARCH_SELECTS } from '@constants/filter';
import { DateRangePicker } from 'rsuite';

// 임시
import { useDispatch } from 'react-redux';
import { MyCheckbox } from '@components/checkbox';
import { Breadcrumb } from '@components/breadcrumb';
import { IconWrapper } from '@components/IconWrapper';
import { MyRadio } from '@components/radio';
import {
    isNumeric,
    checkEllipsisNeeded,
    checkSeparatorNeeded,
} from '@utils/validation';
import { Pagination } from '@components/pagination';
import Image from 'next/image';
import { Input } from '@components/input';
import {
    getBasicPaymentsRequest,
    getBasicPaymentsSuccess,
} from '@actions/long/get-basic-payments.action';
import {
    getOverridesRequest,
    getOverridesSuccess,
} from '@actions/long/get-overrides.action';
import { LongState } from '@reducers/long';
// import { ValueType } from 'rsuite/esm/DateRangePicker';

const FULL_SELECT_SIZE = 367;

const WITH_SELECT_SIZE = 100;

const Detail: NextPage = () => {
    const dispatch = useDispatch();

    const { basicPayments } = useSelector<AppState, LongState>(
        (props) => props.long,
    );

    const [showCounts, setShowCounts] = useState<readonly CoreSelectOption[]>(
        [],
    );

    const [d, setD] = useState<[Date, Date] | null>([
        new Date('2022-02-01'),
        new Date('2022-03-01'),
    ]);

    const [org, setOrg] = useState<CoreSelectOption | null>(null);

    const handleChange = (org: CoreSelectOption | null) => {
        setOrg(org);
    };

    const columns = useMemo<ColumnDef<any>[]>(
        () =>
            Object.entries(basicPayments.fields).map(([key, value]) => {
                return {
                    header: (info: any) => {
                        return (
                            <strong
                                className={
                                    checkEllipsisNeeded(info.column.id)
                                        ? 'ellipsisTarget'
                                        : ''
                                }
                            >
                                {key}
                            </strong>
                        );
                    },
                    accessorKey: value,
                    cell: (info: any) => {
                        let className = '';
                        let cellValue = info.getValue();

                        if (
                            isNumeric(cellValue) &&
                            checkSeparatorNeeded(info.column.id)
                        ) {
                            cellValue = Number(cellValue).toLocaleString();
                        }

                        // 말줄임표가 필요한 경우
                        if (checkEllipsisNeeded(info.column.id)) {
                            className += 'text-truncate d-block';
                        }

                        return <span className={className}>{cellValue}</span>;
                    },
                };
            }),
        [basicPayments.fields],
    );

    const handleChangeDate = (value: [Date, Date] | null) => {
        setD(value);
    };

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section>
                <Header />
                <div className="wr-main__wrap">
                    <main className="wr-main">
                        <div className="wr-main__inner">
                            {/* <Breadcrumb /> */}
                            <div className="wr-pages-detail row">
                                <div className="col-4">
                                    <div className="row wr-pages-detail__left">
                                        <div className="col-8">
                                            <div className="row mt-2">
                                                <div className="col-9">
                                                    <div className="wr-group">
                                                        <span className="wr-pages-detail__department">
                                                            직할 영업 &#62;
                                                            5회사임직원 &#62;
                                                            전산개발실
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        type="button"
                                                    >
                                                        부서변경
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col">
                                                    <Label>고객명</Label>
                                                    <div className="input-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="홍길동"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <Label>사원번호</Label>
                                                    <div className="input-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="W1057"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div>
                                                        <Label>
                                                            주민등록번호
                                                        </Label>
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="121212-2*******"
                                                                aria-label="Recipient's username"
                                                                aria-describedby="button-addon2"
                                                            />
                                                            <button
                                                                className="btn btn-primary btn-sm"
                                                                type="button"
                                                                id="button-addon2"
                                                            >
                                                                보기
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <Label>직함</Label>
                                                    <div className="input-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="실장"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <Label>생년월일</Label>
                                                    <div className="wr-pages-detail__with">
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="1912-12-12"
                                                            />
                                                        </div>
                                                        <MySelect
                                                            width={
                                                                WITH_SELECT_SIZE
                                                            }
                                                            options={[]}
                                                            value={org}
                                                            onChange={() => {}}
                                                            placeholder={'양력'}
                                                            placeHolderFontSize={
                                                                16
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <Label>영업가족</Label>
                                                    <MySelect
                                                        width={FULL_SELECT_SIZE}
                                                        options={[]}
                                                        value={org}
                                                        onChange={() => {}}
                                                        placeholder={'FRC'}
                                                        placeHolderFontSize={16}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <Label>핸드폰</Label>
                                                    <div className="wr-pages-detail__with">
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="010-1234-5678"
                                                            />
                                                        </div>
                                                        <MySelect
                                                            width={
                                                                WITH_SELECT_SIZE
                                                            }
                                                            options={[]}
                                                            value={org}
                                                            onChange={() => {}}
                                                            placeholder={'KT'}
                                                            placeHolderFontSize={
                                                                16
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <Label>
                                                        전화번호 / 내선
                                                    </Label>
                                                    <div className="wr-pages-detail__with">
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="070-4881-6052"
                                                            />
                                                        </div>
                                                        <div
                                                            style={{
                                                                width: 140,
                                                            }}
                                                        >
                                                            <div className="input-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="6052"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <Label>이메일</Label>
                                                    <div className="wr-pages-detail__with">
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="yoongiekim@naver.com"
                                                            />
                                                        </div>
                                                        <MySelect
                                                            width={
                                                                WITH_SELECT_SIZE
                                                            }
                                                            options={[]}
                                                            value={org}
                                                            onChange={() => {}}
                                                            placeholder={
                                                                'naver'
                                                            }
                                                            placeHolderFontSize={
                                                                16
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <Label>기본주소</Label>
                                                    <div className="input-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="08195"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="button-addon2"
                                                        />
                                                        <button
                                                            className="btn btn-primary btn-sm"
                                                            type="button"
                                                            id="button-addon2"
                                                        >
                                                            찾기
                                                        </button>
                                                    </div>
                                                    <div className="input-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="경기도 안양시 동안구 시민대로 383"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="button-addon2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div>
                                                        <Label>상세주소</Label>
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="B동 1102호"
                                                                aria-label="Recipient's username"
                                                                aria-describedby="button-addon2"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div>
                                                        <Label>입사일자</Label>
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="2023-02-11"
                                                                aria-label="Recipient's username"
                                                                aria-describedby="button-addon2"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div>
                                                        <Label>유치자</Label>
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="홍길순 (W0010)"
                                                                aria-label="Recipient's username"
                                                                aria-describedby="button-addon2"
                                                            />
                                                            <button
                                                                className="btn btn-primary btn-sm"
                                                                type="button"
                                                                id="button-addon2"
                                                            >
                                                                찾기
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div>
                                                        <Label>재직현황</Label>
                                                        <MySelect
                                                            width={
                                                                FULL_SELECT_SIZE
                                                            }
                                                            options={[]}
                                                            value={org}
                                                            onChange={() => {}}
                                                            placeholder={'상근'}
                                                            placeHolderFontSize={
                                                                16
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div>
                                                        <Label>퇴사일자</Label>
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="2023-02-11"
                                                                aria-label="Recipient's username"
                                                                aria-describedby="button-addon2"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="p-2">
                                                <img
                                                    src="http://via.placeholder.com/200x250"
                                                    className="img-thumbnail"
                                                    alt="..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="wr-pages-detail__right">
                                        <ul className="nav nav-tabs">
                                            <li className="nav-item wr-tab">
                                                <a
                                                    className="nav-link single active"
                                                    aria-current="page"
                                                    href="#"
                                                >
                                                    소득설정
                                                </a>
                                            </li>
                                            <li className="nav-item wr-tab">
                                                <a
                                                    className="nav-link single"
                                                    href="#"
                                                >
                                                    보증설정
                                                </a>
                                            </li>
                                            <li className="nav-item wr-tab">
                                                <a
                                                    className="nav-link single"
                                                    href="#"
                                                >
                                                    시스템권한
                                                </a>
                                            </li>
                                            <li className="nav-item wr-tab">
                                                <a className="nav-link single">
                                                    자격관리
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="wr-pages-detail__body">
                                            <div className="row">
                                                <div className="col-4">
                                                    <Label>은행명</Label>
                                                    <MySelect
                                                        width={FULL_SELECT_SIZE}
                                                        options={[]}
                                                        value={org}
                                                        onChange={() => {}}
                                                        placeholder={'국민은행'}
                                                        placeHolderFontSize={16}
                                                    />
                                                </div>
                                                <div className="col-4">
                                                    <Label>계좌번호</Label>
                                                    <div className="input-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="123456-01-32423934"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <Label>예금주</Label>
                                                    <div className="wr-pages-detail__with">
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="홍길동"
                                                            />
                                                        </div>
                                                        <MySelect
                                                            width={
                                                                WITH_SELECT_SIZE
                                                            }
                                                            options={[]}
                                                            value={org}
                                                            onChange={() => {}}
                                                            placeholder={'과세'}
                                                            placeHolderFontSize={
                                                                16
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4">
                                                    <Label>소득구분</Label>
                                                    <MySelect
                                                        width={FULL_SELECT_SIZE}
                                                        options={[]}
                                                        value={org}
                                                        onChange={() => {}}
                                                        placeholder={
                                                            '근로 + 사업'
                                                        }
                                                        placeHolderFontSize={16}
                                                    />
                                                </div>
                                                <div className="col-4">
                                                    <Label>
                                                        자동차 지급제도
                                                    </Label>
                                                    <MySelect
                                                        width={FULL_SELECT_SIZE}
                                                        options={[]}
                                                        value={org}
                                                        onChange={() => {}}
                                                        placeholder={'S3-2'}
                                                        placeHolderFontSize={16}
                                                    />
                                                </div>
                                                <div className="col-4">
                                                    <Label>일반 지급율</Label>
                                                    <div className="wr-pages-detail__with">
                                                        <MySelect
                                                            width={300}
                                                            options={[]}
                                                            value={org}
                                                            onChange={() => {}}
                                                            placeholder={
                                                                '기본 + 성과'
                                                            }
                                                            placeHolderFontSize={
                                                                16
                                                            }
                                                        />

                                                        <div className="input-group align-items-center">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="85"
                                                            />
                                                            <span className="ms-2">
                                                                %
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col">
                                                    <div className="wr-table__wrap">
                                                        <Table
                                                            columns={columns}
                                                            data={
                                                                basicPayments.data
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </section>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    ({ dispatch, sagaTask }) =>
        async (_) => {
            dispatch(
                getBasicPaymentsRequest({
                    successAction: getBasicPaymentsSuccess,
                    callback: () => {},
                }),
            );

            dispatch(
                getOverridesRequest({
                    successAction: getOverridesSuccess,
                    callback: () => {},
                }),
            );

            dispatch(END);

            await sagaTask?.toPromise();

            return {
                props: {},
            };
        },
);

export default Detail;
