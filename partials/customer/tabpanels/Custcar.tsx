import type { FC, ChangeEvent } from 'react';
import type { Custcar } from '@models/custcar';
import type { AppState } from '@reducers/index';
import type { CustomerState } from '@reducers/customer';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import type { CreateCustcarModalPayload } from '@actions/modal/create-custcar.action';
import { useDispatch, useSelector } from 'react-redux';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { MyCheckbox } from '@components/checkbox';
import { showCreateCustcarModal } from '@actions/modal/create-custcar.action';
import {
    deleteCustcar,
    updateCustcar,
} from '@actions/customer/set-custcar.action';
import { MyTableToolbar } from '@components/table/Toolbar';

interface Props extends MyTabpanelProps {
    editable: boolean;
}

export const CustcarTabpanel: FC<Props> = ({ id, tabId, hidden, editable }) => {
    const dispatch = useDispatch();

    const { custcars } = useSelector<AppState, CustomerState>(
        (state) => state.customer,
    );

    const filteredCars = custcars.filter((v) => v.p_type === 'car');

    const filteredCusts = custcars.filter((v) => v.p_type === 'gen');

    const handleCreate = (payload: CreateCustcarModalPayload) => {
        dispatch(showCreateCustcarModal(payload));
    };

    const handleAllCheckCars = (evt: ChangeEvent<HTMLInputElement>) => {
        filteredCars.forEach((v) => {
            dispatch(updateCustcar({ ...v, checked: evt.target.checked }));
        });
    };

    const handleAllCheckCusts = (evt: ChangeEvent<HTMLInputElement>) => {
        filteredCusts.forEach((v) => {
            dispatch(updateCustcar({ ...v, checked: evt.target.checked }));
        });
    };

    const handleCheck = (evt: ChangeEvent<HTMLInputElement>, v: Custcar) => {
        dispatch(updateCustcar({ ...v, checked: evt.target.checked }));
    };

    const handleDeleteCars = () => {
        if (filteredCars.findIndex((v) => v.checked) === -1) {
            return alert('삭제할 보유차량을 선택해주세요.');
        }

        filteredCars
            .filter((v) => v.checked)
            .forEach((v) => {
                dispatch(deleteCustcar({ index: v.index }));
            });
    };

    const handleDeleteCusts = () => {
        if (filteredCusts.findIndex((v) => v.checked) === -1) {
            return alert('삭제할 피담보물건을 선택해주세요.');
        }

        filteredCusts
            .filter((v) => v.checked)
            .forEach((v) => {
                dispatch(deleteCustcar({ index: v.index }));
            });
    };

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            {/* <div className="wr-pages-detail__title">
                고객보유차량 및 피담보물건
            </div> */}

            {/* <div className="wr-pages-detail__subtitle wr-mt">
                <strong>보유차량</strong>
                {editable && (
                    <div>
                        <MyButton
                            className="btn-danger btn-sm"
                            onClick={handleDeleteCars}
                        >
                            선택삭제
                        </MyButton>
                    </div>
                )}
            </div> */}
            <div className="row">
                <div className="flex-fill">
                    <MyTableToolbar
                        editable={editable}
                        title="보유차량"
                        onCreate={() => handleCreate('car')}
                        onDelete={handleDeleteCars}
                    />
                    <div className="wr-table--normal">
                        <table className="wr-table table">
                            <thead>
                                <tr>
                                    {editable && (
                                        <th style={{ width: '30px' }}>
                                            <MyCheckbox
                                                label=""
                                                onChange={handleAllCheckCars}
                                            />
                                        </th>
                                    )}

                                    <th style={{ width: '100px' }}>차량번호</th>
                                    <th style={{ width: '100px' }}>차량정보</th>
                                    <th style={{ width: '100px' }}>차명코드</th>
                                    <th style={{ width: '100px' }}>
                                        보험만기일
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        만기안내여부
                                    </th>
                                    <th>비고</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCars.map((v) => (
                                    <tr key={`custcar-car${v.index}`}>
                                        {editable && (
                                            <td>
                                                <MyCheckbox
                                                    label=""
                                                    checked={v.checked}
                                                    onChange={(evt) =>
                                                        handleCheck(evt, v)
                                                    }
                                                />
                                            </td>
                                        )}

                                        <td>
                                            <span>
                                                {v.carnum ? v.carnum : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.carname ? v.carname : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.carcode ? v.carcode : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.bo_dateto
                                                    ? v.bo_dateto
                                                    : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.exp_notice
                                                    ? '안내'
                                                    : '미안내'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.remark ? v.remark : '-'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="flex-fill">
                    <MyTableToolbar
                        editable={editable}
                        title="피담보물건"
                        onCreate={() => handleCreate('cust')}
                        onDelete={handleDeleteCusts}
                    />
                    <div className="wr-table--normal">
                        <table className="wr-table table">
                            <thead>
                                <tr>
                                    {editable && (
                                        <th style={{ width: '30px' }}>
                                            <MyCheckbox
                                                label=""
                                                onChange={handleAllCheckCusts}
                                            />
                                        </th>
                                    )}

                                    <th style={{ width: '100px' }}>피담보물</th>
                                    <th style={{ width: '100px' }}>소재지번</th>
                                    <th style={{ width: '100px' }}>
                                        만기안내여부
                                    </th>
                                    <th>비고</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCusts.map((v) => (
                                    <tr key={`custcar-cust${v.index}`}>
                                        {editable && (
                                            <td>
                                                <MyCheckbox
                                                    label=""
                                                    checked={v.checked}
                                                    onChange={(evt) =>
                                                        handleCheck(evt, v)
                                                    }
                                                />
                                            </td>
                                        )}

                                        <td>
                                            <span>
                                                {v.p_title ? v.p_title : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.p_address
                                                    ? v.p_address
                                                    : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.exp_notice
                                                    ? '안내'
                                                    : '미안내'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.remark ? v.remark : '-'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MyTabpanel>
    );
};
