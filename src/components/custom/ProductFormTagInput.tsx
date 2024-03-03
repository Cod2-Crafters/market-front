'use client';

import Icon from '../icons/Icon';
import { Input } from '../ui/input';

import { Fragment, useEffect, useRef, useState } from 'react';

type Props = {};

const maxTagLength = 5;

const dbTagList = [
    // 21개
    '아이패드',
    '아이폰',
    '사과패드',
    '마우스패드',
    '혼잠',
    '크크',
    '하하',
    '애플',
    '마소',
    '스타벅스',
    '투바투',
    '세븐틴',
    '플레이브',
    '가비지타임',
    '올리브영',
    '푸바오',
    '노트북',
    '메가박스',
    '메가맨',
    '뱅드림',
    '루이비통', // 21
    '주술회전',
    '주술회전공구',
    '진격의거인',
];

function usePrevious<T>(value: T) {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const ProductFormTagInput = (props: Props) => {
    const [tagList, setTagList] = useState<string[]>([]);
    const [tagText, setTagText] = useState<string>('');
    const filteredTags = dbTagList.filter((filterDBTagItem) => filterDBTagItem.includes(tagText));

    const refTagListBox = useRef<HTMLUListElement>(null);

    const prevTagListCount = usePrevious<number>(tagList.length);

    const appendTag = (appedTagItem: string) => {
        // - maxTagLength 개수까지 태그 추가 가능
        // -중복태그 추가 방지
        if (!tagList.includes(appedTagItem) && tagList.length < maxTagLength) {
            setTagList(() => {
                return [...tagList, appedTagItem];
            });
        }
    };

    useEffect(() => {
        // 태그를 추가한 경우에만 scroll 맨 우측으로 이동 적용

        refTagListBox.current?.scrollTo(1000000, 0);
        console.log('tagdiff:', prevTagListCount, tagList.length);
    }, [Number(prevTagListCount) < tagList.length && tagList.length != 0]);

    return (
        <Fragment>
            <Input
                onKeyDown={(event) => {
                    if (/^[ㄱ-ㅎ가-힣a-zA-Z0-9\b,]+$/.test(event.key) == false) {
                        event.preventDefault();
                    } else if (event.key == ',') {
                        console.log('keydown', event.currentTarget.value);
                        setTagText(() => '');
                        if (0 < tagText.length) {
                            setTagList((prevTagList) => {
                                appendTag(tagText);
                                return prevTagList;
                            });
                        }
                        event.preventDefault();
                    }
                }}
                onChange={(event) => {
                    setTagText(event.currentTarget.value);
                }}
                value={tagText}
                placeholder={`태그를 입력해주세요 (최대 ${maxTagLength}개)`}
                headcomponent={
                    // 직접 추가한 태그
                    0 < tagList.length && (
                        <ul
                            ref={refTagListBox}
                            className={`scrollbar-hide overflow-x-scroll whitespace-nowrap border-r border-gray-40 pr-4`}
                        >
                            {tagList.map((tagItem) => {
                                return (
                                    <li
                                        key={tagItem}
                                        className="mx-2 inline-flex rounded-2xl bg-secondary px-4 text-white"
                                    >
                                        <button
                                            className="flex items-center justify-between"
                                            id={`tag-${tagItem}`}
                                            onClick={() => {
                                                setTagList(() =>
                                                    tagList.filter((filterTagItem) => tagItem !== filterTagItem)
                                                );
                                            }}
                                        >
                                            <p className="px-2 text-md">{tagItem}</p>
                                            <Icon icon="zondicons:close-solid" />
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )
                }
            />

            {/* 태그 검색 */}
            {0 < tagText.length && (
                <>
                    <ul className="-mt-2 flex max-h-[300px] flex-col gap-5 overflow-y-auto whitespace-nowrap border border-gray-50 bg-white p-4 shadow-lg">
                        {filteredTags.map((dbTagItem, dbTagItemIndex) => {
                            const tagValue = dbTagItem || '연관된 아이템이 없습니다.';
                            return (
                                <Fragment key={`searchtag-${dbTagItem}`}>
                                    <li
                                        className="p-4 hover:bg-gray-60"
                                        onClick={(event) => {
                                            appendTag(event.currentTarget.innerText);
                                            setTagText('');
                                        }}
                                    >
                                        {tagValue}
                                    </li>
                                </Fragment>
                            );
                        })}
                        {filteredTags.length == 0 && <li>연관된 해시태그를 찾을 수 없습니다.</li>}
                    </ul>
                </>
            )}
        </Fragment>

        // .map((dbTagItem) => {
        //     return (
        //         <li
        //             className=" p-4 hover:bg-gray-60"
        //             onClick={(event) => {
        //                 setTagList((prevTagList) => {
        //                     return [...prevTagList, event.currentTarget.value.toString()];
        //                 });
        //                 setTagText('');
        //             }}
        //         >
        //             {dbTagItem}
        //         </li>
        //     );
        // })}
    );
};

export default ProductFormTagInput;

ProductFormTagInput.Test = ProductFormTagInput;
