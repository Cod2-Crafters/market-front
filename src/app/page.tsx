'use client';

import initMocks from '@/services/mocks';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    initMocks();
    console.log('init Mocks');
}

console.log('page init1');

export default function Home() {
    // const [reviews, setReviews] = useState<string[] | null>(null);

    // const handleGetReviews = () => {
    //     // Client-side request are mocked by `mocks/browser.ts`.
    //     fetch('/Linkpi/users')
    //         .then((res) => res.json())
    //         .then((data) => console.log('outputdata', data));
    // };

    return (
        <>
            <div className="min-w-[1236px]">
                <header className="m-auto flex w-full max-w-screen-lg flex-1 flex-col">
                    <nav className="flex flex-1 justify-between border-b border-neutral-500">
                        <ul className="flex space-x-5">
                            <li>앱다운로드</li>
                            <li>즐겨찾기</li>
                        </ul>
                        <ul className="flex space-x-5">
                            <li>로그인</li>
                            <li>회원가입</li>
                            <li>고객센터</li>
                        </ul>
                    </nav>
                    <nav className="flex flex-1 justify-between py-2">
                        <Link href="/">
                            <Image src="/images/logo.svg" alt="logo" width={148} height={42} />
                        </Link>
                        {/* searchbar - 검색 시 main content 변겨앟는 방식으로 구현 */}
                        <div className="flex min-w-[400px] items-center border-2 border-primary px-1  ">
                            <input className="w-full flex-1 border-2" placeholder="상품명, 지역명,@상점명 입력" />
                            <div>
                                <Icon className="text-secondary" icon="ic:baseline-search" width={32} height={32} />
                            </div>
                        </div>
                        <div>
                            <ul className="flex w-full items-center space-x-3">
                                {/* 전부 main content가 변경하는 방식으로 구현하기 */}
                                <li>
                                    {/* 판매하기 - /products/new */}
                                    <Link href="#">
                                        <Icon
                                            className="text-primary"
                                            icon="healthicons:money-bag"
                                            width={40}
                                            height={40}
                                        />
                                    </Link>
                                </li>
                                <li>
                                    {/* 찜 목록 - /shop/{shopid(userid)}/favorites */}
                                    <Link href="#">
                                        <Icon className="text-primary" icon="mdi:heart-outline" width={40} height={0} />
                                    </Link>
                                </li>
                                <li>
                                    {/* 번개톡 - 추후 구현 */}
                                    <Link href="#">
                                        <Icon className="text-primary" icon="zondicons:chat-bubble-dots" width={32} />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="flex items-center justify-between">
                        <div>
                            <Icon icon="cil:hamburger-menu" width={34} height={34} />
                        </div>
                        <div className="color-white rounded-full bg-primary px-4 py-1 text-white">판매하기</div>
                    </div>
                </header>
                <main className="flex flex-col items-center justify-between">
                    {/* 메인페이지 광고 영역  */}
                    <div className="flex h-24 w-full bg-zinc-700">main ads</div>
                    <div className="m-auto flex h-48 w-full max-w-screen-lg flex-col bg-orange-600">main content</div>
                </main>
                <footer className="m-auto flex h-24 w-full max-w-screen-lg flex-col bg-orange-300">
                    이 영역은 푸터입니다
                </footer>
            </div>
        </>
    );
}
