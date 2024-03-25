import { cn } from '@/lib/utils';

type TextLengthDisplayProps = {
    className?: string;
    mode: 'inline' | 'block';
    position: 'left' | 'right';
    readonly textLength: number;
    readonly maxLength: number;
};

const TextLengthDisplay = ({
    className,
    mode = 'inline',
    position = 'left',
    textLength,
    maxLength,
}: TextLengthDisplayProps) => {
    return (
        <>
            {mode === 'inline' && (
                <span
                    className={cn(
                        'text-left text-lg text-black',
                        {
                            'text-right': position == 'right',
                        },
                        className
                    )}
                >
                    {textLength} / {maxLength}
                </span>
            )}
            {mode === 'block' && (
                <p
                    className={cn(
                        'text-left text-lg text-black',
                        {
                            'text-right': position == 'right',
                        },
                        className
                    )}
                >
                    {textLength} / {maxLength}
                </p>
            )}
        </>
    );
};

export default TextLengthDisplay;
