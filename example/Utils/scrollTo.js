export default (to = 0, duration = 800) => {
    if (typeof window === 'undefined') return

    const element = document.scrollingElement || document.documentElement
    const start = element.scrollTop
    const change = to - start
    const startDate = +new Date()

    const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2
        if (t < 1) return (c / 2) * t * t + b
        t--
        return (-c / 2) * (t * (t - 2) - 1) + b
    }

    const animateScroll = () => {
        const currentDate = +new Date()
        const currentTime = currentDate - startDate
        element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration))

        if (currentTime < duration) {
            requestAnimationFrame(animateScroll)
        } else {
            element.scrollTop = to
        }
    }

    animateScroll()
}
