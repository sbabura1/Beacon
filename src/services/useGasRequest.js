import { useCallback, useRef, useState } from "react";
import { runGas } from "./gas.js";

export function useGasRequest() {
  const requestIdRef = useRef(0);
  const [state, setState] = useState({
    status: "idle",
    data: null,
    error: null
  });

  const execute = useCallback(async (functionName, ...args) => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setState({ status: "loading", data: null, error: null });

    try {
      const data = await runGas(functionName, ...args);
      if (requestId !== requestIdRef.current) return data;
      setState({ status: "success", data, error: null });
      return data;
    } catch (error) {
      if (requestId !== requestIdRef.current) throw error;
      setState({
        status: "failure",
        data: null,
        error: error instanceof Error ? error : new Error(String(error))
      });
      throw error;
    }
  }, []);

  return {
    ...state,
    isLoading: state.status === "loading",
    execute
  };
}
