export function timeSince(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = seconds / 86400;

    if (interval > 1) {
        return Math.floor(interval) + '일 전';
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + '시간 전';
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + '분 전';
    }
    return Math.floor(seconds) + '초 전';
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat().format(price);
}
