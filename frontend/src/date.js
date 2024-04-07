const stringPadding = (number) => {
    return number.toString().padStart(2, '0');
}

const currentDate = () => {
    return `${stringPadding(new Date().getHours())}:${stringPadding(new Date().getMinutes())}:${stringPadding(new Date().getSeconds())}`
}

export default currentDate;