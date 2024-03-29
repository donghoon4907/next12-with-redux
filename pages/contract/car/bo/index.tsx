import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { CarState } from '@reducers/car';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { addYears, startOfMonth } from 'date-fns';
import { MyTable } from '@components/table';
import { wrapper } from '@store/redux';
import { MyPagination } from '@components/pagination';
import { MyLayout } from '@components/Layout';
import { useColumn } from '@hooks/use-column';
import { getOrgasRequest } from '@actions/orga/get-orgas.action';
import { pageMiddleware } from '@utils/middleware/page';
import { getCarsRequest } from '@actions/car/get-cars.action';
import { getCompaniesRequest } from '@actions/hr/get-companies.action';
import { SearchResultTemplate } from '@partials/common/template/SearchResult';
import { generateListParams } from '@utils/generate';
import { CarSearchFilter } from '@partials/car/SearchFilter';
import dayjs from 'dayjs';
import { getUsersRequest } from '@actions/user/get-users.action';
import { MyHelmet } from '@components/Helmet';

const CarBo: NextPage = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const { cars } = useSelector<AppState, CarState>((props) => props.car);

    const columns = useColumn(cars.fields);

    const handleClickRow = ({ idx }: any) => {
        router.push(`/contract/car/${idx}`);
    };

    return (
        <>
            <MyHelmet />
            <MyLayout>
                <div className={displayName}>
                    <CarSearchFilter />
                    <SearchResultTemplate
                        createUrl="/contract/car/create"
                        data={[
                            `계약건수:${cars.total.count.toLocaleString()}건`,
                            `보험료계:${
                                cars.total.pay
                                    ? cars.total.pay.toLocaleString()
                                    : 0
                            }`,
                        ]}
                    />
                    <div className={`${displayName}__body`}>
                        <div className="wr-table--scrollable wr-table--hover">
                            <MyTable
                                columns={columns}
                                data={cars.rows}
                                pageSize={cars.lastPayload?.nums}
                                onClickRow={handleClickRow}
                            />
                        </div>
                    </div>
                    <div className={`${displayName}__footer`}>
                        <MyPagination total={cars.total.count}></MyPagination>
                    </div>
                </div>
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    pageMiddleware(async ({ dispatch }, ctx) => {
        const condition = {
            bo_datefrom: [
                dayjs(startOfMonth(addYears(new Date(), -1))).format(
                    'YYYY-MM-DD',
                ),
                dayjs(new Date()).format('YYYY-MM-DD'),
            ],
        };

        const params = generateListParams(condition, ctx.query);

        dispatch(getCarsRequest(params));

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

export default CarBo;
