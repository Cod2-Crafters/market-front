'use client';

import ToggleGroupButton from '@/components/buttons/ToggleGroupButton';
import CategoryList from '@/components/custom/CategoryList';
import Icon from '@/components/icons/Icon';
import ProductFormTagInput from '@/components/inputs/ProductFormTagInput';
import TextField from '@/components/textfield/TextField';
import DescTextarea from '@/components/texts/DescTextarea';
import ErrorText from '@/components/texts/ErrorText';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField } from '@/components/ui/form';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
import { RadioButtonState } from '@/types/UserInterface';
import { Fragment, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IProductImageInfo {
    imagePath: string;
    isThumbnail: boolean;
}

interface IRegisterProductFormInfo {
    category: CategoryState;
    title: string;
    content: string;
    postImageRequestList: Array<IProductImageInfo>;
    hashTagList: Array<string>;
    price: string;
    address: string;
    deliveryCost: string;
    amount: string;
}

const productStatusRadioData: Array<RadioButtonState> = [
    { id: 'radio1', value: 'new', title: '새 상품(미사용)', desc: '사용하지 않는 새 상품' },
    {
        id: 'radio2',
        value: 'old1',
        title: '사용감 없음',
        desc: '사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음',
    },
    { id: 'radio3', value: 'old2', title: '사용감 적음', desc: '눈에 띄는 흔적이나 얼룩이 약간 있음' },
    { id: 'radio4', value: 'old3', title: '사용감 많음', desc: '눈에 띄는 흔적이나 얼룩이 많이 있음' },
    {
        id: 'radio5',
        value: 'old4',
        title: '고장/파손 상품',
        desc: '기능 이상이나 외관 손상 등으로 수리/수선 필요',
    },
];

interface IFileInfo {
    name: string;
    src: string;
}

export default function ProductsNew() {
    const [imageFileList, setImageFileList] = useState<File[]>([]);
    const [imageDataList, setImageDataList] = useState<IFileInfo[]>([]);
    useEffect(() => {
        for (const imageFile of imageFileList) {
            let fileReader = new FileReader();
            fileReader.onloadend = (event) => {
                console.log('fileonloadend', event);
                console.log('fileReader', fileReader);

                if (fileReader.result) {
                    console.log('FileUploader-result', fileReader.result);
                    setImageDataList(() => [
                        ...imageDataList,
                        { src: fileReader.result as string, name: imageFile.name },
                    ]);
                }
            };
            fileReader.readAsDataURL(imageFile);
        }
    }, [imageFileList]);

    // const [reviews, setReviews] = useState<string[] | null>(null);

    // const handleGetReviews = () => {
    //     // Client-side request are mocked by `mocks/browser.ts`.
    //     fetch('/api/users')ㄷ
    //         .then((res) => res.json())
    //         .then((data) => console.log('outputdata', data));
    // };

    // let categorylist: ICategory[] = await getCategories();

    const productForm = useForm<IRegisterProductFormInfo>({
        defaultValues: {
            category: undefined,
            content: '',
            hashTagList: [],
            postImageRequestList: [],
            price: '',
            title: '',
            deliveryCost: '0',
            amount: '0',
        },
    });
    const onSubmit: SubmitHandler<IRegisterProductFormInfo> = (registerProductData, event) => {};
    const [inputTagText, setInputTagText] = useState<string>('');
    return (
        <>
            {/* <div className="hidden">
                <ProductCardList />
            </div> */}

            <main className="flex min-w-[1236px] flex-col">
                <div className="flex flex-col items-center">
                    {/* 메인페이지 광고 영역  */}
                    {/* <div className="h-24 flex w-full bg-zinc-700">main ads</div> */}

                    {/* 메인 시작 */}
                    <Form {...productForm}>
                        <form
                            className="flex h-96 w-full max-w-screen-lg flex-col"
                            onSubmit={productForm.handleSubmit(onSubmit)}
                        >
                            <div className="flex flex-col">
                                {/* 카메라 */}
                                <>
                                    <div className="flex w-full flex-row flex-nowrap items-start justify-start gap-4">
                                        <div className="relative h-[150px] w-[150px] flex-shrink-0 rounded-xl bg-gray-60">
                                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform  bg-orange-300 text-center">
                                                <Icon
                                                    icon="solar:camera-bold"
                                                    className="text-gray-30"
                                                    width={25}
                                                    height={25}
                                                />
                                                <p className="m-auto text-md text-gray-30">
                                                    {imageDataList.length} / 10
                                                </p>
                                            </div>
                                            {/* 겹침 */}
                                            <div className="absolute block h-full w-full bg-transparent">
                                                <input
                                                    className="h-full w-full cursor-pointer"
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={(event) => {
                                                        const fileList = event.target.files;
                                                        const fileListLength = fileList?.length || 0;
                                                        console.log('totalfiles:', fileList?.length, '개');

                                                        if (fileList && fileList[0]) {
                                                            const files = Array.from(event.target.files || []);

                                                            console.log('files-array', files);

                                                            files.forEach((imageFile) => {
                                                                if (imageFile.type.substring(0, 5) == 'image') {
                                                                    if (!imageFileList.includes(imageFile)) {
                                                                        setImageFileList(() => [
                                                                            ...imageFileList,
                                                                            imageFile,
                                                                        ]);
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex h-full w-full flex-row gap-10 overflow-x-scroll">
                                            {imageDataList.map((imageData, index) => {
                                                return (
                                                    <Fragment key={imageData.src}>
                                                        <div className="relative flex h-[150px] w-[150px] flex-shrink-0 cursor-pointer justify-center overflow-hidden rounded-xl border border-gray-30 ">
                                                            <img className="object-cover" src={imageData.src} />
                                                            <div className="absolute right-4 rounded-2xl  bg-black p-4 text-md text-white">
                                                                대표
                                                            </div>
                                                        </div>
                                                        {/* {imageData && imageData.name} */}
                                                    </Fragment>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </>
                                <FormField
                                    control={productForm.control}
                                    name="title"
                                    rules={{
                                        validate: {
                                            noInputCheck: (value) => {
                                                if (value?.length == 0) {
                                                    return false || '상품명을 입력해주세요';
                                                } else {
                                                    return true;
                                                }
                                            },
                                        },
                                    }}
                                    render={({ field, fieldState, formState }) => (
                                        <FormControl>
                                            <>
                                                {/* <ProductFormNameInput /> */}
                                                <SectionWrapper>
                                                    <TextField
                                                        {...field}
                                                        value={field.value}
                                                        feature="displayTextLength"
                                                        type="text"
                                                        variantType="productRegisterForm"
                                                        placeholder="상품을 입력하세요"
                                                        isError={fieldState.error !== undefined}
                                                        maxLength={40}
                                                        onBlur={() => console.log(productForm.getValues())}
                                                    ></TextField>
                                                    <ErrorText size="md">{fieldState.error?.message}</ErrorText>
                                                </SectionWrapper>
                                            </>
                                        </FormControl>
                                    )}
                                />

                                <FormField
                                    control={productForm.control}
                                    name="category"
                                    rules={{
                                        validate: {
                                            noInputCheck: (value) => {
                                                if (value == undefined || value.name == '') {
                                                    return false || '카테고리를 선택해주세요';
                                                } else {
                                                    return true;
                                                }
                                            },
                                        },
                                    }}
                                    render={({ field, fieldState, formState }) => (
                                        <FormControl>
                                            <>
                                                <SectionWrapper>
                                                    <input
                                                        type="hidden"
                                                        value={field.value?.name || ''}
                                                        onChange={field.onChange}
                                                    />
                                                    <CategoryList name={field.name} selectedCategory={field.value} />
                                                    <ErrorText size="md">{fieldState.error?.message}</ErrorText>
                                                </SectionWrapper>
                                            </>
                                        </FormControl>
                                    )}
                                />

                                <FormField
                                    control={productForm.control}
                                    name="price"
                                    rules={{
                                        validate: {
                                            noInputCheck: (value) => {
                                                if ((Number(value.replaceAll(',', '')) || 0) < 100) {
                                                    return false || '가격을 100원 이상으로 설정해주세요' + value;
                                                } else {
                                                    return true;
                                                }
                                            },
                                        },
                                    }}
                                    render={({ field, fieldState, formState }) => (
                                        <FormControl>
                                            <>
                                                <SectionWrapper>
                                                    <TextField
                                                        {...field}
                                                        feature="inputPrice"
                                                        type="text"
                                                        variantType="productRegisterForm"
                                                        placeholder="가격을 입력하세요"
                                                        isError={fieldState.error !== undefined}
                                                        maxLength={11}
                                                        isUseClearBtn={false}
                                                        innerNodePosition="start"
                                                        innerNode={<span>$</span>}
                                                    ></TextField>
                                                    <ErrorText size="md">{fieldState.error?.message}</ErrorText>
                                                </SectionWrapper>
                                            </>
                                        </FormControl>
                                    )}
                                />

                                <FormField
                                    control={productForm.control}
                                    name="content"
                                    rules={{
                                        validate: {
                                            noInputCheck: (value) => {
                                                if ((value.length || 0) < 10) {
                                                    return '내용이 10글자 이상이어야 합니다.';
                                                } else {
                                                    return false;
                                                }
                                            },
                                        },
                                    }}
                                    render={({ field, fieldState, formState }) => (
                                        <FormControl>
                                            <>
                                                <SectionWrapper>
                                                    <DescTextarea
                                                        isError={fieldState.error !== undefined}
                                                        placeholderComp={
                                                            <p className="text-gray-30">
                                                                <span className="text-lg">
                                                                    구매시기, 브랜드/모델명, 제품의 상태 (사용감, 하자
                                                                    유무) 등을 입력해 주세요. 서로가 믿고 거래할 수
                                                                    있도록, 자세한 정보와 다양한 각도의 상품 사진을
                                                                    올려주세요.
                                                                </span>
                                                                <br />
                                                                <span className="text-sm">
                                                                    * 안전하고 건전한 거래 환경을 위해
                                                                    과학기술정보통신부, 한국인터넷진흥원과
                                                                    태풍마켓(주)가 함께 합니다.
                                                                </span>
                                                            </p>
                                                        }
                                                    />
                                                    <ErrorText size="md">{fieldState.error?.message}</ErrorText>
                                                </SectionWrapper>
                                            </>
                                        </FormControl>
                                    )}
                                />

                                <FormField
                                    control={productForm.control}
                                    name="address"
                                    rules={{
                                        validate: {
                                            noInputCheck: (value) => {
                                                return false;
                                                if (!value || value == '') {
                                                    return false || '주소를 입력하세요';
                                                } else {
                                                    return true;
                                                }
                                            },
                                        },
                                    }}
                                    render={({ field, fieldState, formState }) => (
                                        <FormControl>
                                            <>
                                                <SectionWrapper className="relative">
                                                    <TextField
                                                        {...field}
                                                        feature="none"
                                                        type="text"
                                                        variantType="productRegisterForm"
                                                        placeholder="주소를 입력하세요"
                                                    ></TextField>

                                                    <ErrorText size="md">{fieldState.error?.message}</ErrorText>
                                                </SectionWrapper>
                                            </>
                                        </FormControl>
                                    )}
                                />
                                {/* 
                                <FormField
                                    control={productForm.control}
                                    name="productStatus"
                                    rules={{
                                        validate: {
                                            noInputCheck: (value) => {
                                                return false;
                                                if (!value || value == 'NONE') {
                                                    return false || '주소를 입력하세요';
                                                } else {
                                                    return true;
                                                }
                                            },
                                        },
                                    }}
                                    render={({ field, fieldState, formState }) => (
                                        <FormControl>
                                            <>
                                                <SectionWrapper titleInfo={{ text: '상품 상태', textClass: 'mb-20' }}>
                                                    <RadioGroup
                                                        className="flex flex-col gap-20"
                                                        value={field.value}
                                                        onValueChange={(e) => {
                                                            const value: ProductStatus = e as ProductStatus;
                                                            productForm.setValue(field.name, value);
                                                        }}
                                                    >
                                                        {productStatusRadioData.map((productStatusItem, index) => {
                                                            return (
                                                                <div
                                                                    className="flex items-center gap-4"
                                                                    key={productStatusItem.id}
                                                                >
                                                                    <RadioGroupItem
                                                                        value={productStatusItem.value}
                                                                        id={productStatusItem.id}
                                                                    />
                                                                    <Label
                                                                        className="w-[150px] text-lg "
                                                                        htmlFor={productStatusItem.id}
                                                                    >
                                                                        <b>{productStatusItem.title}</b>
                                                                    </Label>
                                                                    <Label
                                                                        className="text-lg"
                                                                        htmlFor={productStatusItem.id}
                                                                    >
                                                                        {productStatusItem.desc}
                                                                    </Label>
                                                                </div>
                                                            );
                                                        })}
                                                    </RadioGroup>
                                                </SectionWrapper>
                                            </>
                                        </FormControl>
                                    )}
                                />
*/}

                                <FormField
                                    control={productForm.control}
                                    name="hashTagList"
                                    rules={{
                                        validate: {
                                            noInputCheck: (value) => {
                                                return false;
                                                // if ((Number(value) || 0) < 100) {
                                                //     return '상품을 10글자 이상 입력해주세요';
                                                // } else {
                                                //     return false;
                                                // }
                                            },
                                        },
                                    }}
                                    render={({ field, fieldState, formState }) => (
                                        <FormControl>
                                            <>
                                                <SectionWrapper className="relative">
                                                    <ProductFormTagInput
                                                        inputTagText={inputTagText}
                                                        feature={'none'}
                                                        tags={field?.value}
                                                        setInputTagText={setInputTagText}
                                                    />
                                                    <ErrorText size="md">{fieldState.error?.message}</ErrorText>
                                                    <p>
                                                        {field.value &&
                                                            field.value.map((itema) => {
                                                                return <p>{itema}</p>;
                                                            })}
                                                    </p>
                                                </SectionWrapper>
                                            </>
                                        </FormControl>
                                    )}
                                />

                                {/* <FormField
                                    control={productForm.control}
                                    name="tradeStatus"
                                    rules={{
                                        validate: {
                                            noInputCheck: (value) => {
                                                return false;
                                                // if ((Number(value) || 0) < 100) {
                                                //     return '상품을 10글자 이상 입력해주세요';
                                                // } else {
                                                //     return false;
                                                // }
                                            },
                                        },
                                    }}
                                    render={({ field, fieldState, formState }) => (
                                        <FormControl>
                                            <>
                                                <SectionWrapper>
                                                    <ToggleGroupButton
                                                        title="교환"
                                                        items={[
                                                            { value: 'YES', text: '불가' },
                                                            { value: 'NO', text: '가능' },
                                                        ]}
                                                        selectedValue={field.value}
                                                        setValue={(value) => {
                                                            field.onChange(value);
                                                        }}
                                                    />
                                                </SectionWrapper>
                                            </>
                                        </FormControl>
                                    )}
                                /> */}

                                <FormField
                                    control={productForm.control}
                                    name="deliveryCost"
                                    rules={{
                                        validate: {
                                            noInputCheck: (value) => {
                                                return false;
                                                // if ((Number(value) || 0) < 100) {
                                                //     return '상품을 10글자 이상 입력해주세요';
                                                // } else {
                                                //     return false;
                                                // }
                                            },
                                        },
                                    }}
                                    render={({ field, fieldState, formState }) => (
                                        <FormControl>
                                            <>
                                                <SectionWrapper>
                                                    <ToggleGroupButton
                                                        title="배송비"
                                                        items={[
                                                            { value: '0', text: '배송비포함' },
                                                            { value: '1', text: '배송비별도' },
                                                        ]}
                                                        selectedValue={field.value}
                                                        setValue={(value) => {
                                                            field.onChange(value);
                                                        }}
                                                    />
                                                </SectionWrapper>
                                            </>
                                        </FormControl>
                                    )}
                                />

                                <FormField
                                    control={productForm.control}
                                    name="hashTagList"
                                    rules={{
                                        validate: {
                                            noInputCheck: (value) => {
                                                return false;
                                                // if ((Number(value) || 0) < 100) {
                                                //     return '상품을 10글자 이상 입력해주세요';
                                                // } else {
                                                //     return false;
                                                // }
                                            },
                                        },
                                    }}
                                    render={({ field, fieldState, formState }) => (
                                        <FormControl>
                                            <>
                                                <SectionWrapper className="relative">
                                                    <ProductFormTagInput
                                                        inputTagText={inputTagText}
                                                        feature={'none'}
                                                        tags={field?.value}
                                                        setInputTagText={setInputTagText}
                                                    />
                                                    <ErrorText size="md">{fieldState.error?.message}</ErrorText>
                                                    <p>
                                                        {field.value &&
                                                            field.value.map((itema) => {
                                                                return <p>{itema}</p>;
                                                            })}
                                                    </p>
                                                </SectionWrapper>
                                            </>
                                        </FormControl>
                                    )}
                                />

                                <FormField
                                    control={productForm.control}
                                    name="amount"
                                    rules={{
                                        validate: {
                                            noInputCheck: (value) => {
                                                if (value == '' || Number(value) == 0) {
                                                    return false || '수량은 1개 이상 입력해주세요';
                                                } else {
                                                    return true;
                                                }
                                            },
                                        },
                                    }}
                                    render={({ field, fieldState, formState }) => (
                                        <FormControl>
                                            <>
                                                <SectionWrapper className="w-[250px]">
                                                    <TextField
                                                        {...field}
                                                        feature="inputPrice"
                                                        type="text"
                                                        variantType="productRegisterForm"
                                                        placeholder="수량을 입력하세요"
                                                        isError={fieldState.error !== undefined}
                                                        maxLength={5}
                                                        isUseClearBtn={false}
                                                        innerNodePosition="end"
                                                        innerNode={<span className="text-gray-30">개</span>}
                                                    ></TextField>
                                                    <ErrorText size="md">{fieldState.error?.message}</ErrorText>
                                                </SectionWrapper>
                                            </>
                                        </FormControl>
                                    )}
                                />

                                <br />
                                <hr />

                                <br />
                            </div>
                            <div className="flex justify-end gap-5">
                                <Button type="submit" size={'lg'}>
                                    임시저장
                                </Button>
                                <Button type="submit" size={'lg'}>
                                    등록하기
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </main>
        </>
    );
}
