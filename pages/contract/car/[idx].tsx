import type { NextPage } from 'next';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { CarState } from '@reducers/car';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { wrapper } from '@store/redux';
import { permissionMiddleware } from '@utils/middleware/permission';
import carsService from '@services/carsService';
import { getCompaniesRequest } from '@actions/hr/get-companies';
import { findSelectOption } from '@utils/getter';
import longConstants from '@constants/options/long';
import carConstants from '@constants/options/car';
import { createUserHistory } from '@actions/common/set-user-history.action';
import { createInsured } from '@actions/contract/common/set-insured.action';
import { createPay } from '@actions/contract/long/set-pay.action';
import { getOrgasRequest } from '@actions/hr/get-orgas';
// import { createContact } from '@actions/common/set-contact.action';
import { updateProduct } from '@actions/contract/common/set-product.action';
import { MyLayout } from '@components/Layout';
import { CarForm } from '@partials/contract/car/CarForm';
import { birthdayToAge, residentNumToAge } from '@utils/calculator';
import { useInitCustomer, useInitTab } from '@hooks/use-initialize';

const Car: NextPage<CarState> = ({ car }) => {
    const { carUseCompanies } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    // 탭 설정
    useInitTab(`자동차계약상세${car.c_name ? ` - ${car.c_name}` : ''}`);
    // 계약자 설정
    useInitCustomer(car.c_idx);

    const defaultComp = findSelectOption(car.wcode, carUseCompanies);

    const defaultPreComp = findSelectOption(car.pre_wcode, carUseCompanies);

    const defaultStatus = findSelectOption(car.status, longConstants.status);

    const defaultBodesc = findSelectOption(car.bo_desc, carConstants.shortDist);

    const defaultInsu = findSelectOption(car.insu, carConstants.dist);

    const defaultRate = findSelectOption(car.rate, carConstants.cGrade);

    const defaultCycle = findSelectOption(car.cycle, carConstants.payMethod);

    const defaultCarfamily = findSelectOption(
        car.carfamily,
        carConstants.driverRange,
    );

    const defaultCarage = findSelectOption(car.carage, carConstants.minAge);

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
                <CarForm
                    mode="update"
                    idx={car.idx}
                    defaultUserid={car.userid}
                    defaultComp={defaultComp}
                    defaultPreComp={defaultPreComp}
                    defaultCnum={car.cnum}
                    defaultPreCnum={car.pre_cnum}
                    defaultTitle={car.title}
                    defaultContdate={car.contdate}
                    defaultBodatefrom={car.bo_datefrom}
                    defaultBodateto={car.bo_dateto}
                    defaultBodesc={defaultBodesc}
                    defaultStatus={defaultStatus}
                    defaultSpec={car.spec}
                    defaultIsConfirm={car.confirm ? 'Y' : 'N'}
                    defaultInsu={defaultInsu}
                    defaultRate={defaultRate}
                    defaultCycle={defaultCycle}
                    defaultCarfamily={defaultCarfamily}
                    defaultCarage={defaultCarage}
                />
            </MyLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    permissionMiddleware(async ({ dispatch, sagaTask }, ctx) => {
        const { query } = ctx;

        const idx = query.idx as string;

        dispatch(getOrgasRequest({}));

        dispatch(getCompaniesRequest('car-use'));

        const output: any = {
            props: {},
        };

        try {
            dispatch(END);

            await sagaTask?.toPromise();

            const { data } = await carsService.getCar({ idx });

            const car = data.data;

            output.props.car = car;

            dispatch(
                updateProduct({
                    p_code: car.p_code,
                    title: car.title,
                    spec: car.spec,
                    subcategory: null,
                    cal_spec: car.cal_spec,
                }),
            );

            if (car.userid_his) {
                for (let i = 0; i < car.userid_his.length; i++) {
                    dispatch(
                        createUserHistory({
                            index: i,
                            checked: false,
                            gdate: car.userid_his[i].gdate,
                            group: car.userid_his[i].group,
                            userid: car.userid_his[i].userid,
                            username: car.userid_his[i].fcname,
                        }),
                    );
                }
            }

            if (car.p_persons) {
                for (let i = 0; i < car.p_persons.length; i++) {
                    let age = null;
                    if (car.p_persons[i].dist === '주피보험자') {
                        if (car.p_persons[i].jumin) {
                            age = residentNumToAge(car.p_persons[i].jumin);
                        }
                    } else {
                        if (car.p_persons[i].birthday) {
                            age = birthdayToAge(
                                new Date(car.p_persons[i].birthday),
                            );
                        }
                    }

                    if (age) {
                        age -= 1;
                    }

                    dispatch(
                        createInsured({
                            ...car.p_persons[i],
                            index: i,
                            checked: false,
                            age,
                        }),
                    );
                }
            }

            if (car.pays) {
                for (let i = 0; i < car.pays.length; i++) {
                    dispatch(
                        createPay({
                            index: i,
                            checked: false,
                            idx: car.pays[i].idx,
                            paydate: car.pays[i].paydate,
                            dist: car.pays[i].dist,
                            pay: car.pays[i].pay,
                            insert_datetime: car.pays[i].insert_datetime,
                            insert_userid: car.pays[i].insert_userid,
                        }),
                    );
                }
            }

            // if (general.contacts) {
            //     for (let i = 0; i < general.contacts.length; i++) {
            //         dispatch(
            //             createContact({
            //                 ...general.contacts[i],
            //                 index: i,
            //                 checked: false,
            //             }),
            //         );
            //     }
            // }
        } catch (e) {
            console.log(e);
            // output.redirect = {
            //     destination: '/404',
            //     permanent: true, // true로 설정하면 301 상태 코드로 리다이렉션
            // };
        }

        return output;
    }),
);

export default Car;
