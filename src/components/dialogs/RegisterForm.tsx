'use client';

import Icon from '../icons/Icon';
import { HeadText } from '../texts/HeadText';
import { Button } from '../ui/button';
import { Form, FormControl, FormField } from '../ui/form';
import { HintInput } from '../ui/hintinput';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface RegisterFormProps {
    onRegisterFinish: (registerName: string) => void;
}

interface IRegisterFormData {
    email: string;
    realName: string;
    phone: string;
    password: string;
    isExistEmail: string;
    shopName?: string | undefined;
    description?: string | undefined;
}

type TResponseError = {
    status: number;
    message: string;
    validation: Record<string, string>;
};

async function isExistEmail(inputEmail: string) {
    if (inputEmail.length == 0) return true;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/email-check?` +
            new URLSearchParams({
                value: inputEmail,
            })
    );
    console.log(res);
    // errorCode: 200 => 중복X
    // errorCode: 409 => 중복O
    if (res.status !== 200) {
        return true; // error
    } else {
        return false;
    }
}

const RegisterForm = ({ onRegisterFinish, ...props }: RegisterFormProps) => {
    const [errorMessages, setErrorMessages] = useState<Array<string>>([]);
    const registerForm = useForm<IRegisterFormData>({
        defaultValues: {
            email: '',
            isExistEmail: '',
            realName: '',
            password: '',
            phone: '',
        },
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<IRegisterFormData> = async (data) => {
        console.log('handlesubmit', registerForm.formState.errors);

        data.description = `${data.realName}의 상점`;
        data.shopName = 'shop-' + dayjs().unix().toString();

        // console.log('submit and fetch json data', JSON.stringify(data));

        const res = fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.status == 201) {
                    alert('success register!');
                    onRegisterFinish(data.realName);
                    //router.replace('/');
                } else {
                    alert('error message!');
                    console.log('then->');
                    const jsonData = response.json() as Promise<TResponseError>;
                    console.log('response json data:', jsonData);
                    return jsonData;
                }
            })
            .then((errorMessage) => {
                console.log('error json:', errorMessage);
                const errorMessageList: string[] = [];
                for (const errorKey in errorMessage?.validation) {
                    console.log('>>', errorMessage?.validation[errorKey]);
                    errorMessageList.push(errorMessage?.validation[errorKey]);
                }
                setErrorMessages(() => errorMessageList);
            });
    };

    return (
        <>
            <div className="flex justify-between">
                <HeadText size="2xl" className="text-black">
                    <b>회원가입</b>
                </HeadText>
            </div>
            <Form {...registerForm}>
                <form className="flex flex-col gap-20" onSubmit={registerForm.handleSubmit(onSubmit)}>
                    <FormField
                        control={registerForm.control}
                        name="isExistEmail"
                        rules={{
                            validate: {
                                noConfirmEmail: (value) => {
                                    return value !== '' || '* 이메일 중복검사가 진행되지 않았습니다.';
                                },
                            },
                        }}
                        render={({ field, fieldState, formState }) => (
                            <FormControl>
                                <>
                                    <input type="hidden" {...field} />
                                </>
                            </FormControl>
                        )}
                    />

                    <div className="flex flex-col ">
                        <FormField
                            control={registerForm.control}
                            name="email"
                            rules={{
                                required: '* 이메일은 필수입력입니다.',
                            }}
                            render={({ field, fieldState, formState }) => (
                                <FormControl>
                                    <>
                                        <HintInput
                                            inputType="text"
                                            caption="이메일"
                                            placeholder="username@google.com"
                                            {...field}
                                            onBlur={async () => {
                                                const resultExist: boolean = (await isExistEmail(field.value)) || false;
                                                registerForm.setValue('isExistEmail', resultExist.toString(), {
                                                    shouldValidate: true,
                                                });
                                                field.onBlur();

                                                // isExistEmail(field.value).then((existStatus) => {
                                                //     registerForm.setValue('isExistEmail', existStatus.toString(), {
                                                //         shouldValidate: true,
                                                //     });
                                                //     field.onBlur();
                                                // });
                                                // field.onBlur();
                                            }}
                                            isError={fieldState.error !== undefined}
                                        />
                                        {registerForm.getValues('isExistEmail') == 'false' && (
                                            <p className="flex items-center gap-4 px-2 text-primary">
                                                <span className="absolute flex h-[12px] w-[12px] scale-125 items-center rounded-full ring-1 ring-primary " />
                                                <Icon icon={'ic:round-check'} width={14} height={14} />
                                                <span>이메일 중복 확인 완료.</span>
                                            </p>
                                        )}
                                    </>
                                </FormControl>
                            )}
                        />
                    </div>

                    <FormField
                        control={registerForm.control}
                        name="realName"
                        rules={{
                            validate: (value) => {
                                return 3 <= value.length || '* 성함은 최소 3글자 입력해야 합니다.';
                            },
                        }}
                        render={({ field, fieldState, formState }) => (
                            <FormControl>
                                <>
                                    <HintInput
                                        inputType="onlytext"
                                        caption="성함"
                                        //name="email"
                                        // value={registerFormData?.email}
                                        placeholder="홍OO"
                                        {...field}
                                        isError={fieldState.error !== undefined}
                                    />
                                </>
                            </FormControl>
                        )}
                    />

                    <FormField
                        control={registerForm.control}
                        name="phone"
                        render={({ field, fieldState, formState }) => (
                            <FormControl>
                                <>
                                    <HintInput
                                        inputType="phone"
                                        caption="전화번호"
                                        placeholder="010-0000-0000(숫자만 입력)"
                                        {...field}
                                    />
                                </>
                            </FormControl>
                        )}
                    />

                    <FormField
                        control={registerForm.control}
                        name="password"
                        rules={{
                            validate: (value) => {
                                return 4 <= value.length || '* 비밀번호는 최소 4글자 입력해야 합니다.';
                            },
                        }}
                        render={({ field, fieldState, formState }) => (
                            <FormControl>
                                <>
                                    <HintInput type="password" inputType="text" caption="비밀번호" {...field} />
                                </>
                            </FormControl>
                        )}
                    />

                    {/* <HintInput
                    inputType="text"
                    caption="이메일"
                    // name="email"
                    value={registerFormData?.email}
                    placeholder="username@google.com"
                    // onChange={handleRegisterInputOnChange}
                    {...register('email', {
                        required: '이메일은 필수입력입니다.',
                        // 4글자 이하로 입력해야 작동 됨
                        minLength: { value: 4, message: '이메일은 최소 4글자로 설정해주세요' },
                        onChange: handleRegisterInputOnChange,
                    })}
                /> */}
                    <div>
                        {registerForm.formState.errors.isExistEmail && (
                            <p className="text-error">{registerForm.formState.errors.isExistEmail?.message}</p>
                        )}
                        {registerForm.formState.errors.email && (
                            <p className="text-error">{registerForm.formState.errors.email?.message}</p>
                        )}
                        {registerForm.formState.errors.realName && (
                            <p className="text-error">{registerForm.formState.errors.realName?.message}</p>
                        )}
                        {registerForm.formState.errors.password && (
                            <p className="text-error">{registerForm.formState.errors.password?.message}</p>
                        )}

                        {errorMessages.map((errorMessage) => {
                            return (
                                <p key={errorMessage} className="text-error">
                                    * {errorMessage}
                                </p>
                            );
                        })}
                    </div>

                    <Button
                        size={'full'}
                        className="h-[56px]"
                        type="submit"
                        onClick={(event) => {
                            //onRegisterFinish(registerForm.getValues('realName'));
                            //event.preventDefault();
                        }}
                    >
                        가입하기
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default RegisterForm;
