'use client';

import ProductCardList from '@/components/cards/ProductCardList';
import Header from '@/components/page/Header';
import Adverties from '@/components/Slide/Adverties';
import initMocks from '@/services/mocks';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    initMocks();
    console.log('init Mocks');
}
export interface ICategory {
    id: number;
    name: string;
    count: number;
    parentId: number;
    selected?: boolean;
    child?: Array<ICategory>;
}

export default async function Home() {
    // const [reviews, setReviews] = useState<string[] | null>(null);

    // const handleGetReviews = () => {
    //     // Client-side request are mocked by `mocks/browser.ts`.
    //     fetch('/api/users')
    //         .then((res) => res.json())
    //         .then((data) => console.log('outputdata', data));
    // };

    // let categorylist: ICategory[] = await getCategories();
    return (
        <>
            <Header />

            <div className="flex min-w-[1236px] flex-col">
                <main className="flex flex-col items-center">
                    {/* 메인페이지 광고 영역  */}
                    <div className="block w-full">
                        <Adverties />
                    </div>
                    {/* 메인 시작 */}
                    <div className="mt-30 flex h-96 w-full max-w-screen-lg flex-col">
                        <div className="flex flex-col"></div>
                    </div>
                    <ProductCardList />
                </main>
                {/* <footer className="mt-30 m-auto flex h-24 w-full max-w-screen-lg flex-col bg-orange-300">
                    이 영역은 푸터입니다
                </footer> */}
            </div>
        </>
    );
}
