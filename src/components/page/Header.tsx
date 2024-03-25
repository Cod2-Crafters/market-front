'use client';

import ModalOverlay from '../dialogs/ModalOverlay';
import Icon from '../icons/Icon';

import { memberinitialState, setMember } from '@/features/members/memberSlice';
import userLoginMember from '@/hooks/Members/useLoginMember';
import { useAppDispatch } from '@/hooks/rtkHooks';
import { IOpenDialog } from '@/types/Dialogs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type THeader = {};

const Header = (props: THeader) => {
    const [dialogInfo, setDialogInfo] = useState<IOpenDialog>({ contentType: 'emptyNode', isOpen: false });
    const { dispatchLoginUserInfo, isLoginMember } = userLoginMember();
    const loginUserDispatch = useAppDispatch();

    const router = useRouter();
    const handleLogout = () => {
        // logout
        dispatchLoginUserInfo(setMember(memberinitialState));

        window.location.replace('/');
        localStorage.clear();
    };

    const handleLoginPopup = () => {
        // show login dialog
        setDialogInfo({ contentType: 'selectLoginType', isOpen: true });
    };

    const handleRegisterPopup = () => {
        setDialogInfo({ contentType: 'registerForm', isOpen: true });
    };

    return (
        <>
            <header className="m-auto flex w-full max-w-screen-lg flex-1 flex-col">
                <nav className="flex flex-1 justify-between border-b border-neutral-500 px-20 text-black">
                    <ul className="flex space-x-20">
                        <li>앱다운로드</li>
                        <li>즐겨찾기</li>
                    </ul>
                    <ul className="flex space-x-20">
                        {isLoginMember() == false ? (
                            <li className="cursor-pointer" onClick={handleLoginPopup}>
                                로그인
                            </li>
                        ) : (
                            <li className="cursor-pointer" onClick={handleLogout}>
                                로그아웃
                            </li>
                        )}

                        <li className="cursor-pointer" onClick={handleRegisterPopup}>
                            회원가입
                        </li>
                        <li>고객센터</li>
                    </ul>
                </nav>
                <nav className="flex flex-1 items-center justify-between px-20 py-12">
                    <Link href="/">
                        <Image src="/images/logo.svg" alt="logo" width={79} height={16} />
                    </Link>
                    {/* searchbar - 검색 시 main content 변겨앟는 방식으로 구현 */}
                    <div className="flex min-w-[400px] items-center border-2 border-primary px-1  ">
                        <input className="w-full flex-1 border-2" placeholder="상품명, 지역명,@상점명 입력" />
                        <div>
                            <Icon className="text-secondary" icon="ic:baseline-search" width={32} height={32} />
                        </div>
                    </div>
                    <div>
                        <ul className="flex w-full items-center space-x-20">
                            {/* 전부 main content가 변경하는 방식으로 구현하기 */}
                            <li>
                                {/* 판매하기 - /products/new */}
                                <Link href="#">
                                    <Icon icon="bx:user" width={40} height={40} />
                                </Link>
                            </li>
                            <li>
                                {/* 찜 목록 - /shop/{shopid(userid)}/favorites */}
                                <Link href="#">
                                    <Icon icon="uil:heart" width={32} />
                                </Link>
                            </li>
                            <li>
                                {/* 번개톡 - 추후 구현 */}
                                <Link href="#">
                                    {/* <Icon className="text-primary" icon="zondicons:chat-bubble-dots" width={32} /> */}
                                    <Icon icon="mingcute:message-3-line" width={32} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="flex items-center justify-between px-20">
                    <div>
                        <Icon icon="cil:hamburger-menu" width={34} height={34} />
                    </div>
                    <div className="color-white rounded-full bg-primary px-4 py-1 text-white">판매하기</div>
                </div>
                {dialogInfo?.isOpen && <ModalOverlay setDialogInfo={setDialogInfo} {...dialogInfo} />}
            </header>
            <hr className="mt-16" />
        </>
    );
};

export default Header;
