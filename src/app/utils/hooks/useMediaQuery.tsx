import { useEffect, useState } from "react";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Early return if window is undefined (on the server side)
    return;
  }, [query]);

  return matches;
}

export default useMediaQuery;
