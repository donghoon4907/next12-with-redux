import type { FC } from 'react';
import type { CoreTabOption } from '@interfaces/core';

interface Props extends CoreTabOption {
    /**
     * 활성화 여부
     */
    isActive?: boolean;
    /**
     * 클릭 이벤트
     */
    onClick: (tab: CoreTabOption) => void;
    /**
     * 숨김 여부
     */
    hidden?: boolean;
}

export const MyTab: FC<Props> = ({
    id,
    panelId,
    label = 'label props were not passed',
    isActive = true,
    hidden,
    onClick,
}) => {
    return (
        <li className={`wr-tab ${isActive ? 'active' : ''}`} hidden={hidden}>
            <button
                type="button"
                className="wr-tab__link single"
                onClick={() => onClick({ id, panelId, label })}
                id={id}
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
            >
                {label}
            </button>
        </li>
    );
};
