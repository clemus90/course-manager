export const isCourseNumberValid = (courseNumber: string) => {
    const numericVal = parseInt(courseNumber)
    const onlyDigits = courseNumber.match(/^\d+$/)
    return (
        onlyDigits !== null &&
        !isNaN(numericVal) &&
        numericVal >= 0 &&
        numericVal < 1000
    )
}
