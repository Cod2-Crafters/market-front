'use client';
import { setupWorker } from 'msw/browser';
import { handlers } from '@/mocks/handlers';

export const browserWorker = setupWorker(...handlers);
