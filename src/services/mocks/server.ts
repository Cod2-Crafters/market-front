import { setupServer } from 'msw/node';
import { handlers } from '@/services/mocks/handlers';

export const serverWorker = setupServer(...handlers);
