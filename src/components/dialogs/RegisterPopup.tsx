'use client';

import Icon from '../icons/Icon';
import { HeadText } from '../texts/HeadText';
import { Button } from '../ui/button';
import RegisterForm from './RegisterForm';

import { IOpenDialog } from '@/app';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';

type RegisterPopupProps = {
    setDialogInfo: Dispatch<SetStateAction<IOpenDialog>>;
};

const RegisterPopup = ({ setDialogInfo, ...props }: RegisterPopupProps) => {
    const [registerStep, setRegisterStep] = useState<number>(1);
    const [displayName, setDisplayName] = useState<string>('홍길동');
    const pathName = usePathname();

    const FINISH_REGISTER_STEP = 2;

    const onRegisterFinish = (registerName: string) => {
        setDisplayName(registerName);
        setRegisterStep(FINISH_REGISTER_STEP);
    };
    return (
        <>
            <div
                className={cn(
                    'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-2/4 overflow-x-hidden overflow-y-hidden rounded-lg bg-white shadow-2xl',
                    'px-36 pt-30'
                )}
            >
                <button
                    className="w-full text-right"
                    onClick={(event) => {
                        //setDialogInfo(false);
                        //setRegisterStep(registerStep == 2 ? 1 : 2);
                        setDialogInfo((prev) => {
                            return { ...prev, isOpen: false };
                        });
                    }}
                >
                    <Icon icon="ph:x" />
                </button>

                {registerStep == 1 && (
                    <>
                        <div className="h-[610px] w-[400px] ">
                            <RegisterForm onRegisterFinish={onRegisterFinish} />
                        </div>
                    </>
                )}

                {registerStep == 2 && (
                    <>
                        <div className="h-[610px] w-[400px] ">
                            <HeadText size="2xl" className="text-black">
                                <b>
                                    {displayName}님의
                                    <br />
                                    회원가입을 축하합니다.
                                </b>
                            </HeadText>
                            <p className="text-lg">중고 물품을 다양한 방법으로 자유롭게 거래해보세요</p>

                            <Image src={'/images/trade.png'} alt="trade" width={374} height={242} />

                            <Button
                                className="h-[56px] cursor-pointer"
                                size={'full'}
                                onClick={() => {
                                    if (pathName == '/') {
                                        window.location.replace('/');
                                    }
                                }}
                            >
                                시작하기
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default RegisterPopup;
