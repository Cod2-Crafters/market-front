'use client';

import { Fragment, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {};

interface IFileInfo {
    name: string;
    src: string;
}

const FileUploader = (props: Props) => {
    const [imageFileList, setImageFileList] = useState<File[]>([]);
    const [imageDataList, setImageDataList] = useState<IFileInfo[]>([]);

    const { setValue } = useFormContext();

    useEffect(() => {
        for (const imageFile of imageFileList) {
            let fileReader = new FileReader();
            fileReader.onloadend = (event) => {
                console.log('fileonloadend', event);
                console.log('fileReader', fileReader);

                if (fileReader.result) {
                    console.log('FileUploader-result', fileReader.result);
                    setImageDataList(() => [
                        ...imageDataList,
                        { src: fileReader.result as string, name: imageFile.name },
                    ]);
                }
            };
            fileReader.readAsDataURL(imageFile);
        }
    }, [imageFileList]);
    return (
        <>
            <div className="absolute block h-full w-full bg-transparent">
                <input
                    className="h-full w-full cursor-pointer"
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
            </div>

            <div className="static w-full bg-red-300">
                {imageDataList.map((imageData, index) => {
                    return (
                        <Fragment key={imageData.src}>
                            <div className="border border-gray-40 bg-black  ">
                                <img src={imageData.src} />
                            </div>
                            {/* {imageData && imageData.name} */}
                        </Fragment>
                    );
                })}
            </div>
        </>
    );
};

export default FileUploader;
