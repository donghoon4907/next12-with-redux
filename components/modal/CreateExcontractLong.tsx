import type { FC } from 'react';
import type { Excontract } from '@models/excontract';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { CustomerState } from '@reducers/customer';
import type { HrState } from '@reducers/hr';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useSelect } from '@hooks/use-select';
import { useInput, useNumbericInput } from '@hooks/use-input';
import { useDatepicker } from '@hooks/use-datepicker';
import { hideCreateExcontractModal } from '@actions/modal/create-excontract.action';
import { isEmpty } from '@utils/validator/common';
import { createExcontract } from '@actions/customer/set-excontract.action';
import { generateIndex } from '@utils/generate';
import { FloatSelect } from '@components/select/Float';
import { FloatInput } from '@components/input/Float';
import { FloatDatepicker } from '@components/datepicker/Float';

interface Props {}

export const CreateExcontractLongModal: FC<Props> = () => {
    const dispatch = useDispatch();

    const { isShowCreateExcontractLongModal } = useSelector<
        AppState,
        ModalState
    >((state) => state.modal);

    const { longViewCompanies } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const { excontracts } = useSelector<AppState, CustomerState>(
        (state) => state.customer,
    );

    // 보험사
    const [comp] = useSelect(longViewCompanies, null);
    // 상품명
    const [title] = useInput('');
    // 세부보종
    const [subcategory] = useInput('', { noSpace: true });
    // 보험료
    const [pay] = useNumbericInput('', { addComma: true });
    // 계약일자
    const [contdate] = useDatepicker(null);
    // 비고
    const [remark] = useInput('');

    const handleClose = () => {
        dispatch(hideCreateExcontractModal('long'));
    };

    const handleSubmit = () => {
        const tf = confirm('입력한 내용대로 설정하시겠습니까?');
        if (tf) {
            const payload = createPayload();

            dispatch(createExcontract(payload));

            handleClose();
        }
    };

    const createPayload = () => {
        const payload: Excontract = {
            spe: 'long',
            index: generateIndex(excontracts),
            wcode: +comp.value!.value,
            wname: comp.value!.label,
            checked: false,
        };

        if (!isEmpty(title.value)) {
            payload['title'] = title.value;
        }

        if (!isEmpty(subcategory.value)) {
            payload['subcategory'] = subcategory.value;
        }

        if (!isEmpty(pay.value)) {
            payload['pay'] = +pay.value.replace(/,/g, '');
        }

        if (!isEmpty(contdate.value)) {
            payload['contdate'] = dayjs(contdate.value).format('YYYY-MM-DD');
        }

        if (!isEmpty(remark.value)) {
            payload['remark'] = remark.value;
        }

        return payload;
    };

    return (
        <Modal
            isOpen={isShowCreateExcontractLongModal}
            toggle={handleClose}
            size="lg"
        >
            <ModalHeader toggle={handleClose}>타사 장기보험 추가</ModalHeader>
            <ModalBody className="wr-pages-detail__applydatepicker">
                <div className="row">
                    <div className="flex-fill">
                        <FloatSelect label="보험사" {...comp} />
                    </div>
                    <div className="flex-fill">
                        <FloatInput label="상품명" {...title} />
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="flex-fill">
                        <FloatInput label="세부보종" {...subcategory} />
                    </div>
                    <div className="flex-fill">
                        <FloatInput label="보험료" isNumber {...pay} />
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="flex-fill">
                        <FloatDatepicker label="법인설립일" hooks={contdate} />
                    </div>
                    <div className="flex-fill">
                        <FloatInput label="비고" {...remark} />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={handleClose}>
                    취소
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                    등록
                </Button>
            </ModalFooter>
        </Modal>
    );
};
