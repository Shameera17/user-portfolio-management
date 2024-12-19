export const extractErrorMessage = (error: any): string => {
  return error.response?.data?.message || "An unexpected error occurred.";
};
