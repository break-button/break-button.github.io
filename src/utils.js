function attachLeadingZero(number) {
    return String(number).length >= 2 ? `${number}` : `0${number}`;
}

const convertSecondsToMinutesAndSeconds = (seconds) => {
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return { minutes, seconds: remainingSeconds };
};

const displayTime = (seconds) => {
    const time = convertSecondsToMinutesAndSeconds(seconds);

    return `${attachLeadingZero(time.minutes)}:${attachLeadingZero(time.seconds)}`;
};

export { attachLeadingZero, convertSecondsToMinutesAndSeconds, displayTime };
