import dayjs from 'dayjs';

export const toUnix = (input?: Date | string | number | dayjs.Dayjs | null): number => {
    if (!input) return dayjs().unix();

    return dayjs(input).unix();
};

export const formatUnix = (
    unix: number,
    format: string = 'DD/MM/YYYY HH:mm:ss'
): string => {
    return dayjs.unix(unix).format(format);
};

export const unixToDayjs = (unix: number): dayjs.Dayjs => {
    return dayjs.unix(unix);
};

export const nowUnix = (): number => {
    return dayjs().unix();
};

export const isAfter = (unix1: number, unix2: number): boolean => {
    return unix1 > unix2;
};

export const isBefore = (unix1: number, unix2: number): boolean => {
    return unix1 < unix2;
};

export const addSeconds = (unix: number, seconds: number): number => {
    return dayjs.unix(unix).add(seconds, 'second').unix();
};

export const addMinutes = (unix: number, minutes: number): number => {
    return dayjs.unix(unix).add(minutes, 'minute').unix();
};

export const addHours = (unix: number, hours: number): number => {
    return dayjs.unix(unix).add(hours, 'hour').unix();
};

export const addDays = (unix: number, days: number): number => {
    return dayjs.unix(unix).add(days, 'day').unix();
};