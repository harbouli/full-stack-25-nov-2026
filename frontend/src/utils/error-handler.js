import axios from "axios";

export const serializeError = (error) => {
  // 1. Canceled request
  if (axios.isCancel(error) || error.code === "ERR_CANCELED") {
    return { message: "Request canceled", status: null, isCanceled: true };
  }

  // 2. Server responded with an error (4xx, 5xx)
  if (error.response) {
    const { status, data } = error.response;
    const message =
      data?.message ||
      data?.error ||
      (status >= 500
        ? "Server error. Please try again later."
        : "Request failed.");

    return { message, status, isCanceled: false };
  }

  // 3. No response received (Network error or Timeout)
  if (error.request) {
    const isTimeout = error.code === "ECONNABORTED";
    return {
      message: isTimeout
        ? "Request timed out."
        : "Network error. Check your connection.",
      status: null,
      isCanceled: false,
    };
  }

  // 4. Anything else (code/setup error)
  return {
    message: error?.message || "An unexpected error occurred.",
    status: null,
    isCanceled: false,
  };
};
