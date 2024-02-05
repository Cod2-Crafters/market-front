import { setupServer } from 'msw/node';
import { handlers } from '@/mocks/handlers';

export const serverWorker = setupServer(...handlers);
