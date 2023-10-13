import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineFolder, AiOutlinePoweroff } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
// import { LuMenu } from 'react-icons/lu';
import { GNBS } from '@constants/gnb';
// import { useDrawer } from '@hooks/use-drawer';

import { AppState } from '@reducers/index';
import { HrState } from '@reducers/hr';
import { WithLabel } from '@components/WithLabel';
import { MySelect } from '@components/select';
import commonConstants from '@constants/options/common';
import { SearchInput } from '@components/input/Search';

import { GnbMenuItem } from './GnbMenuItem';
import { GnbSubMenuItem } from './GnbSubMenuItem';
import { HeaderNav } from './Nav';
import { useSelect } from '@hooks/use-select';
import { MyInput } from '@components/input';
import { LuSearch } from 'react-icons/lu';
import { FaPowerOff } from 'react-icons/fa';

interface Props {}

export const MyHeader: FC<Props> = () => {
    const { loggedInUser } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    // const { onToggle } = useDrawer();

    const [dCompanies] = useSelect(commonConstants.dCompanies, null, {
        callbackOnChange: (nextSelect) => {
            if (nextSelect) {
                // 새 창에서 URL 열기
                window.open(nextSelect.value, '_blank');
            }
        },
    });

    const [lCompanies] = useSelect(commonConstants.lCompanies, null, {
        callbackOnChange: (nextSelect) => {
            if (nextSelect) {
                // 새 창에서 URL 열기
                window.open(nextSelect.value, '_blank');
            }
        },
    });

    return (
        <header className="wr-header wr-frame__header">
            <div className="wr-meta">
                {/* <div className="wr-meta__inner">
                    <div className="wr-meta__left">
                        <div style={{ width: 250 }}>
                            <WithLabel
                                id="shortcut_d"
                                label="손보바로가기"
                                type="active"
                            >
                                <MySelect
                                    inputId="shortcut_d"
                                    {...dCompanies}
                                />
                            </WithLabel>
                        </div>
                        <div style={{ width: 250 }}>
                            <WithLabel
                                id="shortcut_l"
                                label="생보바로가기"
                                type="active"
                            >
                                <MySelect
                                    inputId="shortcut_l"
                                    {...lCompanies}
                                />
                            </WithLabel>
                        </div>
                    </div>
                    <div className="wr-meta__right">
                        {loggedInUser && (
                            <>
                                <span className="wr-meta__department">
                                    {loggedInUser.user_info.fulls}
                                </span>
                                <div className="wr-meta__username">
                                    {loggedInUser.user_info.name}&nbsp;
                                    {loggedInUser.user_info.title}
                                </div>
                                <div className="wr-meta__log">
                                    <span>
                                        접속시간:&nbsp;
                                        {
                                            loggedInUser.connection_info
                                                .datetime
                                        }{' '}
                                        &nbsp;
                                    </span>
                                    <span>
                                        접속IP:&nbsp;
                                        {loggedInUser.connection_info.ip}
                                    </span>
                                </div>
                            </>
                        )}

                        <div className="wr-meta__search">
                            <SearchInput
                                id="menu_search"
                                placeholder="메뉴 검색"
                                style={{ fontSize: 14 }}
                            />
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="wr-gnb">
                <div className="wr-gnb__inner">
                    <div className="wr-gnb__both">
                        <nav className="wr-gnb__left">
                            {/* <span onClick={onToggle}>
                                <IconWrapper>
                                    <LuMenu size={30} color="white" />
                                </IconWrapper>
                            </span> */}
                            {/* <h2 className="visually-hidden">서비스메뉴</h2>
                            <ul className="wr-gnb__menu" role="menubar">
                                {GNBS.map(({ id, ...gnb }) => (
                                    <GnbMenuItem key={id} {...gnb} />
                                ))}
                            </ul> */}
                        </nav>
                        <div className="wr-gnb__right">
                            <h2 className="visually-hidden">사용자서비스</h2>
                            <ul className="wr-gnb__services">
                                <GnbSubMenuItem to="/404">
                                    통합검색
                                </GnbSubMenuItem>
                                <GnbSubMenuItem to="/404">
                                    주요연락처
                                </GnbSubMenuItem>
                                <GnbSubMenuItem to="/board/list">
                                    게시판
                                    {/* <div className="wr-badge__wrap">
                                        <span>게시판</span>
                                        <span className="badge bg-danger">
                                            23
                                        </span>
                                    </div> */}
                                </GnbSubMenuItem>
                                <GnbSubMenuItem to="/calendar">
                                    일정관리
                                </GnbSubMenuItem>
                                <GnbSubMenuItem to="/404">
                                    SMS/Fax
                                </GnbSubMenuItem>
                                <GnbSubMenuItem to="/404">
                                    Mypage
                                </GnbSubMenuItem>
                            </ul>
                            <div className="wr-gnb__search">
                                <div className="wr-gnb__input">
                                    <input
                                        type="text"
                                        placeholder="메뉴 검색"
                                    />
                                </div>
                                <div className="wr-gnb__button">
                                    <button type="button">
                                        <span className="visually-hidden">
                                            검색
                                        </span>
                                        <LuSearch
                                            size={15}
                                            style={{ color: 'white' }}
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className="wr-gnb__logout">
                                <FaPowerOff size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wr-lnb">
                <div className="wr-lnb__inner">
                    <strong className="visually-hidden">탭 목록</strong>
                    <HeaderNav />
                    <div className="wr-tab__line"></div>
                </div>
            </div>
        </header>
    );
};
