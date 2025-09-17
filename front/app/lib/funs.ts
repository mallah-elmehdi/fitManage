export const timeFormatting = (date: string) => {
    if (date) {
        const day = new Date(date);
        return `${day.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    return 'N/A';
};

export const dateFormatting = (date: string, isFull?: boolean) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthsFull = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    if (date) {
        const day = new Date(date);
        return `${isFull ? monthsFull[day.getMonth()] : months[day.getMonth()]} ${day.getDate()} ${day.getFullYear()}`;
    }
    return 'N/A';
};
