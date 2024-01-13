import React, { useEffect, useState } from 'react'

export default function LandingCounter({ count, speed }) {

    const [courseCounter, setCourseCounter] = useState(0)

    useEffect(() => {
        let interval = setInterval(() => {
            setCourseCounter((prevCount) => prevCount + 1)
        }, speed)
        if (courseCounter >= count) {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [courseCounter])
    return  <span className="landing-status__count">{courseCounter}</span>
    
}
