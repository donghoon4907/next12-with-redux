import type { FC, ChangeEvent } from 'react';
import type { Event } from '@models/event';
import type { AppState } from '@reducers/index';
import type { CustomerState } from '@reducers/customer';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { useDispatch, useSelector } from 'react-redux';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { MyCheckbox } from '@components/checkbox';
import { deleteEvent, updateEvent } from '@actions/customer/set-event.action';
import { showCreateEventModal } from '@actions/modal/create-event.action';
import { MyTableToolbar } from '@components/table/Toolbar';

interface Props extends MyTabpanelProps {
    editable: boolean;
}

export const EventTabpanel: FC<Props> = ({ id, tabId, hidden, editable }) => {
    const dispatch = useDispatch();

    const { events } = useSelector<AppState, CustomerState>(
        (state) => state.customer,
    );

    const handleAllCheck = (evt: ChangeEvent<HTMLInputElement>) => {
        events.forEach((v) => {
            dispatch(updateEvent({ ...v, checked: evt.target.checked }));
        });
    };

    const handleCheck = (evt: ChangeEvent<HTMLInputElement>, v: Event) => {
        dispatch(updateEvent({ ...v, checked: evt.target.checked }));
    };

    const handleCreate = () => {
        dispatch(showCreateEventModal());
    };

    const handleDelete = () => {
        if (events.findIndex((v) => v.checked) === -1) {
            return alert('삭제할 데이터를 선택해주세요.');
        }

        events
            .filter((v) => v.checked)
            .forEach((v) => {
                dispatch(deleteEvent({ index: v.index }));
            });
    };

    const convertSL = (sl: boolean) => {
        let output;
        if (sl) {
            output = '양력';
        } else {
            output = '음력';
        }

        return output;
    };

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                <div className="flex-fill">
                    <MyTableToolbar
                        editable={editable}
                        title="기념일"
                        onCreate={() => handleCreate()}
                        onDelete={handleDelete}
                    />
                    <div className="wr-table--normal">
                        <table className="wr-table table">
                            <thead>
                                <tr>
                                    {editable && (
                                        <th style={{ width: '30px' }}>
                                            <MyCheckbox
                                                label=""
                                                onChange={handleAllCheck}
                                            />
                                        </th>
                                    )}

                                    <th style={{ width: '100px' }}>대상자</th>
                                    <th style={{ width: '100px' }}>
                                        대상자구분
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        기념일내용
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        기념일상세
                                    </th>
                                    <th style={{ width: '100px' }}>기념일</th>
                                    <th style={{ width: '100px' }}>양/음</th>
                                    <th style={{ width: '100px' }}>관리여부</th>
                                    <th>비고</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((v) => (
                                    <tr key={`event${v.index}`}>
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
                                            <span>{v.name ? v.name : '-'}</span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.type_who ? v.type_who : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.title ? v.title : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.description
                                                    ? v.description
                                                    : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.eventdate
                                                    ? v.eventdate
                                                    : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {typeof v.d_type !== 'undefined'
                                                    ? convertSL(v.d_type)
                                                    : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {v.notice ? v.notice : '-'}
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
