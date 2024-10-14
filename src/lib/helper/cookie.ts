export const getCookie = (name: string) => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
  return cookieValue ? decodeURIComponent(cookieValue) : null;
};

export const storeCookie = (name: string, value: string) => {
  const duration = 3600; // 1 hour in seconds
  document.cookie = `${name}=${value}; path=/; max-age=${duration};`;
};

export const removeCookie = (name: string) => {
  document.cookie = `cookieName=${name}; max-age=0; path=/;`;
};
