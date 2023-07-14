import type { NextPage } from 'next';
import type { CreatePostRequestPayload } from '@actions/board/create-post.action';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { MyLayout } from '@components/Layout';
import { WithLabel } from '@components/WithLabel';
import { MyButton } from '@components/button';
import { MyFooter } from '@components/footer';
import { MySelect } from '@components/select';
import { BoardState } from '@reducers/board';
import { AppState } from '@reducers/index';
import { MyInput } from '@components/input';
import { UploadState } from '@reducers/upload';
import { MyCheckbox } from '@components/checkbox';
import { BOARD_SETTING_TABS } from '@constants/tab';
import { MyTab } from '@components/tab';
import { SetBodysTabpanel } from '@partials/board/tabpanels/SetBody';
import { CoreSelectOption, CoreTabOption } from '@interfaces/core';
import { SetFileTabpanel } from '@partials/board/tabpanels/SetFile';
import variables from '@styles/_variables.module.scss';
import { SetViewTabpanel } from '@partials/board/tabpanels/SetView';
import { SetViewerModal } from '@components/modal/SetViewer';
import { wrapper } from '@store/redux';
import { getOrgasRequest } from '@actions/hr/get-orgas';
import { END } from 'redux-saga';
import { getFcsRequest } from '@actions/hr/get-fcs';
import { ORGA_RANK } from '@constants/selectOption';
import { useApi } from '@hooks/use-api';
import { createPostRequest } from '@actions/board/create-post.action';
import { useInput } from '@hooks/use-input';
import { convertEscapeHtml } from '@utils/converter';

const CreateBoard: NextPage = () => {
    const create = useApi(createPostRequest);

    const { uploadedFiles } = useSelector<AppState, UploadState>(
        (props) => props.upload,
    );

    const { viewer } = useSelector<AppState, BoardState>(
        (props) => props.board,
    );

    const tabBodyRef = useRef<HTMLDivElement>(null);
    // 선택된 탭
    const [tab, setTab] = useState<CoreTabOption>(BOARD_SETTING_TABS[0]);
    // 에디터 내용
    const [content, setContent] = useState<string>('');
    // 업로드 파일 목록
    const [files, setFiles] = useState<File[]>([]);
    // 에디터 높이
    const [editorHeight, setEditorHeight] = useState(-1);
    // 제목
    const title = useInput('');
    // 부서
    const [orga, setOrga] = useState<CoreSelectOption | null>(ORGA_RANK[0]);
    // 태그
    const tag = useInput('');

    const handleClickTab = (tab: CoreTabOption) => {
        setTab(tab);
    };

    const handleChangeOrga = (org: CoreSelectOption | null) => {
        setOrga(org);
    };

    const handleSubmit = () => {
        if (title.value === '') {
            return alert('제목을 입력하세요.');
        }

        const tf = confirm('입력하신 정보로 게시물을 등록하시겠습니까?');

        if (tf) {
            const payload: CreatePostRequestPayload = {
                wcode: '0',
                type: '공지',
                orga_rank: 1,
                title: title.value,
                body: convertEscapeHtml(content),
                commentable: false,
                pushable: false,
                topfix: false,
            };

            if (uploadedFiles.length > 0) {
                payload['attach'] = uploadedFiles.map((v) => ({
                    original: v.file.name as string,
                    savefile: v.filename as string,
                    inbody: false,
                }));
            }

            if (viewer.length > 0) {
                payload['viewonly'] = viewer.map((v) => v.userid);
            }

            if (tag.value !== '') {
                payload['tags'] = tag.value;
            }

            create(payload);
        }
    };

    useEffect(() => {
        // 에디터의 크기 설정
        if (tabBodyRef.current) {
            const tabBodyeight = tabBodyRef.current.offsetHeight;

            const gutterSize = +variables.gutterSize.split('px')[0] * 2;

            setEditorHeight(tabBodyeight - gutterSize);
        }
    }, []);

    return (
        <>
            <Head>
                <title>게시물등록</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <MyLayout>
                <div className="wr-pages-create-board">
                    <div className="wr-pages-create-board__header">
                        <div className="row">
                            <div className="col-6">
                                <WithLabel
                                    id="title"
                                    label="제목"
                                    type="active"
                                >
                                    <MyInput
                                        type="text"
                                        id="rtitle"
                                        placeholder="입력"
                                        {...title}
                                    />
                                </WithLabel>
                            </div>
                            <div className="col-3">
                                <div className="wr-ml">
                                    <WithLabel
                                        id="orga"
                                        label="부서"
                                        type="active"
                                    >
                                        <MySelect
                                            inputId="orga"
                                            options={ORGA_RANK}
                                            value={orga}
                                            onChange={handleChangeOrga}
                                            placeholder="선택"
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="wr-ml">
                                    <WithLabel
                                        id="tag"
                                        label="태그"
                                        type="active"
                                    >
                                        <MyInput
                                            type="text"
                                            id="tag"
                                            placeholder="쉼표(,)를 이용하여 복수 입력"
                                            {...tag}
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wr-pages-create-board__body wr-mt">
                        <ul className="wr-tab__wrap" role="tablist">
                            {BOARD_SETTING_TABS.map((v) => (
                                <MyTab
                                    key={v.id}
                                    onClick={handleClickTab}
                                    isActive={v.id === tab.id}
                                    {...v}
                                />
                            ))}
                            <li className="wr-tab__line"></li>
                        </ul>
                        <div
                            className="wr-pages-create-board__tabbody"
                            ref={tabBodyRef}
                        >
                            <SetBodysTabpanel
                                hidden={tab.id !== 'tabSetBody'}
                                content={content}
                                setContent={setContent}
                                editorHeight={editorHeight}
                            />
                            <SetFileTabpanel
                                hidden={tab.id !== 'tabSetFile'}
                                setFiles={setFiles}
                            />
                            <SetViewTabpanel hidden={tab.id !== 'tabSetView'} />
                        </div>
                    </div>
                    <MyFooter>
                        <div className="wr-pages-detail__footer">
                            <div className="wr-pages-create-board__optionitem">
                                <span>
                                    <MyCheckbox
                                        id="commentable"
                                        label="댓글 허용"
                                    />
                                </span>
                                <span>
                                    <MyCheckbox
                                        id="pubshable"
                                        label="알림 여부"
                                    />
                                </span>
                            </div>
                            <div>
                                <MyButton
                                    type="button"
                                    className="btn-primary"
                                    onClick={handleSubmit}
                                >
                                    등록
                                </MyButton>
                            </div>
                        </div>
                    </MyFooter>
                </div>
            </MyLayout>
            <SetViewerModal />
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    ({ dispatch, sagaTask }) =>
        async (_) => {
            dispatch(
                getOrgasRequest({
                    idx: '1',
                }),
            );

            dispatch(
                getFcsRequest({
                    idx: '1',
                }),
            );

            dispatch(END);

            await sagaTask?.toPromise();

            return {
                props: {},
            };
        },
);

export default CreateBoard;
