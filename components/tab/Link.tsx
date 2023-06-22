import type { FC, MouseEvent } from 'react';
import type { CoreLinkTabOption } from '@interfaces/core';
import { useRouter } from 'next/router';
import { MdClose } from 'react-icons/md';
import { IconWrapper } from '@components/IconWrapper';
import variables from '@styles/_variables.module.scss';

interface Props extends CoreLinkTabOption {
    /**
     * 확장 여부
     */
    isExpand?: boolean;
    /**
     * 클릭 이벤트
     */
    onClick?: (tabId: string) => void;
    /**
     * 클릭 이벤트
     */
    onClose?: (tabId: string) => void;
}

export const LinkTab: FC<Props> = ({
    id,
    label = 'label props were not passed',
    to,
    isExpand,
    onClick,
    onClose,
}) => {
    const router = useRouter();

    const isActive = router.pathname === to;

    const handleClick = (evt: MouseEvent<HTMLAnchorElement>) => {
        evt.preventDefault();

        if (isActive) {
            return;
        }

        onClick?.(id);

        router.push(to);
    };

    const handleClose = (evt: MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();

        onClose?.(id);
    };

    return (
        <li
            className={`wr-tab ${router.pathname === to ? 'active' : ''}`}
            role="tab"
        >
            <a
                className={`wr-tab__link ${isExpand ? '' : 'single'}`}
                aria-current="page"
                href={to}
                onClick={handleClick}
                tabIndex={isActive ? 0 : -1}

                // aria-controls={panelId}
            >
                {label}
            </a>
            {isExpand && (
                <div className="wr-tab__icon">
                    <IconWrapper
                        onClick={handleClose}
                        tabIndex={isActive ? 0 : -1}
                    >
                        <span className="a11y-hidden">탭 닫기</span>
                        <MdClose
                            size={13}
                            color={
                                router.pathname === to
                                    ? 'black'
                                    : variables.disableFontColor
                            }
                        />
                    </IconWrapper>
                </div>
            )}
        </li>
    );
};
