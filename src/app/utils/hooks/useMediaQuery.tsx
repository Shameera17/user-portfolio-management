import {useEffect, useState} from "react";

function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        // Early return if window is undefined (on the server side)
        if (typeof window === "undefined") return;

        const media = window.matchMedia(query);

        const handleChange = () => setMatches(media.matches);
        handleChange(); // Set initial value

        // Listen for changes to the media query
        media.addEventListener("change", handleChange);

        return () => media.removeEventListener("change", handleChange);
    }, [query]);

    return matches;
}

export default useMediaQuery;
