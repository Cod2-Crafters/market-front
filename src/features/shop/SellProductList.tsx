import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { filterImg } from "@/components/Button/iconSource";
import { ProductDetail } from "@/types/Product";
import { ShopContent, ShopDetail } from "@/types/ShopTypes";
import { formatPrice } from "@/utils/utils";
import { useEffect, useState } from "react";

const devUrl = process.env.NEXT_PUBLIC_API_HOST;

interface SearchInfo {

    status: string;

}


const SellProductList: React.FC<{ detailData: ShopDetail, shopName: string }> = ({ detailData, shopName }) => {

    const [searchObj, setSearchObj] = useState<SearchInfo>({ status: 'ON_SALE' });
    const [page, setPage] = useState(0);
    const [allList, setAllList] = useState<ShopContent[]>([]);
    const [filteredList, setFilteredList] = useState<ShopContent[]>(allList);
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    // const [list, setList] = useState<ShopContent[]>([]);
    const setProductStatus = (status: string) => {
        setSearchObj({ ...searchObj, status: status });
    }

    const fetchData = async (searchTerm = "") => {
        let url = `${devUrl}/api/post/search?shopName=${shopName}&page=${page}&size=10&postTitle=${searchTerm}`;
        console.log(url);
        const res = await fetch(url);
        const newData = await res.json();
        setFilteredList(newData.content);
    };

    useEffect(() => {
        // const fetchData = async () => {
        //     let url = `${devUrl}/api/post/search?shopName=${shopName}&page=${page}&size=100`;
        //     console.log(url);
        //     const res = await fetch(url);
        //     const newData = await res.json();
        //     setAllList(newData.content);
        //     setFilteredList(newData.content);
        //     // setList(newData.content);
        // }
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = allList.filter((item) => item.postStatus === searchObj.status || searchObj.status === "ON_SALE");
        setFilteredList(filtered);
    }, [searchObj.status, allList]);

    const getStatus = (status: string) => {
        switch (status) {
            case 'ON_SALE':
                return '판매중';
            case 'RESERVED':
                return '예약중';
            case 'SOLD_OUT':
                return '판매완료';
            default:
                return '알 수 없음';
        }
    }

    // 검색어 변경 핸들러
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // 엔터키 이벤트 핸들러
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            fetchData(searchTerm);
        }
    };


    return <>
        <p className="p-[30px] text-[25px]">구매/판매내역</p>
        <div className="flex flex-col">
            <div className="p-[30px] flex flex-row space-x-[10px]">
                <Button onClick={() => setProductStatus('ON_SALE')} variant={`${searchObj?.status === 'ON_SALE' ? 'default' : 'outline'}`} className="p-[15px] h-[30px] rounded-[20px]">전체</Button>
                <Button onClick={() => setProductStatus('RESERVED')} variant={`${searchObj?.status === 'RESERVED' ? 'default' : 'outline'}`} className="p-[15px] h-[30px] rounded-[20px]">예약중</Button>
                <Button onClick={() => setProductStatus('SOLD_OUT')} variant={`${searchObj?.status === 'SOLD_OUT' ? 'default' : 'outline'}`} className="p-[15px] h-[30px] rounded-[20px]">판매완료</Button>
            </div>
            <div className="p-[30px] flex items-center">
                <Input value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
                    placeholder="상품명을 입력하세요" />
                <Button variant="outline" className="h-[32px]" onClick={() => { setIsOpen(true) }}>{filterImg()}
                </Button>
            </div>
            {filteredList.map((product, index) => (
                <>
                    <div className="w-full flex flex-col justify-center items-center">
                        <div className="w-4/5 border-b-[1px] border-solid" />
                        <div className="w-4/5 pt-[15px] pb-[25px]">
                            <p className="pb-[20px]">{getStatus(product.postStatus)}</p>
                            <div className="flex flex-row items-center">
                                <img src={devUrl + product.thumbnailPath} className="w-[60px] h-[60px]" />
                                <div className="flex flex-col justify-center pl-[10px]">
                                    <p className="text-[10px]">{product.title}</p>
                                    <p className="text-[12px]">{formatPrice(product.price)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            ))}

            <div>
                {isOpen ? (<> <div className="fixed inset-0 z-40 bg-gray-10 bg-opacity-20 flex justify-end items-center" style={{ width: '100%', height: '100%' }} onClick={() => setIsOpen(false)}>
                    <div className="fixed w-1/2 h-1/3 right-0 bottom-0 bg-white rounded-lg shadow-xl z-50 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="p-[30px] flex flex-col">
                            <p className="text-[25px]">상세필터</p>
                            <p className="text-[15px] pt-[20px]">기간</p>
                            <div className="flex space-x-[10px] pt-[20px]">
                                <Input />
                                <p>~
                                </p>
                                <Input />
                            </div>
                            <div className="flex justify-end pt-[50px] space-x-[20px]">
                                <Button variant="outline" className="w-1/3 h-[35px]">선택 초기화</Button>
                                <Button variant="default" className="w-1/3 h-[35px]">적용하기</Button>
                            </div>
                        </div>
                    </div>
                </div>
                </>) : (<></>)}
            </div>
        </div >
    </>
}

export default SellProductList;






