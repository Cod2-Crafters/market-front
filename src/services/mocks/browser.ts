'use client';
import { setupWorker } from 'msw/browser';
import { handlers } from '@/services/mocks/handlers';

export const browserWorker = setupWorker(...handlers);
