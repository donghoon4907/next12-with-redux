import type { NextPage } from 'next';
import type { ChangeEvent } from 'react';
import type { MyColumnDef } from '@hooks/use-column';
import Head from 'next/head';
import { useMemo, useState, useRef } from 'react';
import { UploadSelect } from '@components/select/Upload';
import { MyTable } from '@components/table';
import { readAndConvert } from '@utils/xlsx';
import { convertForSelectUpload } from '@utils/converter';
import { useLoading } from '@hooks/use-loading';
import { MyLayout } from '@components/Layout';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import { END } from 'redux-saga';
import { getCompaniesRequest } from '@actions/hr/get-companies';
import { MySelect } from '@components/select';
import { MyInput } from '@components/input';
import { MyButton } from '@components/button';
import { MyFooter } from '@components/footer';
import { CoreSelectOption } from '@interfaces/core';
import { MyLocalPagination } from '@components/pagination/local';
import { findSelectOptionByLabel } from '@utils/getter';

const LongSelectUpload: NextPage = () => {
    // const dispatch = useDispatch();

    const loading = useLoading();

    // const [file, setFile] = useState<string>('');

    const fileRef = useRef<HTMLInputElement>(null);
    // 업로드 파일명
    const [filename, setFilename] = useState('');
    // 테이블의 컬럼 목록
    const [fields, setFields] = useState<CoreSelectOption[]>([]);
    // 컬럼의 셀렉트 설정 목록
    const [selects, setSelects] = useState<CoreSelectOption[]>([]);
    // 불러온 데이터 원본
    const [originData, setOriginData] = useState<any[]>([]);
    // 해당 페이지에 보여지는 데이터
    const [displayData, setDisplayData] = useState<any[]>([]);

    const handleClickFile = () => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    };

    const handleChangeFile = async (evt: ChangeEvent<any>) => {
        const file = evt.target.files[0];

        loading.on();

        try {
            const converted = await readAndConvert(
                file,
                convertForSelectUpload,
            );
            // empty 필드 제거
            const filtedFields = converted.fields.filter((v) => v);

            setFields(filtedFields);

            setSelects(
                Array.from({ length: filtedFields.length }).map((v, i) => {
                    if (i === 0) {
                        return findSelectOptionByLabel(
                            '계약번호',
                            filtedFields,
                        );
                    } else {
                        return null;
                    }
                }),
            );

            setOriginData(converted.data);

            setFilename(file.name);
        } catch (error) {
            console.error(error);
        } finally {
            loading.off();
        }
    };

    const columns = useMemo<MyColumnDef[]>(
        () =>
            fields.map(({ label, value }) => {
                return {
                    columns: [
                        {
                            header: (info: any) => <strong>{label}</strong>,
                            accessorKey: value,
                            cell: (info: any) => (
                                <span
                                    className="text-truncate d-block"
                                    style={{ width: 100 }}
                                >
                                    {info.getValue()}
                                </span>
                            ),
                        },
                    ],
                    header: (info: any) => {
                        let cellValue = info.column.id;

                        return (
                            <div>
                                <UploadSelect
                                    options={fields}
                                    index={+cellValue - 1}
                                    values={selects}
                                    setValues={setSelects}
                                    placeHolderFontSize={16}
                                    height="30px"
                                />
                            </div>
                        );
                    },
                    accessorKey: value,
                };
            }),
        [fields, selects],
    );

    return (
        <>
            <Head>
                <title>선택업로드</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <MyLayout>
                <div className="wr-pages-long-list">
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__title">
                            <strong>장기 선택업로드</strong>
                        </div>
                        <div className="wr-pages-detail__content">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex">
                                    <div style={{ width: 150 }}>
                                        <MySelect
                                            inputId="orga"
                                            placeHolderFontSize={16}
                                        />
                                    </div>

                                    <MyInput
                                        type="text"
                                        placeholder={filename}
                                        readOnly
                                        className="wr-border-l--hide"
                                        onClick={handleClickFile}
                                        button={{
                                            type: 'button',
                                            className: 'btn-primary btn-sm',
                                            onClick: handleClickFile,
                                            children: (
                                                <>
                                                    <span>파일찾기</span>
                                                </>
                                            ),
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wr-pages-long-list__body wr-mt">
                        <div className="wr-table--scrollable h-100">
                            <MyTable
                                columns={columns}
                                data={displayData}
                                pageSize={displayData.length}
                            />
                        </div>
                    </div>
                    <MyFooter>
                        <MyLocalPagination
                            data={originData}
                            setDisplayData={setDisplayData}
                        >
                            <span>
                                건수: {originData.length.toLocaleString()}
                            </span>
                        </MyLocalPagination>
                        {/* <MyPagination
                            // requestAction={getLongsRequest}
                            // successAction={getLongsSuccess}
                            payload={null}
                            total={excelFields.length}
                        ></MyPagination> */}
                    </MyFooter>
                </div>
                <input
                    type="file"
                    onChange={handleChangeFile}
                    hidden
                    ref={fileRef}
                />
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask }) => {
        dispatch(getCompaniesRequest('long-use'));

        dispatch(END);

        await sagaTask?.toPromise();

        return null;
    }),
);

export default LongSelectUpload;
