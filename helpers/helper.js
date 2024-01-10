import Moment from 'moment';
import { format } from 'date-fns';


export const useHelper = () => {


    const formatDate = (value) => {
        if (value) {
            return Moment(String(value)).format('DD/MM/YYYY HH:mm:ss')
        }
    }
    const formatDateShort = (value) => {
        if (value) {
            return Moment(String(value)).format('DD/MM/YYYY')
        }
    }
    const formatDateUse = (value) => {
        const previousDate = new Date(value);
        const currentDate = new Date();
        const millisecondsDiff = currentDate - previousDate;

        // Số ngày (làm tròn xuống)
        const daysDiff = Math.floor(millisecondsDiff / (1000 * 60 * 60 * 24));
        return daysDiff;
    }
    const formatDateTime = (value) => {
        if (value) {
            return Moment(String(value)).format('LLLL');
        }

    }
    const formatPrice = (value) => {
        let val = (value / 1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
    const formatPriceShort = (value) => {
        // console.log(value.toString().length)
        let val = (value / 1).toFixed(0).replace('.', ',')
        if (value >= 1000000000) {

            // console.log('formatPriceShort', val.toString().substring(value.toString().length - 6, 0))
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".").substring(value.toString().length - 6, 0).replace(/.$/, "") + " " + "tỷ"
        } else if (value < 1000000000 && value >= 10000000) {

            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".").substring(0, 3).replace(/.$/, "") + " " + "triệu"
        } else if (value < 10000000 && value >= 1000000) {

            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".").substring(0, 4).replace(/.$/, "") + " " + "triệu"
        } else {
            return value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
        }

    }
    const formatUpdatedAt = (updatedAt) => {
        if (updatedAt) {
            const date = new Date(updatedAt);
            return format(date, "dd/MM/yyyy, h:mm a");
        }

    }
    const formatCurrency = (value, currency_type) => {
        let currency = value.toLocaleString('it-IT', { style: 'currency', currency: currency_type });
        return currency;
    }
    const bytesToHuman = (bytes) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

        if (bytes === 0) return '0 Bytes';

        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);

        if (i === 0) return `${bytes} ${sizes[i]}`;

        return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
    }
    const convertToText = (number) => {
        let result = '';
        let index = 0;
        if (number === 0) {
            return 'không đồng';
        }
        while (number > 0) {
            let threeDigits = number % 1000000;
            number = Math.floor(number / 1000000);
            let text = '';

            if (threeDigits > 0) {
                text += threeDigits;
            }
            result = text;
            index++;
        }
        return result.trim() + ' triệu đồng';
    }

    return {
        formatDate,
        formatDateTime,
        formatPrice,
        formatPriceShort,
        formatUpdatedAt,
        formatCurrency,
        bytesToHuman,
        convertToText,
        formatDateShort,
        formatDateUse
    }

};