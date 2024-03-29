import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { LongState } from '@reducers/long';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { startOfMonth } from 'date-fns';
import dayjs from 'dayjs';
import { MyTable } from '@components/table';
import { wrapper } from '@store/redux';
import { MyPagination } from '@components/pagination';
import { MyLayout } from '@components/Layout';
import { useColumn } from '@hooks/use-column';
import { getOrgasRequest } from '@actions/orga/get-orgas.action';
import { pageMiddleware } from '@utils/middleware/page';
import { getCompaniesRequest } from '@actions/hr/get-companies.action';
import { SearchResultTemplate } from '@partials/common/template/SearchResult';
import { generateListParams } from '@utils/generate';
import { getLongBuhwalsRequest } from '@actions/long/get-buhwals.action';
import { LongBuhwalSearchFilter } from '@partials/long/template/BuhwalSearchFilter';
import { getUsersRequest } from '@actions/user/get-users.action';
import { MyHelmet } from '@components/Helmet';

const LongBuhwal: NextPage = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const { longBuhwals } = useSelector<AppState, LongState>(
        (props) => props.long,
    );

    const columns = useColumn(longBuhwals.fields);

    const handleClickRow = ({ idx }: any) => {
        router.push(`/contract/long/${idx}`);
    };

    return (
        <>
            <MyHelmet />
            <MyLayout>
                <div className={displayName}>
                    <LongBuhwalSearchFilter />
                    <SearchResultTemplate
                        createUrl="/contract/long/create"
                        data={[
                            `계약건수:${longBuhwals.total.count.toLocaleString()}건`,
                        ]}
                    />
                    <div className={`${displayName}__body`}>
                        <div className="wr-table--scrollable wr-table--hover">
                            <MyTable
                                columns={columns}
                                data={longBuhwals.rows}
                                pageSize={longBuhwals.lastPayload?.nums}
                                onClickRow={handleClickRow}
                            />
                        </div>
                    </div>
                    <div className={`${displayName}__footer`}>
                        <MyPagination
                            total={longBuhwals.total.count}
                        ></MyPagination>
                    </div>
                </div>
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    pageMiddleware(async ({ dispatch }, ctx) => {
        const condition = {
            budate: [
                dayjs(startOfMonth(new Date())).format('YYYY-MM-DD'),
                dayjs(new Date()).format('YYYY-MM-DD'),
            ],
        };

        const params = generateListParams(condition, ctx.query);

        dispatch(getLongBuhwalsRequest(params));

        dispatch(getCompaniesRequest('long-view'));

        dispatch(getOrgasRequest({}));

        dispatch(
            getUsersRequest({
                idx: '1',
            }),
        );

        return null;
    }),
);

export default LongBuhwal;
