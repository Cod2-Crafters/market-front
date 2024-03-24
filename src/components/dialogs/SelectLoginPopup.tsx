'use client';

import Icon from '../icons/Icon';
import { HeadText } from '../texts/HeadText';
import { Button } from '../ui/button';

import { IOpenDialog } from '@/app';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';

type LoginPopupProps = {
    setDialogInfo: Dispatch<SetStateAction<IOpenDialog>>;
};

const SelectLoginPopup = ({ setDialogInfo, ...props }: LoginPopupProps) => {
    const [registerStep, setRegisterStep] = useState<number>(1);
    const pathName = usePathname();
    return (
        <>
            {/* common popup */}
            <div
                className={cn(
                    'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-2/4 overflow-x-hidden overflow-y-hidden rounded-lg bg-white shadow-2xl',
                    'p-20'
                )}
            >
                <button
                    className="w-full text-right"
                    onClick={(event) => {
                        //setIsOpenDialog(false);
                        //setRegisterStep(registerStep == 2 ? 1 : 2);
                        setDialogInfo((prev) => {
                            return { contentType: 'emptyNode', isOpen: false };
                        });
                    }}
                >
                    <Icon icon="ph:x" width={24} height={24} />
                </button>

                <>
                    <div>
                        <div className="flex flex-col items-center">
                            <Image className="mb-30" src="/images/logo.svg" alt="logo" width={79} height={16} />
                            <HeadText size={'xl'} className="text-black">
                                <b>스피닛으로 중고거래 시작하기</b>
                            </HeadText>
                            <p className="mb-16">간편하게 가입하고 상품을 확인하세요</p>
                        </div>
                        <div className="py-10">
                            <ul className="flex flex-col gap-8 px-10">
                                <li>
                                    <Button size={'full'} variant={'outline'}>
                                        <b className="text-md">카카오 로그인</b>
                                    </Button>
                                </li>
                                <li>
                                    <Button size={'full'} variant={'outline'}>
                                        <b className="text-md">페이스북 로그인</b>
                                    </Button>
                                </li>
                                <li>
                                    <Button size={'full'} variant={'outline'}>
                                        <b className="text-md">네이버 로그인</b>
                                    </Button>
                                </li>
                                <li>
                                    <Button
                                        size={'full'}
                                        variant={'outline'}
                                        onClick={() => {
                                            setDialogInfo({ contentType: 'login', isOpen: true });
                                        }}
                                    >
                                        <b className="text-md">본인 인증 로그인</b>
                                    </Button>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-30 border-b border-black" />
                    </div>

                    <p className="my-16 px-4 text-center text-md">
                        도움이 필요하면 이메일 또는 고객센터0000-0000로 문의 부탁드립니다.
                        <br />
                        고객센터 운영시간: 09~18시 (점심시간 12~13시, 주말/공휴일 제외)
                    </p>
                </>
            </div>
        </>
    );
};

export default SelectLoginPopup;
