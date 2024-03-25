import { HeadText } from '../texts/HeadText';
import { ProductCardState } from './ProductCardList';

import { timeSince } from '@/utils/utils';

//[Component] ProductCard
interface ProductCardProps {
    cardItemInfo: ProductCardState;
}

const ProductCard = ({ cardItemInfo, ...props }: ProductCardProps) => {
    return (
        <div className="w-[300px] cursor-pointer rounded-2xl shadow-2xl">
            <div className="grid-cols-1 grid-rows-2">
                <div className="relative flex min-h-[184px] items-center justify-center overflow-hidden rounded-2xl rounded-b-none">
                    <img
                        className="absolute"
                        src={`${process.env.NEXT_PUBLIC_API_HOST + cardItemInfo.thumbnailPath}`}
                        alt={cardItemInfo.title}
                    ></img>
                </div>
                <div className="px-16 py-16">
                    <div className="flex flex-col overflow-hidden pb-16">
                        <HeadText
                            size="2xl"
                            className="overflow-hidden text-ellipsis whitespace-nowrap pr-4 text-black"
                        >
                            {cardItemInfo.title}
                        </HeadText>
                        <HeadText size="xl" className="text-black">
                            <b>{cardItemInfo.price.toLocaleString() + '원'}</b>
                        </HeadText>
                    </div>
                    <div>
                        <span>구로동 | {timeSince(cardItemInfo.createdAt)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { ProductCard };
