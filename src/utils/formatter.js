import dayjs from 'dayjs';

export const commaformatter = (value) => {
    if (!value) return '0';
    const val = value.toString().split(',').join('');
    return Intl.NumberFormat('en-US').format(Number(val));
};

export const decimalFormatter = (value, dp = 2) => {
    if (!value) return '0.00';

    if (isNaN(+value)) return '0.00';
    const val = value.toString().split(',').join('');
    return Intl.NumberFormat('en-US', {
        minimumFractionDigits: dp,
        maximumFractionDigits: dp,
    }).format(Number(val));
};

export const uniques = (arr) => [...new Set(arr)];

export const shortDateFormatter = (value, withTime = false) => {
    if (!value) return '';
    const date = new Date(value).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
    const time = new Date(value).toLocaleTimeString('en-US', {
        timeStyle: 'short',
    });

    return `${date}${withTime ? ` ${time}` : ''}`;
};

export const generateInitials = (fullname) => {
    return `${fullname.substring(0, 2).toUpperCase()}`;
};

export const countOccurences = (arr, key) => {
    return arr.reduce((acc, curr) => {
        acc[curr[key]] = (acc[curr[key]] || 0) + 1;
        return acc;
    }, {});
};

export const currencyCode = (curr) => {
    switch (curr) {
        case 'NGN':
            return '&#x20A6;';
        default:
            return '&#x20A6;';
    }
};

export const getRelativeTime = (timestamp) => {
    const DAY_MILLISECONDS = 1000 * 60 * 60 * 24;

    const rtf = new Intl.RelativeTimeFormat('en', {
        numeric: 'auto',
    });
    const daysDifference = Math.round(
        (new Date(timestamp).getTime() - new Date().getTime()) / DAY_MILLISECONDS
    );

    return rtf.format(daysDifference, 'day');
};

function currencyFormatter(amt) {
    const Formatter = Intl.NumberFormat();
    return Formatter.format(amt);
}

export const longNumberFormatter = (num) => {
    const lookup = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'k' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'B' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' },
    ];

    const item = lookup
        .slice()
        .reverse()
        .find((item) => num >= item.value);

    return item ? `${currencyFormatter(num / item.value)}${item.symbol}` : '0';
};

export const operatorFormatter = (operator) => {
    switch (operator.toLowerCase()) {
        case 'addition':
            return '+';
        case 'subtraction':
            return '-';
        case 'division':
            return '÷';
        case 'multiplication':
            return '*';
        case 'percentage':
            return '%';
        default:
            return operator;
    }
};

export const convertToBase64String = (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
        cb(reader.result);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
};

export const stringFormatter = (value) => {
    if (!value) return '';

    return value.replace(/[^a-zA-Z\d\s:\u00C0-\u00FF]/g, ' ');
};

export const passwordString = (inputString) => {
    if (!inputString) return '';

    if (inputString.length > 3) {
        return inputString.substring(0, 3) + '*'.repeat(inputString.length - 3);
    }
    return inputString;
};

export const convertToISOString = (val) => {
    return dayjs(val).format('YYYY-MM-DD');
};

export const timeFormatter = (value) => {
    if (!value) return '';
    return new Date(value).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // Ensures AM/PM format
    });
};
