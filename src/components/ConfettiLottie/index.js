import React from 'react';
import ReactLottie from 'react-lottie';
import * as Lottie from '../../assets/lotties/confetti.json';

function ConfettiLottie({ active }) {
    const options = {
        loop: false,
        autoplay: false,
        animationData: Lottie,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <ReactLottie
            isClickToPauseDisabled
            style={{ position: 'absolute', top: 0 }}
            speed={1}
            options={options}
            height="100%"
            width="100%"
            isPaused={!active}
            isStopped={!active}
        />
    );
}

export default ConfettiLottie;
