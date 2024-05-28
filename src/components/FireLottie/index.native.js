import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Image } from 'expo-image';
import Lottie from '../../assets/lotties/cute-fire-lottie.json';
import BornFire from '../../assets/images/bone-fire.webp';
import Column from '../Column';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const styles = StyleSheet.create({
    container: { alignItems: 'center', position: 'relative' },
    bonFireContainer: { position: 'absolute', bottom: -30 },
    bonFireImage: { width: 120, height: 120 },
    fireLottie: {
        width: 110,
        height: 110,
    },
});

function FireLottie({ active }) {
    const animationRef = useRef(null);
    useEffect(() => {
        if (active) {
            animationRef.current?.resume();
        } else {
            animationRef.current?.pause();
        }
    }, [active]);

    const opacityAnimation = useRef(new Animated.Value(0.1)).current;
    const scaleAnimation = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        Animated.timing(opacityAnimation, {
            toValue: active ? 1 : 0.1,
            useNativeDriver: true,
        }).start();

        Animated.timing(scaleAnimation, {
            toValue: active ? 1 : 0.9,
            useNativeDriver: true,
        }).start();
    }, [active, opacityAnimation, scaleAnimation]);

    const animationStyle = { 
        opacity: opacityAnimation,
        transform: [{ scale: scaleAnimation }],
    };

    return (
        <Column style={styles.container}>
            <Column style={styles.bonFireContainer}>
                <Image
                    style={styles.bonFireImage}
                    source={BornFire}
                />
            </Column>

            <AnimatedLottieView
                ref={animationRef}
                style={[styles.fireLottie, animationStyle]}
                source={Lottie}
                speed={0.7}
                autoPlay={false}
                loop={true}
            />
        </Column>
    );
}

export default FireLottie;
