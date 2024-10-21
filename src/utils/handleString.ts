export const createQueryString = (
  params: Record<string, string | undefined>,
) => {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `${key}=${encodeURIComponent(value!)}`)
    .join('&');
};
