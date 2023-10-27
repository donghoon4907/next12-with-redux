import type { NextPage } from 'next';
import Head from 'next/head';
import { END } from 'redux-saga';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import { getCompaniesRequest } from '@actions/hr/get-companies';
import { MyLayout } from '@components/Layout';
import { useInitTab } from '@hooks/use-initialize';
import { OrgaForm } from '@partials/hr/orga/OrgaForm';
import { getUsersRequest } from '@actions/hr/get-users';

const CreateOrga: NextPage = () => {
    // 탭 설정
    useInitTab('영업조직등록');

    return (
        <>
            <Head>
                <title>영업조직등록</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <MyLayout>
                <OrgaForm mode="create" />
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask }) => {
        dispatch(getCompaniesRequest('insu'));

        dispatch(getCompaniesRequest('bank'));

        dispatch(getUsersRequest({ idx: '1' }));

        dispatch(END);

        await sagaTask?.toPromise();

        return null;
    }),
);

export default CreateOrga;
