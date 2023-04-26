import { Container } from "./styles"

export function ButtonIcon({ icon, onClick, ...rest }) {
    const buttonPressAudio = new Audio(
        "https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true"
    )

    function handleOnClick() {
        buttonPressAudio.play()
        onClick && onClick()
    }

    return (
        <Container onClick={handleOnClick} {...rest}>
            <img src={icon} />
        </Container>
    )
}
