import { ProductCard } from './ProductCard';

interface ProductCardState {
    id: number;
    simpleMemberResponse: {
        id: number;
        email: string;
        shopName: string;
        logoPath: null;
        createdAt: string;
    };
    title: string;
    price: number;
    content: string;
    postStatus: string;
    isDeleted: boolean;
    thumbnailPath: string;
    createdAt: string;
}

const products = {
    content: [
        {
            id: 1,
            simpleMemberResponse: {
                id: 2,
                email: 't1@t1.com',
                shopName: 't1shop',
                logoPath: null,
                createdAt: '2024-03-08T13:22:05',
            },
            title: '로어즈 볼캡',
            price: 35000,
            content:
                '정가 4.5 판매가 3.5\n이쁜것 같아서 샀다가 스타일 안맞아서 판매합니다\n택도 안뗀 새 상품이고 쿨거시 반택포입니다\n공식홈피에서는 품절이고 모자가 꽤 깊어서 웬만하면 잘 어울릴것 같습니다',
            postStatus: 'ON_SALE',
            isDeleted: false,
            thumbnailPath: '/api/file/static/1.jpg',
            createdAt: '2024-03-10T10:00:46',
        },
        {
            id: 2,
            simpleMemberResponse: {
                id: 4,
                email: 't3@t3.com',
                shopName: 't3shop',
                logoPath: null,
                createdAt: '2024-03-08T13:22:05',
            },
            title: '혼마 TW-U 드라이빙아이언 5번 25도',
            price: 90000,
            content:
                '혼마 TW-U 드라이빙아이언 5번 25도입니다 \n샤프트는 50R(카본 VIZARD)입니다.\n저는 우드보다는  하이브리드(유틸리티)가 잘맞더군요 \n아이언도 고민되고,..\n그래서 드라이빙아이언에 대한 호기심이 생겼어요\n이 드라이빙아이언은스크린연습장에서 2번 연습삼아 사용했어요 (1회 10~20분정도.. 상태는 아주 좋아요) 5번 아이언보다 아주 조금 길지만 헤드가 중공구조라 그런지 무게는 좀 더 가벼워요 \n(맨 마지막 사진은 캘러웨이 빅버사5번 아이언과 길이 비교 참고사진입니다) \n유튜브 보니 아이언보다는 쉽지만 역시 많은 연습이 필요하다고 하여 부담되어 내놓습니다\n(지역은 세종입니다)',
            postStatus: 'ON_SALE',
            isDeleted: false,
            thumbnailPath: '/api/file/static/2.jpg',
            createdAt: '2024-03-10T10:00:46',
        },
        {
            id: 3,
            simpleMemberResponse: {
                id: 8,
                email: 't7@t7.com',
                shopName: 't7shop',
                logoPath: null,
                createdAt: '2024-03-08T13:22:05',
            },
            title: '판매완료',
            price: 11111,
            content: '중복이라\n양도받은 가격에 양도합니다.\n판매완료',
            postStatus: 'ON_SALE',
            isDeleted: false,
            thumbnailPath: '/api/file/static/3.jpg',
            createdAt: '2024-03-10T10:00:46',
        },
        {
            id: 5,
            simpleMemberResponse: {
                id: 11,
                email: 't10@t10.com',
                shopName: 't10shop',
                logoPath: null,
                createdAt: '2024-03-08T13:22:05',
            },
            title: '(L)아디다스 져지',
            price: 35000,
            content:
                '‼️구매하시기전에 읽어주세요‼️\n\n•택사이즈보다 실측사이즈를 확인해주세요.\n•미처확인못한 미세한 오염 또는 하자가 있을수있으니 신중하게 생각하신뒤 구매 부탁드립니다.\n•중고 의류 특성상 환불 반품은 불가하오니 신중히 생각해주시고 구매해주세요 :)\n•택배비는+3000 제주도+7000 입니다\n•문의 많이 많이 주세요!  3개이상 구매 시 무료배송! \n😍상점에 이쁜제품들 더있어요 보고가세요~😍\n\n사이즈 L\n총장 70 가슴단면 58',
            postStatus: 'ON_SALE',
            isDeleted: false,
            thumbnailPath: '/api/file/static/5.jpg',
            createdAt: '2024-03-10T10:00:46',
        },
        {
            id: 6,
            simpleMemberResponse: {
                id: 3,
                email: 't2@t2.com',
                shopName: 't2shop',
                logoPath: null,
                createdAt: '2024-03-08T13:22:05',
            },
            title: '안전벨트 소리 경고음 경고등 제거 클립',
            price: 1220,
            content:
                '새상품이고 기아봉고3이외 잘 작동합니다\n\n작동하지않을시 무료반품 가능합니다\n\n오후3시이전 주문시 당일발송합니다\n당일발송 안될시 제품값은 받지않겠습니다\n\n자세한건 아래 링크참조\n링크 들어가셔서 쿠팡에서 주문해주세요\n\n심플타입\nhttps://www.coupang.com/vp/products/7925919727\n\n실리콘타입,큐빅타입\nhttps://www.coupang.com/vp/products/7925919727',
            postStatus: 'ON_SALE',
            isDeleted: false,
            thumbnailPath: '/api/file/static/6.jpg',
            createdAt: '2024-03-10T10:00:46',
        },
        {
            id: 9,
            simpleMemberResponse: {
                id: 6,
                email: 't5@t5.com',
                shopName: 't5shop',
                logoPath: null,
                createdAt: '2024-03-08T13:22:05',
            },
            title: 'PCX125',
            price: 2600000,
            content:
                '2022년12월식 pcx125 판매합니다.\n현재 21000km 정도 탓구요. 오일및정비는 수시로 체크 하여서 상태는 아주 좋습니다.\n구입전 시동 걸어보시고 시운전 해보시면 아실겁니다.아직까지 넘어지거나 제자리 쿵한적도 없이 무사히 잘사용한 거라 나름 애착이 있지만 사정이 있어 내놓는것이니 무리한 네고는 정중히 사양합니다. 1인 신조 차량 이라 여러사람이 탄차가 아닌 저만 탄 차라 믿을수 있으시겁니다.꼭 하실분만 연락주시길 바라며 상사분들은 연락자제 부탁드립니다.',
            postStatus: 'ON_SALE',
            isDeleted: false,
            thumbnailPath: '/api/file/static/9.jpg',
            createdAt: '2024-03-10T10:00:46',
        },
        {
            id: 10,
            simpleMemberResponse: {
                id: 7,
                email: 't6@t6.com',
                shopName: 't6shop',
                logoPath: null,
                createdAt: '2024-03-08T13:22:05',
            },
            title: '블로썸에이치 울 투버튼 자켓 네이비',
            price: 300000,
            content: '네이비컬러 / 2회착용\n하자없이 깔끔합니다!',
            postStatus: 'ON_SALE',
            isDeleted: false,
            thumbnailPath: '/api/file/static/10.jpg',
            createdAt: '2024-03-10T10:00:46',
        },
        {
            id: 12,
            simpleMemberResponse: {
                id: 8,
                email: 't7@t7.com',
                shopName: 't7shop',
                logoPath: null,
                createdAt: '2024-03-08T13:22:05',
            },
            title: '스벅5만원 쿠폰',
            price: 45000,
            content: '스타벅스 쿠폰 판매합니다',
            postStatus: 'ON_SALE',
            isDeleted: false,
            thumbnailPath: '/api/file/static/12.jpg',
            createdAt: '2024-03-10T10:00:46',
        },
        {
            id: 13,
            simpleMemberResponse: {
                id: 2,
                email: 't1@t1.com',
                shopName: 't1shop',
                logoPath: null,
                createdAt: '2024-03-08T13:22:05',
            },
            title: '리스테린 토탈케어 마일드 1L 대용량4개 팝니다.사은품보건용마스크증정요',
            price: 33000,
            content:
                '리스테린 토탈케어 마일드 1L  대용량4개 팝니다.\n\n[리스테린 유효기간 2025년 3월 31일]\n\n(사은품 보건용 마스크 4개 증정.)\n\n무료배송입니다.  택배 무개측정 때문에 가격이 정해집니다',
            postStatus: 'ON_SALE',
            isDeleted: false,
            thumbnailPath: '/api/file/static/13.jpg',
            createdAt: '2024-03-10T10:00:46',
        },
        {
            id: 17,
            simpleMemberResponse: {
                id: 6,
                email: 't5@t5.com',
                shopName: 't5shop',
                logoPath: null,
                createdAt: '2024-03-08T13:22:05',
            },
            title: '슈프림 박스로고 카모 m',
            price: 350000,
            content: '크림에서 구매했고 1회착했습니다\n왼팔에 얼룩있습니다',
            postStatus: 'ON_SALE',
            isDeleted: false,
            thumbnailPath: '/api/file/static/17.jpg',
            createdAt: '2024-03-10T10:00:46',
        },
        {
            id: 19,
            simpleMemberResponse: {
                id: 9,
                email: 't8@t8.com',
                shopName: 't8shop',
                logoPath: null,
                createdAt: '2024-03-08T13:22:05',
            },
            title: '세븐틴 4월 컴백  부총대 모집',
            price: 1234,
            content:
                '세븐틴  4월  컴백  부총대를  모집합니다\n총 3명 이왕이면  저랑  오래  하실 분들이면  좋겠습니다!! 힘든일은  제가  다  합니다\n부총대는 인원  모아주시고 전달해 주시고 저랑 함께 편의점명 연락처 성함  받아주시고 전달해주시면  됩니다!!\n말투  친절하시고 좋으신 분이면  좋겠습니디!!\n제가  총대를  언제까지  할지  모르겠지만  제가 총대 할때까지  함께해요!!\n생각  있으신 분들은 연락 주세요!!\n선착순 입니다!!\n부총대 2명(마감)',
            postStatus: 'ON_SALE',
            isDeleted: false,
            thumbnailPath: '/api/file/static/19.jpg',
            createdAt: '2024-03-10T10:00:46',
        },
        {
            id: 22,
            simpleMemberResponse: {
                id: 10,
                email: 't9@t9.com',
                shopName: 't9shop',
                logoPath: null,
                createdAt: '2024-03-08T13:22:05',
            },
            title: '손그림아크릴화',
            price: 25000,
            content: '나무소재에 \n손그림 아크릴화 \n\n~23×29~',
            postStatus: 'ON_SALE',
            isDeleted: false,
            thumbnailPath: '/api/file/static/22.jpg',
            createdAt: '2024-03-10T10:00:46',
        },
        {
            id: 23,
            simpleMemberResponse: {
                id: 10,
                email: 't9@t9.com',
                shopName: 't9shop',
                logoPath: null,
                createdAt: '2024-03-08T13:22:05',
            },
            title: '연베이지 밴딩 롱스커트 모리걸 빈티지',
            price: 18000,
            content:
                '후들후들한 소재로 봄~초여름까지 입기 좋고 전체밴딩이라 편하게 입어져요! 안감 당연히 있습니다!\n\n허리 전체밴딩\n총장 78cm\n\n\n🍎중고거래 특성상 교환이나 환불은 어렵습니다!\n🍎1~2cm 오차가 있을 수 있습니다!\n\nGS반값택배 이용합니다 쿨거시 반택 금액 안 받습니다~ 찔러봐주세요!!',
            postStatus: 'ON_SALE',
            isDeleted: false,
            thumbnailPath: '/api/file/static/23.jpg',
            createdAt: '2024-03-10T10:00:46',
        },
        {
            id: 24,
            simpleMemberResponse: {
                id: 5,
                email: 't4@t4.com',
                shopName: 't4shop',
                logoPath: null,
                createdAt: '2024-03-08T13:22:05',
            },
            title: '케인 굿즈 사요',
            price: 1000,
            content:
                '케인인님 굿즈 케이스 빼고 다산다맨이야 \n\n가격은 제시 거래는 택배로 진행해야한다맨이야\n\n제발 팔아주세요.',
            postStatus: 'ON_SALE',
            isDeleted: false,
            thumbnailPath: '/api/file/static/24.jpg',
            createdAt: '2024-03-10T10:00:46',
        },
        {
            id: 25,
            simpleMemberResponse: {
                id: 3,
                email: 't2@t2.com',
                shopName: 't2shop',
                logoPath: null,
                createdAt: '2024-03-08T13:22:05',
            },
            title: '삼성 센스 RC520 노트북 15.6LCD  지포스VGA',
            price: 70000,
            content:
                '삼성 센스 RC520 입니다\n\n인텔 펜티엄 B970\n4기가램(빈슬롯 1개 남아있음)\n500기가 HDD\n지포스 Gt520+인텔 HD VGA\n15.6 HD LCD (1366×768) 액정 깨끗\nDVDRW\n유무선랜+블루투스\nUSB 4포트+HDMI+VGA\n배터리 방전(충전안됨)\n외관 양호함\n충전기 없음\n\n인터넷 인강 유투브 사무용도로 추천합니다\n액정깨끗하고 듀얼VGA라 넷플이나 유투브\n시청시 렉없이 잘돌아갑니다\n노트북 본체 + 마우스 드립니다(충전기 없습니다)\n\n안전결재 환영합니다\n택배는 선불 5천원입니다(CJ대한통운)',
            postStatus: 'ON_SALE',
            isDeleted: false,
            thumbnailPath: '/api/file/static/25.jpg',
            createdAt: '2024-03-10T10:00:46',
        },
    ],
    pageable: {
        pageNumber: 0,
        pageSize: 15,
        sort: {
            empty: false,
            sorted: true,
            unsorted: false,
        },
        offset: 0,
        paged: true,
        unpaged: false,
    },
    size: 15,
    number: 0,
    sort: {
        empty: false,
        sorted: true,
        unsorted: false,
    },
    numberOfElements: 15,
    first: true,
    last: false,
    empty: false,
};

//[Component] ProductCardList

const ProductCardList = () => {
    return (
        <div className="flex flex-row flex-wrap gap-8">
            {products.content.map((item: ProductCardState) => {
                return <ProductCard key={item.id} cardItemInfo={item}></ProductCard>;
            })}
        </div>
    );
};
export default ProductCardList;
export type { ProductCardState };
