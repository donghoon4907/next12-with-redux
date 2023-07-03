import { MyCheckbox } from '@components/checkbox';
import type { NextPage } from 'next';
import Head from 'next/head';
import { FaUser, FaKey, FaPowerOff, FaHeadset } from 'react-icons/fa';

const Login: NextPage = () => {
    const displayName = 'wr-pages-login';

    return (
        <>
            <Head>
                <title>우리인슈맨라이프 - 로그인</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <div className={`${displayName}__wrap`}>
                <div className={`${displayName}`}>
                    <div className={`${displayName}__left`}>
                        <img
                            src="/static/images/main.png"
                            alt="Wooriinsumanlife"
                        />
                    </div>
                    <div className={`${displayName}__right`}>
                        <div className={`${displayName}__header`}>
                            <div className={`${displayName}__secret`}>
                                대외비
                            </div>
                        </div>
                        <form className={`${displayName}__body`}>
                            <div className="wr-login-input__wrap">
                                <div className="wr-login-input__icon">
                                    <FaUser size={30} />
                                </div>
                                <input
                                    type="text"
                                    className="wr-login-input"
                                    placeholder="사원번호"
                                    required
                                />
                            </div>
                            <div className="wr-login-input__wrap">
                                <div className="wr-login-input__icon">
                                    <FaKey size={30} />
                                </div>
                                <input
                                    type="password"
                                    className="wr-login-input"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <div className="wr-login-btn__wrap">
                                <button type="submit" className="wr-login-btn">
                                    로그인
                                </button>
                                <div className="wr-login-btn__icon">
                                    <FaPowerOff size={25} />
                                </div>
                            </div>
                        </form>
                        <div className={`${displayName}__services`}>
                            <div>
                                <MyCheckbox
                                    id="saveId"
                                    label="사원번호 또는 ID 저장"
                                />
                            </div>
                            <div className={`${displayName}__expand`}>
                                <a href="#" className={`${displayName}__reset`}>
                                    비밀번호 초기화
                                </a>
                            </div>
                        </div>
                        <div className={`${displayName}__phone`}>
                            <div>
                                <FaHeadset size={25} />
                            </div>
                            <div>Help Desk 070-4881-6003</div>
                        </div>
                        <div className={`${displayName}__footer`}>
                            <span>
                                우리인슈맨라이프 사용자를 위한 시스템으로
                                인가된분만 사용가능합니다.
                            </span>
                            <br />
                            <span>
                                Copyrightⓒ by Wooriinsumanlife Co., Ltd. All
                                rights reserved
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;