import { useEffect, useState } from "react";

export function useMockedRequest<T>(value: T) {
  const [mockedRequest, setMockedRequest] = useState<T | undefined>(undefined);

  useEffect(() => {
    const rndTime = Math.round(Math.random() * 5000);

    const timeout = setTimeout(() => {
      setMockedRequest(value);
    }, rndTime);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return mockedRequest;
}
