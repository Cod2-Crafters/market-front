'use client';

import userLoginMember from '../../hooks/Members/useLoginMember';
import Icon from '../icons/Icon';
import { HeadText } from '../texts/HeadText';
import { Button } from '../ui/button';
import { Form, FormControl, FormField } from '../ui/form';
import { HintInput } from '../ui/hintinput';

import { setMember } from '@/features/members/memberSlice';
import { cn } from '@/lib/utils';
import { IOpenDialog } from '@/types/Dialogs';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type LoginPopupProps = {
    setDialogInfo: Dispatch<SetStateAction<IOpenDialog>>;
};

interface ILoginFailResponse {
    status: number;
    message: string;
}

interface ILoginSuccessResponse {
    accessToken: string;
    refreshToken: string;
}

interface ILoginInputFormData {
    email: string;
    password: string;
}

interface MyInfoResponse {
    // response
    id: number;
    email: string;
    loginType: string;
    shopName: string;
    description: string;
    logoPath: null;
    realName: string;
    phone: string;
    createdAt: string;
    modifiedAt: string;
}

const LoginPopup = ({ setDialogInfo, ...props }: LoginPopupProps) => {
    const { dispatchLoginUserInfo, isLoginMember } = userLoginMember();
    // api call
    const getMyInfo = async (accessToken: string | null, bodyData: Object | null) => {
        const responseJson: MyInfoResponse = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/auth/myinfo`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken || 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNSIsImVtYWlsIjoidGVzdDNAdGVzdC5jb20iLCJpYXQiOjE3MTA4MjI1NjQsImV4cCI6MTcxMTY4NjU2NH0.Gl5JxjnEyz6vBSWUE4O9Y9HG6uEif1Ge01-TEaktbtY'}`,
            },
            body: (bodyData && JSON.stringify(bodyData)) || null,
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('토큰이 유효하지 않습니다.');
            }
        });
        return responseJson;
    };

    const loginForm = useForm<ILoginInputFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<ILoginInputFormData> = async (data, event) => {
        if (event) {
            event.preventDefault && event.preventDefault();
            event.persist && event.persist();
        }
        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
            cache: 'no-cache',
        })
            .then(async (response) => {
                console.log('login response status:', response.status.toString());
                return {
                    responseStatus: response.status,
                    data: await response.json(),
                };
            })
            .then(async (json) => {
                if (json.responseStatus == 401) {
                    // is error login
                    const failData: ILoginFailResponse = json.data;
                    //setErrorMessages(['아이디 및 비밀번호가 옳바르지 않습니다.']);
                    loginForm.setError('email', { type: 'custom', message: '아이디 및 비밀번호가 올바르지 않습니다.' });
                    loginForm.setError('password', {
                        type: 'custom',
                        message: '',
                    });
                } else if (json.responseStatus == 200) {
                    // is success login
                    console.log('success Token Data', json.data);

                    const successData: ILoginSuccessResponse = json.data;
                    localStorage.clear();
                    localStorage.setItem('accessToken', successData.accessToken);
                    localStorage.setItem('refreshToken', successData.refreshToken);

                    loginForm.clearErrors();

                    const loginUserJson = await getMyInfo(successData.accessToken, null);
                    console.log('getMyInfoResponseJson', loginUserJson);

                    const loginUser: LoginUserState = {
                        ...loginUserJson,
                        loginType: 'BASIC',
                        loginToken: {
                            accessToken: successData.accessToken,
                            refreshToken: successData.refreshToken,
                        },
                    };
                    dispatchLoginUserInfo(
                        setMember({
                            loginUser,
                        })
                    );

                    if (loginUserJson.id && loginUserJson.id !== 0) {
                        setDialogInfo((prev) => {
                            return { contentType: 'emptyNode', isOpen: false };
                        });
                    }
                }
            });
    };
    return (
        <>
            <Form {...loginForm}>
                <form
                    onSubmit={loginForm.handleSubmit(onSubmit)}
                    onKeyDown={(event) => {
                        if (event.key == 'enter') {
                            event.preventDefault();
                        }
                    }}
                >
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
                                        <b>로그인</b>
                                    </HeadText>
                                </div>
                                <div className="py-10"></div>
                            </div>
                            <div className="flex flex-col gap-4 py-10">
                                <>
                                    <FormField
                                        control={loginForm.control}
                                        name="email"
                                        rules={{
                                            required: '이메일이 입력되지 않았습니다.',
                                        }}
                                        render={({ field, fieldState, formState }) => (
                                            <FormControl>
                                                <HintInput
                                                    caption="이메일"
                                                    inputType="text"
                                                    type="text"
                                                    id="input-email"
                                                    isError={formState.errors.email !== undefined}
                                                    {...field}
                                                ></HintInput>
                                            </FormControl>
                                        )}
                                    ></FormField>
                                </>

                                <>
                                    <FormField
                                        control={loginForm.control}
                                        name="password"
                                        rules={{
                                            required: '비밀번호가 입력되지 않았습니다.',
                                        }}
                                        render={({ field, fieldState, formState }) => (
                                            <FormControl>
                                                <HintInput
                                                    caption="비밀번호"
                                                    inputType="text"
                                                    type="password"
                                                    id="input-password"
                                                    isError={formState.errors.password !== undefined}
                                                    {...field}
                                                ></HintInput>
                                            </FormControl>
                                        )}
                                    ></FormField>
                                </>
                            </div>
                            {Object.values(loginForm.formState.errors).map((item) => {
                                if (item.message && 0 < item.message?.length) {
                                    return (
                                        <p className="text-error" key={item.message}>
                                            * {item.message}
                                        </p>
                                    );
                                }
                            })}

                            <Button type="submit" size={'full'} className="my-10">
                                로그인
                            </Button>
                        </>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default LoginPopup;
