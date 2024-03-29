import type { NextPage } from 'next';
import type { HrState } from '@reducers/hr';
import type { AppState } from '@reducers/index';
import type { OrgaState } from '@reducers/orga';
import type { UserState } from '@reducers/user';
import { useSelector } from 'react-redux';
import { wrapper } from '@store/redux';
import { pageMiddleware } from '@utils/middleware/page';
import { getCompaniesRequest } from '@actions/hr/get-companies.action';
import orgasService from '@services/orgasService';
import { createCode } from '@actions/hr/set-code.action';
import { findSelectOption } from '@utils/getter';
import { MyLayout } from '@components/Layout';
import { useInitTab } from '@hooks/use-initialize';
import commonConstants from '@constants/options/common';
import orgaConstants from '@constants/options/orga';
import { OrgaForm } from '@partials/orga/OrgaForm';
import { getUsersRequest } from '@actions/user/get-users.action';
import { convertPhoneNumber } from '@utils/converter';
import { getOrgasRequest } from '@actions/orga/get-orgas.action';
import { MyHelmet } from '@components/Helmet';

const Orga: NextPage<any> = ({ orga }) => {
    const { banks, wrCompanies } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const { orgas } = useSelector<AppState, OrgaState>((state) => state.orga);

    const { users } = useSelector<AppState, UserState>((state) => state.user);

    // 탭 설정
    useInitTab(`조직명세 - ${orga.orga_name}`);

    const defaultOrgaRank = findSelectOption(
        orga.orga_rank,
        orgaConstants.grade,
    );

    const defaultUpperIdx = findSelectOption(orga.upper_idx, orgas);

    const defaultManager = findSelectOption(orga.manager_id, users);

    const defaultStatus = findSelectOption(orga.status, orgaConstants.status);

    const defaultBank = findSelectOption(orga.income_bank, banks);

    const defaultIncomeTax = findSelectOption(
        orga.income_tax ? 'Y' : 'N',
        commonConstants.yn,
    );

    let defaultDno;
    let defaultDcom;
    let defaultDindate;
    let defaultDoutdate;
    let defaultDmanager;
    let defaultLno;
    let defaultLcom;
    let defaultLindate;
    let defaultLoutdate;
    let defaultLmanager;
    if (orga.associate && orga.associate.length > 0) {
        for (let i = 0; i < orga.associate.length; i++) {
            const { type, no, wcode, indate, outdate, manager_id } =
                orga.associate[i];

            if (type === '손보') {
                defaultDno = no;

                if (wcode) {
                    defaultDcom = findSelectOption(wcode, wrCompanies);
                }

                defaultDindate = indate;
                defaultDoutdate = outdate;
                defaultDmanager = findSelectOption(manager_id, users);
            } else if (type === '생보') {
                defaultLno = no;

                if (wcode) {
                    defaultLcom = findSelectOption(wcode, wrCompanies);
                }

                defaultLindate = indate;
                defaultLoutdate = outdate;
                defaultLmanager = findSelectOption(manager_id, users);
            }
        }
    }

    return (
        <>
            <MyHelmet />
            <MyLayout>
                <OrgaForm
                    mode="update"
                    idx={orga.idx}
                    defaultOrgaRank={defaultOrgaRank}
                    defaultUpperIdx={defaultUpperIdx}
                    defaultManager={defaultManager}
                    defaultStatus={defaultStatus}
                    defaultName={orga.orga_name}
                    defaultIndate={orga.indate}
                    defaultOutdate={orga.outdate}
                    defaultTel={orga.tel ? convertPhoneNumber(orga.tel) : ''}
                    defaultFax={orga.fax ? convertPhoneNumber(orga.fax) : ''}
                    defaultPostCode={orga.postcode}
                    defaultAddress1={orga.address1}
                    defaultAddress2={orga.address2}
                    defaultAddress3={orga.address3}
                    defaultBank={defaultBank}
                    defaultIncomeName={orga.income_name}
                    defaultIncomeAccount={orga.income_account}
                    defaultIncomeTax={defaultIncomeTax}
                    defaultDno={defaultDno}
                    defaultDcom={defaultDcom}
                    defaultDindate={defaultDindate}
                    defaultDoutdate={defaultDoutdate}
                    defaultDmanager={defaultDmanager}
                    defaultLno={defaultLno}
                    defaultLcom={defaultLcom}
                    defaultLindate={defaultLindate}
                    defaultLoutdate={defaultLoutdate}
                    defaultLmanager={defaultLmanager}
                />
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    pageMiddleware(async ({ dispatch, sagaTask }, ctx) => {
        const { query } = ctx;

        const idx = query.idx as string;

        dispatch(getCompaniesRequest('bank'));

        dispatch(getCompaniesRequest('woori'));

        dispatch(getUsersRequest({ idx: '1' }));

        const output: any = {
            props: {},
        };

        try {
            const { data } = await orgasService.getOrga({ idx });

            output.props.orga = data;

            dispatch(getOrgasRequest({ rate: data.orga_rank }));

            if (data.insucode) {
                for (let i = 0; i < data.insucode.length; i++) {
                    dispatch(
                        createCode({
                            ...data.insucode[i],
                            index: i,
                            checked: false,
                        }),
                    );
                }
            }
        } catch {
            output.redirect = {
                destination: '/404',
                permanent: true, // true로 설정하면 301 상태 코드로 리다이렉션
            };
        }

        return output;
    }),
);

export default Orga;
