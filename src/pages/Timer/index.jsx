import { useState, useEffect, useRef } from "react"

import { isNumber } from "../../utils/isNumber"

import { Container, Display, Controls } from "./styles"
import { ButtonIcon } from "../../components/ButtonIcon"

import pauseCircle from "../../assets/pause-circle.svg"
import playCircle from "../../assets/play-circle.svg"
import stopCircle from "../../assets/stop-circle.svg"
import stopWatch from "../../assets/stopwatch.svg"
import volumeMedium from "../../assets/volume-medium.svg"
import volumeMute from "../../assets/volume-mute.svg"

export function Timer() {
    const backgroundAudioRef = useRef(
        new Audio(
            "https://github.com/maykbrito/automatic-video-creator/blob/master/audios/bg-audio.mp3?raw=true"
        )
    )

    const kitchenTimerAudioRef = useRef(
        new Audio(
            "https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true"
        )
    )
    
    backgroundAudioRef.current.loop = true

    const [isActive, setIsActive] = useState(false)

    const [displayMinute, setDisplayMinute] = useState("25")
    const [displaySecond, setDisplaySecond] = useState("00")
    const [backgroundSoundActive, setBackgroundSoundActive] = useState(true)

    const intervalRef = useRef()
    const defaultMinuteRef = useRef("25")
    const minuteRef = useRef(displayMinute)
    const secondRef = useRef(displaySecond)

    function handleStart() {
        setIsActive(true)
    }

    function handlePause() {
        setIsActive(false)
    }

    function handleReset() {
        setIsActive(false)
        setDisplayMinute(defaultMinuteRef.current)
        setDisplaySecond("00")
        kitchenTimerAudioRef.current.play()
    }

    function handleSetTime() {
        const newTime = prompt("Digite o seu temporizador em minutos.")

        if (isNumber(newTime)) {
            setDisplayMinute(newTime.padStart(2, 0))
            defaultMinuteRef.current = newTime.padStart(2, 0)
        } else {
            alert("Valor inválido!")
        }
    }

    function handleToggleVolume() {
        setBackgroundSoundActive(!backgroundSoundActive)
    }

    function updateDisplay() {
        setDisplayMinute(minuteRef.current.toString().padStart(2, 0))
        setDisplaySecond(secondRef.current.toString().padStart(2, 0))
    }

    function countDown() {
        const currentMinute = minuteRef.current
        const currentSecond = secondRef.current

        let minuteUpdated = currentMinute
        let secondUpdated = currentSecond - 1

        if (secondUpdated < 0) {
            minuteUpdated = currentMinute - 1
            secondUpdated = 59
        }

        minuteRef.current = minuteUpdated
        secondRef.current = secondUpdated

        if (minuteRef.current < 0) {
            clearInterval(intervalRef.current)
            minuteRef.current = defaultMinuteRef.current
            secondRef.current = "00"
            kitchenTimerAudioRef.current.play()
            updateDisplay()
            setIsActive(false)
        } else {
            updateDisplay()
        }
    }

    useEffect(() => {
        if (isActive) {
            const interval = setInterval(countDown, 1000)
            intervalRef.current = interval
        }

        return () => clearInterval(intervalRef.current)
    }, [isActive])

    useEffect(() => {
        minuteRef.current = displayMinute
        secondRef.current = displaySecond
    }, [displayMinute, displaySecond])

    useEffect(() => {
        if (backgroundSoundActive && isActive) {
            backgroundAudioRef.current.play()
        } else {
            backgroundAudioRef.current.pause()
        }
    }, [backgroundSoundActive, isActive])

    return (
        <Container>
            <Display>
                <span>
                    {displayMinute}:{displaySecond}
                </span>
            </Display>
            <Controls>
                {isActive ? (
                    <>
                        <ButtonIcon icon={pauseCircle} onClick={handlePause} />
                        <ButtonIcon icon={stopCircle} onClick={handleReset} />
                    </>
                ) : (
                    <>
                        <ButtonIcon icon={playCircle} onClick={handleStart} />
                        <ButtonIcon icon={stopWatch} onClick={handleSetTime} />
                    </>
                )}
            </Controls>
            <ButtonIcon
                icon={backgroundSoundActive ? volumeMedium : volumeMute}
                onClick={handleToggleVolume}
            />
        </Container>
    )
}
