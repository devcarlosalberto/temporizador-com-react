export function isNumber(string) {
    const regex = /^[0-9]+$/
    return regex.test(string)
}
