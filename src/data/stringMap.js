import { NativeModules, Platform } from "react-native";

const stringMap = {
    'en_US': {
        'tour-steps.finger-print.description': 'Press this button to start the timer.',
        'tour-steps.reset.description': 'Press this button to reset the timer.',
        'tour-steps.timer.description': 'View the remaining time on the timer.',
        'tour-steps.fire-lottie.description': 'This animation will play while the timer is active.',
        'tour-steps.latest-records.description': 'Check your records from the past week.',
        'tour-steps.mode-switch.description': 'Toggle between display modes using this button.',
        'tour-steps.show-guide.description': 'Press this button to show the guide again.',
        'tour-steps.buttons.prev': 'Previous',
        'tour-steps.buttons.next': 'Next',
        'tour-steps.buttons.skip': 'Skip',
        'tour-steps.buttons.finish': 'Finish',
    },
    'ko_KR': {
        'tour-steps.finger-print.description': '타이머 활성화를 위해 지문 버튼을 누르세요.',
        'tour-steps.reset.description': '타이머 초기화를 위한 버튼입니다.',
        'tour-steps.timer.description': '남은 시간을 확인하세요.',
        'tour-steps.fire-lottie.description': '지문 버튼을 누르는 동안 불꽃이 일렁입니다.',
        'tour-steps.latest-records.description': '지난 일주일 간의 사용 기록을 확인하세요.',
        'tour-steps.mode-switch.description': '버튼을 눌러 화면 모드를 전환하세요.',
        'tour-steps.show-guide.description': '버튼을 눌러 앱 사용 가이드를 다시 확인하세요.',
        'tour-steps.buttons.prev': '이전',
        'tour-steps.buttons.next': '다음',
        'tour-steps.buttons.skip': '생략',
        'tour-steps.buttons.finish': '닫기',
    },
};

const locale = Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier;

export default stringMap[locale === 'ko_KR' ? 'ko_KR' : 'en_US'];