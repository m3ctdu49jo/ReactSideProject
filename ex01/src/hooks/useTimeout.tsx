import React, { useCallback, useEffect, useRef } from "react";


const useTimeout = (callback: () => void, delay: number) => {
    const callbackRef = useRef(callback);
    const timeoutRef: React.MutableRefObject<NodeJS.Timeout | undefined> = useRef(undefined);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const set = useCallback(() => {
        // 執行並回傳 timer ID
        timeoutRef.current = setTimeout(() => {
            callbackRef.current();
        }, delay);
    }, [delay]);

    const clear = useCallback(() => {
        if(timeoutRef.current) clearTimeout(timeoutRef.current);
    }, []);

    useEffect(() => {
        set();
        return () => {
            clear();
        }
    }, [set, clear]);

    const reset = useCallback(() => {
        clear();
        set();
    }, [clear, set])

    return { reset, clear };
};

export default useTimeout;