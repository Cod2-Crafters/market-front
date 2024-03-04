import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

// Toggle 버튼 클래스
// onToggle을 props로 받아 후 처리 가능
// toggle 상태값 별 다른 색상 처리 진행

interface ToggleButtonProps extends ButtonProps {
    className: string;
    defaultToggleValue?: boolean;
    text: string;
    tailComponent?: React.ReactNode;
    onToggle: (isAfterActiveState: boolean) => void;
    roundBorderStyle: 'round' | 'halfround' | 'sqaure';
}

const ToggleButton = ({
    defaultToggleValue = false,
    text = '버튼',
    className,
    roundBorderStyle,
    tailComponent,
    onToggle,
}: ToggleButtonProps) => {
    let bgColor: string;
    const [isActive, setIsActive] = useState<boolean>(defaultToggleValue);
    const handleOnToggle = (event: React.MouseEvent) => {
        setIsActive((prevIsActive) => {
            onToggle(!prevIsActive); // after 값 반환
            return !prevIsActive;
        });
    };

    return (
        <Button
            className={
                (bgColor = cn(
                    '',
                    {
                        ['bg-primary']: isActive === false,
                        ['bg-indigo-900']: isActive === true,
                    },
                    {
                        ['rounded-2xl']: roundBorderStyle === 'round',
                        ['']: roundBorderStyle === 'sqaure',
                    },
                    className
                ))
            }
            onClick={handleOnToggle}
        >
            {tailComponent}
            {text}
        </Button>
    );
};

export default ToggleButton;
