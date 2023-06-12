import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { CoreSelectOption } from '@interfaces/core';
import { Select } from '@components/select';
import { COLORS } from '@datas/select-options/colors';
import { Input } from '@components/input';
import { Label } from '@components/label';
import { useInput } from '@hooks/use-input';
import { Header } from '@components/header';
import { Table } from '@components/table';
// import { GridExample } from '@components/ag-grid';

const DUMMY = Array.from({ length: 30 }).fill({
    id: 'dummy',
    division: {
        id: 'example_division1',
        name: '계약',
    },
    contract: {
        id: 'example_contract1',
        num: 'M2023589',
        title: '자동차',
    },
    occurrenceAt: '2022-10-12',
    createdAt: '2022-09-12 14:00',
    responseAt: '2022-09-12 14:00',
    content: '고객의 요구사항에 따라...',
    writer: {
        id: 'example_writer1',
        login_id: 'W2323',
        name: '김서윤',
    },
    state: '종결',
});

const Home: NextPage = () => {
    const customerName = useInput('');

    const [selectedColors, setSelectedColors] = useState<
        readonly CoreSelectOption[]
    >([]);

    return (
        <div className="app-container app-theme-white fixed-header fixed-sidebar fixed-footer">
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
                        <div className="breadcrumb-wrap">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="#">개인영업 1</a>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <a href="#">신노원사업단</a>
                                    </li>
                                    <li
                                        className="breadcrumb-item active"
                                        aria-current="page"
                                    >
                                        업무보전
                                    </li>
                                </ol>
                            </nav>
                        </div>
                        <div className="row mt-3">
                            <div className="col-6">
                                <div className="row">
                                    <div className="col">
                                        <form>
                                            <Label htmlFor="customerName">
                                                고객명
                                            </Label>
                                            <Input
                                                type="text"
                                                id="customerName"
                                                placeholder="입력하세요"
                                                {...customerName}
                                            />
                                        </form>
                                    </div>
                                    <div className="col">
                                        <div>
                                            <label
                                                htmlFor="basic-url"
                                                className="form-label"
                                            >
                                                고객구분
                                            </label>
                                            <div className="input-group">
                                                <Select
                                                    value={selectedColors}
                                                    options={COLORS}
                                                    setValue={setSelectedColors}
                                                    placeholder="선택하세요"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="row">
                                    <div className="col">
                                        <div className="wr-table__wrap">
                                            <Table />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </section>
        </div>
    );
};

export default Home;
