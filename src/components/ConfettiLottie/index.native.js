import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import Lottie from '../../assets/lotties/confetti.json';

function ConfettiLottie({ active }) {
    const animationRef = useRef(null);
    useEffect(() => {
        if (active) {
            animationRef.current?.play();
        }
    }, [active]);

    return (
        <LottieView
            ref={animationRef}
            style={StyleSheet.absoluteFill}
            source={Lottie}
            speed={1}
            autoPlay={false}
            loop={false}
            resizeMode={'cover'}
        />
    );
}

export default ConfettiLottie;
