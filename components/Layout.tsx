import type { CoreMenuOption, CoreProps } from '@interfaces/core';
import type { FC, ReactNode } from 'react';

import { MyNav } from './nav';
import { MyHeader } from './header';

interface Props extends CoreProps {
    menu: CoreMenuOption[];
    footer: ReactNode;
}

export const MyLayout: FC<Props> = ({ children, menu, footer }) => {
    return (
        <div className="row">
            <div className="col-1">
                <MyNav menu={menu} />
            </div>
            <div className="col-11">
                <MyHeader />
                <section>
                    <div className="wr-main__wrap">
                        <main className="wr-main">
                            <div className="wr-main__inner">{children}</div>
                        </main>
                        <footer className="wr-footer">{footer}</footer>
                    </div>
                </section>
            </div>
        </div>
    );
};