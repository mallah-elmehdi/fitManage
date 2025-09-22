export function getWeekStart(date) {
    const givenDate = new Date(date); // make a copy
    const day = givenDate.getDay(); // 0=Sunday, 1=Monday, ... 6=Saturday

    // Calculate offset: if it's Sunday (0), we want to go back 6 days
    const diff = day === 0 ? -6 : 1 - day;

    const monday = new Date(givenDate);
    monday.setDate(givenDate.getDate() + diff);

    return monday;
}

export function getDayStart(date) {
    const givenDate = new Date(date);
    return new Date(givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate());
}

export function getMonthStart(date) {
    const givenDate = new Date(date);
    return new Date(givenDate.getFullYear(), givenDate.getMonth(), 1);
}

export function getYearStart(date) {
    const givenDate = new Date(date);
    return new Date(givenDate.getFullYear(), 0, 1);
}

export function getWeekEnd(date) {
    const givenDate = new Date(date);
    const day = givenDate.getDay(); // 0=Sunday, 1=Monday, ... 6=Saturday
    const diff = day === 0 ? 0 : 7 - day; // adjust so Sunday is end
    const sunday = new Date(givenDate);
    sunday.setDate(givenDate.getDate() + diff);
    sunday.setHours(23, 59, 59, 999);
    return sunday;
}

export function getMonthEnd(date) {
    const givenDate = new Date(date);
    return new Date(givenDate.getFullYear(), givenDate.getMonth() + 1, 0, 23, 59, 59, 999);
}

export function getYearEnd(date) {
    const givenDate = new Date(date);
    return new Date(givenDate.getFullYear(), 11, 31, 23, 59, 59, 999);
}
