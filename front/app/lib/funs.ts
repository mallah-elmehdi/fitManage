export const timeFormatting = (date: string | Date) => {
    if (date) {
        const day = new Date(date);
        return `${day.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    return 'N/A';
};

export const dateFormatting = (date: string | Date, isFull?: boolean) => {
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

export const dateFullFormatting = (date: string | Date) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const months = [
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
        return `${days[day.getDay()]}, ${months[day.getMonth()]} ${day.getDate()} ${day.getFullYear()}`;
    }
    return 'N/A';
};

export function getMonthDaysIndex(monthIndex: number) {
    let date = new Date();
    date = new Date(date.getFullYear(), monthIndex + 1, 0);

    const year = date.getFullYear();
    const month = date.getMonth();

    // first & last day of month
    const firstDay = new Date(year, month, 0);
    const lastDay = new Date(year, month + 1, -1);

    const result = [];
    for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
        result.push(d.getDay());
    }

    return result;
}

export function getDaysInMonthByIndex(monthIndex: number) {
    const year = new Date().getFullYear();
    return new Date(year, monthIndex + 1, 0).getDate();
}
