'use client';

import { Fragment, useEffect, useState } from 'react';

type Props = {};

interface IFileInfo {
    name: string;
    src: string;
}

const FileUploader = (props: Props) => {
    const [imageFileList, setImageFileList] = useState<File[]>([]);
    const [imageDataList, setImageDataList] = useState<IFileInfo[]>([]);

    useEffect(() => {
        for (const imageFile of imageFileList) {
            let fileReader = new FileReader();
            // 다 읽었을 때
            fileReader.onloadend = (event) => {
                console.log('fileonloadend', event);
                console.log('fileReader', fileReader);

                if (fileReader.result) {
                    console.log('#', fileReader.result);
                    setImageDataList(() => [
                        ...imageDataList,
                        { src: fileReader.result as string, name: imageFile.name },
                    ]);
                }
            };
            console.log('readfile');
            fileReader.readAsDataURL(imageFile);
        }
    }, [imageFileList]);
    return (
        <>
            <input
                className="h-[150px] w-full cursor-pointer opacity-0"
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => {
                    const fileList = event.target.files;
                    const fileListLength = fileList?.length || 0;
                    console.log('totalfiles:', fileList?.length, '개');

                    if (fileList && fileList[0]) {
                        const files = Array.from(event.target.files || []);

                        console.log('files-array', files);

                        files.forEach((imageFile) => {
                            if (imageFile.type.substring(0, 5) == 'image') {
                                if (!imageFileList.includes(imageFile)) {
                                    setImageFileList(() => [...imageFileList, imageFile]);
                                }
                            }
                        });
                    }
                }}
            />
            <div className="h-24 absolute left-10 flex h-[100px] w-[600px] flex-1 items-center justify-center gap-10">
                {imageDataList.map((imageData, index) => {
                    return (
                        <Fragment key={imageData.src}>
                            <div className="w-full border border-gray-40">
                                <img src={imageData.src} />
                            </div>
                            {imageData && imageData.name}
                        </Fragment>
                    );
                })}
            </div>
        </>
    );
};

export default FileUploader;
