import ToggleGroupButton from '@/components/buttons/ToggleGroupButton';
import CategoryData from '@/components/custom/CategoryData';
import { ProductFormNameInput } from '@/components/custom/ProductFormNameInput';
import ProductFormPriceInput from '@/components/custom/ProductFormPriceInput';
import ProductFormTagInput from '@/components/custom/ProductFormTagInput';
import FileUploader from '@/components/Files/FileUploader';
import Icon from '@/components/icons/Icon';
import Header from '@/components/page/Header';
import DescTextarea from '@/components/texts/DescTextarea';
import SectionWrapper from '@/components/wrappers/SectionWrapper';
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

async function getCategories() {
    // actions
    const res = await fetch(`http://13.125.249.102:8080/api/category/list`, { cache: 'no-cache' });
    return res.json();
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
            <div className="flex min-w-[1236px] flex-col">
                <Header />
                <main className="flex flex-col items-center">
                    {/* 메인페이지 광고 영역  */}
                    <div className="h-24 flex w-full bg-zinc-700">main ads</div>
                    {/* 메인 시작 */}
                    <div className="flex h-96 w-full max-w-screen-lg flex-col">
                        <div className="flex flex-col">
                            {/* 카메라 */}
                            <SectionWrapper>
                                <>
                                    <div className="relative w-[150px] bg-gray-60">
                                        <div className='transform" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center '>
                                            <Icon icon="bi:camera" width={64} height={0} />
                                            <span className="m-auto">0 / 10</span>
                                        </div>
                                        <FileUploader />
                                    </div>
                                </>
                            </SectionWrapper>
                            <SectionWrapper>
                                <ProductFormNameInput />
                            </SectionWrapper>
                            <SectionWrapper>
                                <CategoryData />
                            </SectionWrapper>
                            <SectionWrapper>
                                <ProductFormPriceInput />
                            </SectionWrapper>
                            <SectionWrapper>
                                <ToggleGroupButton
                                    title="교환"
                                    items={[
                                        { value: '1', text: '가능' },
                                        { value: '0', text: '불가' },
                                    ]}
                                />
                            </SectionWrapper>
                            <SectionWrapper>
                                <DescTextarea
                                    placeholderComp={
                                        <p className="text-gray-30">
                                            <span className="text-lg">
                                                구매시기, 브랜드/모델명, 제품의 상태 (사용감, 하자 유무) 등을 입력해
                                                주세요. 서로가 믿고 거래할 수 있도록, 자세한 정보와 다양한 각도의 상품
                                                사진을 올려주세요.
                                            </span>
                                            <br />
                                            <span className="text-sm">
                                                * 안전하고 건전한 거래 환경을 위해 과학기술정보통신부,
                                                한국인터넷진흥원과 태풍마켓(주)가 함께 합니다.
                                            </span>
                                        </p>
                                    }
                                />
                            </SectionWrapper>
                            <SectionWrapper>
                                <ProductFormTagInput />
                            </SectionWrapper>
                            <br />
                        </div>
                    </div>
                    {/* <FlyOut>
                        <FlyOutToggle></FlyOutToggle>
                    </FlyOut> */}
                </main>
                {/* <footer className="mt-30 m-auto flex h-24 w-full max-w-screen-lg flex-col bg-orange-300">
                    이 영역은 푸터입니다
                </footer> */}
            </div>
        </>
    );
}
