import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';

const minutesToMs = (min) => min * 1000 * 60;

const formatTime = (time) => time < 10 ? `0${time}` : time;


export const Countdown = ({
    minutes = 20,
    isPaused,
    onProgress,
    onEnd
}) => {
    const interval = React.useRef(null);

    const [millis, setMillis] = useState(null);

    const countDown = () => {
        setMillis((time) => {
            if (time === 0) {
                clearInterval(interval.current);
                onEnd();
                return time;
            }

            const timeLeft = time - 1000;
            return timeLeft;
        })
    }

    useEffect(() => {
        setMillis(minutesToMs(minutes))
    }, [minutes])

    useEffect(() => {
        onProgress(millis / minutesToMs(minutes));
    }, [millis])

    useEffect(() => {
        if (isPaused) {
            if (interval.current) clearInterval(interval.current);
            return;
        }

        interval.current = setInterval(countDown, 1000);

        return () => clearInterval(interval.current)
    }, [isPaused])

    const minute = Math.floor(millis / 1000 / 60) % 60;
    const second = Math.floor(millis / 1000) % 60;
    return (
        <Text style={styles.text}>{formatTime(minute)}:{formatTime(second)}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: fontSizes.xxxl,
        fontWeight: 'bold',
        color: colors.white,
        padding: spacing.lg,
        backgroundColor: 'rgba(94,132,226,0.3)'
    }
})