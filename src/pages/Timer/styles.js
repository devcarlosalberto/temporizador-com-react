import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.8rem;

    > button {
        position: absolute;
        right: 4rem;
        bottom: 3.2rem;
    }
`

export const Display = styled.div`
    span {
        font-size: 8.8rem;
    }
`

export const Controls = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_SECONDARY};
    border-radius: 99.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3.2rem;
    padding: 2.2rem 3.4rem;
`
