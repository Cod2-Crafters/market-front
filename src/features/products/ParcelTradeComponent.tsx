'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProductDetail, ProductImage, ProductMember } from "@/types/Product";
import { useEffect, useState } from "react";
// import imp from "iamport-server-api";
// import { IIamportCardPayment } from "iamport-server-api/lib/structures/IIamportCardPayment";
// import { IIamportPayment } from "iamport-server-api/lib/structures/IIamportPayment";
// import { IIamportResponse } from "iamport-server-api/lib/structures/IIamportResponse";

const IMP_UID = process.env.NEXT_PUBLIC_IMP_UID ?? "";

const ParcelTradeComponent: React.FC<{ detailData: ProductDetail }> = ({ detailData }) => {
    const ProductInfo: ProductDetail = detailData;
    const { title, price, modifyedAt, content, hashtagList, bookmarkCount, views, id } = ProductInfo;

    const ProductMember: ProductMember = ProductInfo.member;
    const ProductImageList: ProductImage[] = ProductInfo.imageList;
    const images = ProductImageList.map((item: ProductImage) => process.env.NEXT_PUBLIC_API_HOST + item.imagePath);
    const formattedPrice = formatPrice(price);
    function formatPrice(price: number): string {
        return new Intl.NumberFormat().format(price);
    }

    const [selectedOption, setSelectedOption] = useState('');

    // 결제 옵션 목록
    const paymentOptions = [
        { id: 'tosspay', name: '토스페이' },
        { id: 'kakaopay', name: '카카오페이' },
        { id: 'payco', name: '페이코' },
        { id: 'mobile', name: '휴대폰 결제' },
        { id: 'bank', name: '무통장 (가상계좌)' },
        { id: 'convenience', name: '편의점결제' },
    ];

    // 결제 옵션 선택 핸들러
    const handleSelectOption = (optionId: string) => {
        console.log(optionId);
        setSelectedOption(optionId);
    };

    // 커넥터 정보 구성, 토큰 만료시 자동으로 갱신해 줌
    // const connector: imp.IamportConnector = new imp.IamportConnector
    //     (
    //         "http://127.0.0.1:10851",
    //         {
    //             imp_key: "test_imp_key",
    //             imp_secret: "test_imp_secret"
    //         }
    //     );



    useEffect(() => {
        const jquery = document.createElement("script");
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";

        const iamport = document.createElement("script");
        iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.8.js";

        document.head.appendChild(jquery);
        document.head.appendChild(iamport);

        return () => {
            document.head.removeChild(jquery);
            document.head.removeChild(iamport);
        };
    }, []);

    const payment = () => {
        if (typeof window !== undefined) {
            const { IMP } = window;
            if (IMP) {
                IMP.init(IMP_UID);

                IMP.request_pay({
                    //pg: 'kakaopay.TC0ONETIME', // PG사 코드표에서 선택
                    pg: 'kakaopay.TC0ONETIME', // PG사 코드표에서 선택
                    pay_method: 'card', // 결제 방식
                    merchant_uid: "IMP" + `${IMP_UID}` + Math.floor(Math.random() * 100), // 결제 고유 번호
                    name: `${title}`, // 제품명
                    amount: 100, // 가격
                    //구매자 정보 ↓
                    buyer_email: `kjw88887@gmail.com`,
                    buyer_name: `jayce`,
                    // buyer_tel : '010-1234-5678',
                    // buyer_addr : '서울특별시 강남구 삼성동',
                    // buyer_postcode : '123-456'
                }, async function (rsp: any) { // callback
                    if (rsp.success) { //결제 성공시
                        console.log(rsp);
                        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        //결제 성공시 프로젝트 DB저장 요청
                        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                        const response = {
                            status: 200
                        }; // 테스트

                        // DB저장 성공시
                        if (response.status == 200) {
                            alert('결제 완료!')
                            fetch(process.env.NEXT_PUBLIC_API_HOST + `/api/post/${id}`, {
                                method: 'PATCH', body: JSON.stringify({
                                    "postStatus": "SOLD_OUT"
                                })
                            })//Math.floor(Math.random() * 100)
                                .then((res) => {
                                    console.log(res);
                                })
                            window.location.reload();
                        }
                        // 결제완료 후 DB저장 실패시
                        else {
                            alert(`error:[${response.status}]\n결제요청이 승인된 경우 관리자에게 문의바랍니다.`);
                            // DB저장 실패시 status에 따라 추가적인 작업 가능성
                        }
                        // 결제 실패시
                    } else if (rsp.success == false) {
                        alert(rsp.error_msg)
                    }
                });
            }
        }

    }

    // const { IMP } = window;


    return <>
        <div className="mt-[50px]"><div className="w-4/5 mx-auto">
            <div className="w-full flex flex-col text-left p-[15px]">
                <p className="font-bold text-[20px]">
                    택배거래
                </p>
                <div className="flex pt-[20px]">
                    <div>
                        <img src={images[0]} className="w-[64px] h-[64px]" />
                    </div>
                    <div className="pl-[20px]">
                        <p>
                            {title}
                        </p>
                        <p>
                            {formattedPrice}원
                        </p>
                    </div>
                </div>
                <div className="h-[50px] border-b-[1px] border-solid flex justify-items-end items-center" />
                <div className="pt-[10px]">
                    {/* <p className="font-bold text-[15px]">
                        배송지
                    </p>
                    <Card className="w-full">
                        <CardHeader>
                            <CardDescription>Deploy your new project in one-click.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                    </div>
                                    <div className="flex flex-col space-y-1.5">

                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card> */}
                </div>
                <div className="pt-[10px]">
                    <p className="font-bold text-[15px]">
                        결제 수단
                    </p>
                    <RadioGroup defaultValue="comfortable">
                        <div className="flex items-center space-x-2 mt-[10px]">
                            <RadioGroupItem value="default" id="r1" />
                            <Label htmlFor="r1" className="pl-[15px]">태풍마켓 간편결제</Label>
                        </div>
                        <div className="flex items-center space-x-2 mt-[10px]">
                            <RadioGroupItem value="comfortable" id="r2" />
                            <Label htmlFor="r2" className="pl-[15px]">N페이</Label>
                        </div>
                        <div className="flex items-center space-x-2 mt-[10px]">
                            <RadioGroupItem value="compact" id="r3" />
                            <Label htmlFor="r3" className="pl-[15px]">일반결제</Label>
                        </div>
                    </RadioGroup>
                    <div className="mt-[20px] w-full flex flex-col space-y-4">
                        <div className="flex flex-wrap -mx-2"> {/* 버튼 사이의 간격을 조정하기 위해 mx-2를 사용 */}
                            {paymentOptions.map((option, index) => (
                                <div className="px-2 py-2 w-1/3" key={option.id}> {/* px-2로 버튼 간 간격을 조정 */}
                                    <Button
                                        variant="outline"
                                        className={`w-full py-2 text-sm border h-[50px] ${selectedOption === option.id ? 'bg-secondary text-black border-blue-500' : 'bg-white text-black'}`}
                                        onClick={() => handleSelectOption(option.id)}
                                    >
                                        {option.name}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="pt-[10px]">
                        <Card className="w-full bg-gray-80 h-[70px]">
                            <CardHeader className="p-[10px]">
                                <CardDescription>
                                    이용 안내
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid w-full items-center gap-4 pl-[20px]">
                                    <CardDescription> - 현금영수증은 토스페이에서 발급 가능</CardDescription>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="pt-[10px]">
                        <p className="font-bold text-[15px]">
                            스핀 포인트
                        </p>
                        <Input>
                        </Input>
                    </div>
                    <div className="pt-[10px]">
                        <p className="font-bold text-[15px]">
                            결제 금액
                        </p>
                        <Card className="w-full h-full">
                            {/* <CardHeader className="p-[10px]">

                            </CardHeader> */}
                            <CardContent>
                                <div className="grid w-full items-center gap-4 p-[20px]">
                                    <div className="flex justify-between">
                                        <CardDescription>상품 금액</CardDescription>
                                        <CardDescription>{formattedPrice}원</CardDescription>
                                    </div>
                                    <div className="flex justify-between">
                                        <CardDescription>배송비</CardDescription>
                                        <CardDescription>무료</CardDescription>
                                    </div>
                                    <div className="flex justify-between">
                                        <CardDescription>안전결제 수수료</CardDescription>
                                        <CardDescription>무료</CardDescription>
                                    </div>
                                    <div className="flex justify-between">
                                        <CardDescription>스핀포인트 사용</CardDescription>
                                        <CardDescription>0원</CardDescription>
                                    </div>
                                    <div className="flex justify-between border-t-[1px] pt-[10px]">
                                        <p>총 결제금액</p>
                                        <p>{formattedPrice}원</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="w-full mx-auto mt-[25px]">
                        <Button onClick={payment} className="w-full border-solid border-[1px] border-black bg-white text-black hover:bg-black hover:text-white">
                            <div className="w-full flex flex-col text-left p-[15px]">
                                <p>결제하기</p>
                            </div>
                        </Button>
                    </div>

                </div>
            </div>
        </div>
        </div>
    </>

}



export default ParcelTradeComponent;