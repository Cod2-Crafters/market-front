'use client';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import Icon from '../icons/Icon';

import { Fragment, useId, useRef } from 'react';
import Slider from 'react-slick';

// function SlideNextArrow({ className, style, onClick }: any) {
//     return (
//         <button className="block" onClick={previous}>
//         <ArrowIcon width="35" height="35" />
//     </button>
//     <button className="button rotate-180" onClick={next}>
//         <ArrowIcon width="35" height="35" />
//     </button>

//         <div
//             className={className}
//             // style={{
//             //     ...style,
//             //     display: 'none', // show display: flex
//             //     content: '-',
//             //     alignItems: 'center',
//             //     justifyContent: 'center',
//             //     background: 'red',
//             //     right: '50px',
//             //     width: '50px',
//             //     height: '50px',
//             //     borderRadius: '50%',
//             //     color: 'black',
//             //     zIndex: 1,
//             // }}
//             onClick={onClick}
//         ></div>
//     );
// }

// function SlidePrevArrow({ className, style, onClick }: any) {
//     return (
//         <div
//             className={className}
//             // style={{
//             //     ...style,
//             //     display: 'none', // show display: flex
//             //     alignItems: 'center',
//             //     justifyContent: 'center',
//             //     background: 'red',
//             //     left: '50px',
//             //     width: '50px',
//             //     height: '50px',
//             //     borderRadius: '50%',
//             //     color: 'black',
//             //     zIndex: 1,
//             // }}
//             onClick={onClick}
//         />
//     );
// }

type Props = {};

const Adverties = (props: Props) => {
    const sliderRef = useRef<Slider>(null);

    const next = () => {
        sliderRef.current?.slickNext();
    };
    const previous = () => {
        sliderRef.current?.slickPrev();
    };

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'linear',
        arrows: false,
    };

    const imagesInfo = {
        basePath: '/images/advertiesment',
        images: [
            { fileName: '/1.png', width: 1200, height: 400 },
            { fileName: '/2.png', width: 1200, height: 0 },
            { fileName: '/3.png', width: 1200, height: 0 },
            { fileName: '/4.png', width: 1200, height: 0 },
        ],
    };

    return (
        <div className="slider-container relative">
            <Slider ref={sliderRef} {...settings}>
                {imagesInfo.images.map((imageItemInfo) => {
                    return (
                        <Fragment key={useId()}>
                            <div className="flex w-full items-center justify-center  ">
                                <img src={imagesInfo.basePath + imageItemInfo.fileName} height={imageItemInfo.height} />
                            </div>
                        </Fragment>
                    );
                })}
            </Slider>
            <div className="translate-translate-y-[-50%] absolute top-1/2 flex w-full justify-between px-36">
                <button className="block" onClick={previous}>
                    <div>
                        <Icon icon="arrow" width={45} height={45} />
                    </div>
                </button>
                <button className="button" onClick={next}>
                    <Icon className="rotate-180" icon="arrow" width={45} height={45} />
                </button>
            </div>
        </div>
    );
};

export default Adverties;
