import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import { getCompaniesRequest } from '@actions/hr/get-companies.action';
import { LongForm } from '@partials/contract/long/LongForm';
import { getOrgasRequest } from '@actions/hr/get-orgas.action';
import { findSelectOption } from '@utils/getter';
import { MyLayout } from '@components/Layout';
import { useInitTab } from '@hooks/use-initialize';
// 장기계약 등록 페이지 컴포넌트
// 주석추가 - 등록 페이지 구조 이해
const CreateLong: NextPage = () => {
    // 로그인 정보(권한 조회 후 업데이트) 및 소속 정보
    const { loggedInUser, orgas } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    // 탭 추가 - ASIDE_MENU에 없는 경우 수동으로 추가 필요
    useInitTab('장기계약 등록');
    // default~ - 셀렉트 박스 기본 값 설정
    const defaultOrga = findSelectOption(
        loggedInUser.user_info.orga_idx,
        orgas,
    );

    return (
        <>
            <Head>
                <title>우리인슈맨라이프</title>
            </Head>
            <MyLayout>
                <LongForm
                    mode="create"
                    defaultUserid={loggedInUser.userid}
                    defaultOrga={defaultOrga}
                />
            </MyLayout>
        </>
    );
};
// 서버사이드에서 필요한 정보 요청 및 처리
export const getServerSideProps = wrapper.getServerSideProps(
    // 권한 조회 미들웨어
    // 실패 시 로그인 페이지로 이동
    permissionMiddleware(async ({ dispatch, sagaTask }) => {
        // 조직 목록 API 요청
        dispatch(getOrgasRequest({}));
        // Finance Company(long-use) API 요청
        dispatch(getCompaniesRequest('long-use'));
        // 요청 종료 설정
        dispatch(END);
        // 요청이 끝날 때 까지 대기
        await sagaTask?.toPromise();

        return null;
    }),
);

export default CreateLong;
