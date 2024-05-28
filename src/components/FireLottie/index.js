import { useSpring, animated } from '@react-spring/web';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import ReactLottie from 'react-lottie';
import * as Lottie from '../../assets/lotties/cute-fire-lottie.json';
import BornFire from '../../assets/images/bone-fire.webp';
import Column from '../Column';
import Spacer from '../Spacer';

const styles = {
    container: { alignItems: 'center', position: 'relative', width: 120 },
    bonFireImage: { width: 120, height: 120, position: 'absolute', bottom: -32 },
};

function FireLottie({ active }) {
    const [isPaused, setIsPaused] = useState(true);

    const options = {
        loop: true,
        autoplay: false,
        animationData: Lottie,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    useEffect(() => {
        setIsPaused(!active);
    }, [active]);

    const props = useSpring({ opacity: active ? 1 : 0.1, transform: `scale(${active ? 1 : 0.9})` });

    return (
        <Column style={styles.container}>
            <Image
                style={styles.bonFireImage}
                source={BornFire}
            />

            <animated.div style={props}>
                <ReactLottie
                    isClickToPauseDisabled
                    speed={0.7}
                    options={options}
                    height={90}
                    width={90}
                    isPaused={isPaused}
                />
            </animated.div>

            <Spacer spacing={3}/>
        </Column>
    );
}

export default FireLottie;
