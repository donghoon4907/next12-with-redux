import type { NextPage } from 'next';
import type { LongState } from '@reducers/long';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import longsService from '@services/longsService';
import { TabModule } from '@utils/storage';
import { initTab } from '@actions/tab/tab.action';
import { getCompaniesRequest } from '@actions/hr/get-companies';
import { findSelectOption, findSelectOptionByLabel } from '@utils/getter';
import { LongForm } from '@partials/contract/long/LongForm';
import longConstants from '@constants/options/long';
import { createUserHistory } from '@actions/common/set-user-history.action';

const Long: NextPage<LongState> = ({ long }) => {
    // console.log(long);
    const dispatch = useDispatch();

    const { longUseCompanies } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const defaultComp = findSelectOption(long.wcode, longUseCompanies);

    const defaultPayCycle = findSelectOption(
        long.pay_cycle,
        longConstants.payCycle,
    );

    // const defaultPayDu = findSelectOption(long.pay_du, longConstants.payDu);

    const defaultStatus = findSelectOption(long.status, longConstants.status);

    const defaultPstatus = findSelectOption(
        long.pay_status,
        longConstants.pStatus,
    );

    // const log = long.log.map((v: any) => ({
    //     ...v,
    //     remark: v.content.remark,
    //     body: ['button', '보기', () => handleShowHistory(v.content.body)],
    // }));

    useEffect(() => {
        // 탭 추가
        const tab = new TabModule();

        const to = `/contract/long/${long.idx}`;
        if (!tab.read(to)) {
            tab.create({
                id: to,
                label: `장기계약상세 - ${long.c_name}`,
                to,
            });
        }

        dispatch(initTab(tab.getAll()));
    }, [dispatch, long]);

    return (
        <>
            <Head>
                <title>장기계약상세</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <LongForm
                mode="update"
                defaultUserid={long.userid}
                defaultComp={defaultComp}
                defaultCnum={long.cnum}
                defaultTitle={long.title}
                defaultContdate={long.contdate}
                defaultBodateto={long.bo_dateto}
                defaultPayCycle={defaultPayCycle}
                defaultPayDateto={long.pay_dateto}
                // defaultPayDu={defaultPayDu}
                defaultStatus={defaultStatus}
                defaultPstatus={defaultPstatus}
                defaultStatusDate={long.status_date}
                defaultLastMonth={long.lastmonth}
                defaultLastWhoi={long.lastwhoi}
                defaultProductType={long.product_type}
                defaultSubCategory={long.subcategory}
                defaultIsConfirm={long.confirm}
                defaultCalSpec={long.cal_spec}
                defaultPayment={long.payment.toString()}
                defaultTp={long.tp.toString()}
            />
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask }, ctx) => {
        const { query } = ctx;

        const cidx = query.cidx as string;

        dispatch(getCompaniesRequest('long-use'));

        const output: any = {
            props: {},
        };

        try {
            dispatch(END);

            await sagaTask?.toPromise();

            const { data } = await longsService.getLong({ cidx });

            const long = data.data;

            output.props.long = long;

            if (long.userid_his) {
                for (let i = 0; i < long.userid_his.length; i++) {
                    dispatch(
                        createUserHistory({
                            ...long.userid_his[i],
                            username: long.userid_his[i].fcname,
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

export default Long;
