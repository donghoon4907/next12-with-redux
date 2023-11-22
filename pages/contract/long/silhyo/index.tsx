import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { LongState } from '@reducers/long';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { startOfMonth } from 'date-fns';
import dayjs from 'dayjs';
import { MyTable } from '@components/table';
import { wrapper } from '@store/redux';
import { MyPagination } from '@components/pagination';
import { MyLayout } from '@components/Layout';
import { useColumn } from '@hooks/use-column';
import { getOrgasRequest } from '@actions/orga/get-orgas.action';
import { permissionMiddleware } from '@utils/middleware/permission';
import { getCompaniesRequest } from '@actions/hr/get-companies.action';
import { SearchResultTemplate } from '@partials/common/template/SearchResult';
import { generateListParams } from '@utils/generate';
import { getLongSilhyosRequest } from '@actions/long/get-silhyos.action';
import { LongSilhyoSearchFilter } from '@partials/contract/long/template/SilhyoSearchFilter';
import { getUsersRequest } from '@actions/user/get-users.action';

const LongSilhyo: NextPage = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const { longSilhyos } = useSelector<AppState, LongState>(
        (props) => props.long,
    );

    const columns = useColumn(longSilhyos.fields);

    const handleClickRow = ({ idx }: any) => {
        router.push(`/contract/long/${idx}`);
    };

    return (
        <>
            <Head>
                <title>우리인슈맨라이프</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <MyLayout>
                <div className={displayName}>
                    <LongSilhyoSearchFilter />
                    <SearchResultTemplate
                        createUrl="/contract/long/create"
                        data={[
                            `계약건수:${longSilhyos.total.count.toLocaleString()}건`,
                        ]}
                    />
                    <div className={`${displayName}__body`}>
                        <div className="wr-table--scrollable wr-table--hover">
                            <MyTable
                                columns={columns}
                                data={longSilhyos.rows}
                                pageSize={longSilhyos.lastPayload?.nums}
                                onClickRow={handleClickRow}
                            />
                        </div>
                    </div>
                    <div className={`${displayName}__footer`}>
                        <MyPagination
                            total={longSilhyos.total.count}
                        ></MyPagination>
                    </div>
                </div>
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask }, ctx) => {
        const condition = {
            sdate: [
                dayjs(startOfMonth(new Date())).format('YYYY-MM-DD'),
                dayjs(new Date()).format('YYYY-MM-DD'),
            ],
        };

        const params = generateListParams(condition, ctx.query);

        dispatch(getLongSilhyosRequest(params));

        dispatch(getCompaniesRequest('long-view'));

        dispatch(getOrgasRequest({}));

        dispatch(
            getUsersRequest({
                idx: '1',
            }),
        );

        dispatch(END);

        await sagaTask?.toPromise();

        return null;
    }),
);

export default LongSilhyo;
