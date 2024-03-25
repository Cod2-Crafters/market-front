'use client'
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ParcelTradeComponent from "./ParcelTradeComponent";
import { ProductDetail } from "@/types/Product";



const ModalBuyProduct: React.FC<{ detailData: ProductDetail }> = ({ detailData }) => {

    const [tradeType, setTradeType] = useState('');

    // 직거래 컴포넌트
    const DirectTradeComponent = () => (
        <div>
            <p>직거래를 선택하셨습니다.</p>
            <p>직거래도 현금 없이 간편하게 결제할 수 있어요</p>
        </div>
    );


    return <>
        {tradeType === '' && <><div className="mt-[150px]"><div className="w-4/5 mx-auto">
            <Button onClick={() => setTradeType('parcel')} className="w-full border-solid border-[1px] border-black bg-white text-black hover:bg-black hover:text-white">
                <div className="w-full flex flex-col text-left p-[15px]">
                    <p>택배거래</p>
                    <p className="mt-[5px]">안전하게 상품을 받을 때까지, 태풍페이가 결제 금액을 보관해요</p>
                </div>
            </Button>
        </div>
            <div className="w-4/5 mx-auto mt-[25px]">
                <Button onClick={() => setTradeType('direct')} className="w-full border-solid border-[1px] border-black bg-white text-black hover:bg-black hover:text-white">
                    <div className="w-full flex flex-col text-left p-[15px]">
                        <p>직거래</p>
                        <p className="mt-[5px]">직거래도 현금 없이 간편하게 결제할 수 있어요</p>
                    </div>
                </Button>
            </div></div></>}

        {tradeType === 'parcel' && <ParcelTradeComponent detailData={detailData} />}
        {tradeType === 'direct' && <DirectTradeComponent />}
    </>
}


export default ModalBuyProduct;