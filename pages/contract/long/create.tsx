import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { OrgaState } from '@reducers/orga';
import type { UserState } from '@reducers/user';
import { useSelector } from 'react-redux';
import { wrapper } from '@store/redux';
import { pageMiddleware } from '@utils/middleware/page';
import { getCompaniesRequest } from '@actions/hr/get-companies.action';
import { LongForm } from '@partials/long/LongForm';
import { getOrgasRequest } from '@actions/orga/get-orgas.action';
import { findSelectOption } from '@utils/getter';
import { MyLayout } from '@components/Layout';
import { MyHelmet } from '@components/Helmet';
// 장기계약 등록 페이지 컴포넌트
// 주석추가 - 등록 페이지 구조 이해
const CreateLong: NextPage = () => {
    // 소속 정보
    const { orgas } = useSelector<AppState, OrgaState>((state) => state.orga);
    // 로그인 정보(권한 조회 후 업데이트)
    const { loggedInUser } = useSelector<AppState, UserState>(
        (state) => state.user,
    );
    // default~ - 셀렉트 박스 기본 값 설정
    const defaultOrga = findSelectOption(
        loggedInUser.user_info.orga_idx,
        orgas,
    );

    return (
        <>
            <MyHelmet />
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
    pageMiddleware(async ({ dispatch }) => {
        // 조직 목록 API 요청
        dispatch(getOrgasRequest({}));
        // Finance Company(long-use) API 요청
        dispatch(getCompaniesRequest('long-use'));

        return null;
    }),
);

export default CreateLong;
