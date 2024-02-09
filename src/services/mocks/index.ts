export default async function initMocks() {
    if (typeof window === 'undefined') {
        const { serverWorker } = await import('./server');
        serverWorker.listen();
    } else {
        const { browserWorker } = await import('./browser');
        browserWorker.start({ onUnhandledRequest: 'bypass' });
    }
}
