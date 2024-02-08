'use client';
import initMocks from '@/mocks';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    initMocks();
    console.log('init Mocks');
}

console.log('page init1');

export default function Home() {
    const [reviews, setReviews] = useState<string[] | null>(null);

    const handleGetReviews = () => {
        // Client-side request are mocked by `mocks/browser.ts`.
        fetch('/api/users')
            .then((res) => res.json())
            .then((data) => console.log('outputdata', data));
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <button onClick={handleGetReviews}>test call</button>
        </main>
    );
}
