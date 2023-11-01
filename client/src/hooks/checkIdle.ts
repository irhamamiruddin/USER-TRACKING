import { useEffect, useState } from "react";

const checkIdle = () => {
    const [lastActivityTime, setLastActivityTime] = useState<any>(null);
    const [idle, setIdle] = useState(false);

    // When Last Activity Time is set, set timeout to check for idle
    useEffect(() => {
        const idleThreshold = 5000; // 5 seconds in milliseconds

        const timeout = setTimeout(() => {
            console.log("User is idle");
            setIdle(true);
        }, idleThreshold);

        return () => clearTimeout(timeout);
    }, [lastActivityTime]);

    // Reset idle state when the user is active
    const resetIdle = () => {
        console.log("Event fired");
        setIdle(false);
        // Set Last Activity Time whenever the user is active
        setLastActivityTime(Date.now());
    };

    // Check whether the user is idle or not from mousemove and keypress events
    useEffect(() => {
        document.addEventListener("mousemove", resetIdle);
        document.addEventListener("keypress", resetIdle);

        return () => {
            document.removeEventListener("mousemove", resetIdle);
            document.removeEventListener("keypress", resetIdle);
        };
    }, []);

    return idle;

}

export default checkIdle;