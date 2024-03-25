'use client'
import { useState } from "react";
import MyPage from "./MyPages";
import { ShopDetail } from "@/types/ShopTypes";
import { useAppDispatch } from "@/hooks/rtkHooks";
import { openDrawer } from "../drawer/drawerSlice";
import SellProductList from "./SellProductList";


const ShopClient: React.FC<{ detailData: ShopDetail, shopName: string }> = ({ detailData, shopName }) => {

    const ShopInfo: ShopDetail = detailData;


    const [selectedMenu, setSelectedMenu] = useState('메뉴 1');

    const renderComponent = () => {
        switch (selectedMenu) {
            case '메뉴 1':
                return <MyPage detailData={ShopInfo} shopName={shopName} />;
            case '메뉴 2':
                return <p>메뉴 2 컴포넌트</p>;
            case '메뉴 3':
                return <p>메뉴 3 컴포넌트</p>;
            default:
                return <p>선택된 메뉴가 없습니다.</p>;
        }
    };

    const dispatch = useAppDispatch();

    const sellList = () => {
        dispatch(openDrawer(<SellProductList detailData={ShopInfo} shopName={shopName} />));
    }




    return (
        <div className="flex flex-col items-center justify-between">
            <div className="w-4/5">
                <div className="flex h-screen">
                    <div className="w-1/5 border-r-[1px] border-solid">
                        <nav>
                            <ul>
                                <li onClick={() => setSelectedMenu('메뉴 1')} className="p-4 text-[32px] hover:bg-gray-300 cursor-pointer">마이페이지</li>
                                <li className="pt-[20px] text-[25px] p-4 hover:bg-gray-300 cursor-default">쇼핑정보</li>
                                <li onClick={() => sellList()} className="p-4 hover:bg-gray-300 cursor-pointer">판매내역</li>
                                <li onClick={() => setSelectedMenu('메뉴 3')} className="p-4 hover:bg-gray-300 cursor-pointer">상품등록</li>
                                <li className="p-4 pt-[20px] text-[25px] hover:bg-gray-300 cursor-default">내 정보</li>
                                <li onClick={() => setSelectedMenu('메뉴 3')} className="p-4 hover:bg-gray-300 cursor-pointer">찜</li>
                                <li onClick={() => setSelectedMenu('메뉴 3')} className="p-4 hover:bg-gray-300 cursor-pointer">팔로잉</li>
                                <li onClick={() => setSelectedMenu('메뉴 3')} className="p-4 hover:bg-gray-300 cursor-pointer">팔로워</li>
                            </ul>
                        </nav>
                    </div>
                    <div className="w-4/5 bg-white p-8">
                        {renderComponent()}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ShopClient;