import stringMap from './stringMap';

export default tourStepPropsMap = {
    'FINGER_PRINT': {
        zone: 1,
        text: stringMap['tour-steps.finger-print.description'],
        maskOffset: 16,
        shape: 'circle',
    },
    'RESET': {
        zone: 2,
        text: stringMap['tour-steps.reset.description'],
        maskOffset: 16,
        shape: 'circle',
    },
    'TIMER': {
        zone: 3,
        text: stringMap['tour-steps.timer.description'],
        maskOffset: 16,
    },
    'FIRE_LOTTIE': {
        zone: 4,
        text: stringMap['tour-steps.fire-lottie.description'],
        maskOffset: 16,
    },
    'LATEST_RECORDS': {
        zone: 5,
        text: stringMap['tour-steps.latest-records.description'],
        maskOffset: 16,
    },
    'MODE_SWITCH': {
        zone: 6,
        text: stringMap['tour-steps.mode-switch.description'],
        maskOffset: 16,
        shape: 'circle',
    },
};