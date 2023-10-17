import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { CustomerForm } from '@partials/customer/CustomerForm';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import { getOrgasRequest } from '@actions/hr/get-orgas';
import { getUsersRequest } from '@actions/hr/get-users';
import { getCompaniesRequest } from '@actions/hr/get-companies';
import { MyLayout } from '@components/Layout';
import { useInitTab } from '@hooks/use-initialize';

const CreateCustomer: NextPage = () => {
    const { loggedInUser } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    // 탭 설정
    // useInitTab('고객등록');

    return (
        <>
            <Head>
                <title>고객등록</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <MyLayout>
                <CustomerForm
                    mode="create"
                    spe="customer"
                    defaultUserid={loggedInUser.userid}
                    defaultUsername={loggedInUser.user_info.name}
                    defaultUserFulls={loggedInUser.user_info.fulls}
                />
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask }) => {
        dispatch(
            getOrgasRequest({
                idx: '1',
            }),
        );

        dispatch(getCompaniesRequest('long-view'));

        dispatch(getCompaniesRequest('car-view'));

        dispatch(getCompaniesRequest('gen-view'));

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

export default CreateCustomer;
