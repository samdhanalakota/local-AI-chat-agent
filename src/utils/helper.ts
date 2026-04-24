export const logger = (message: string, data?: unknown) => {
  const time = new Date().toISOString();
  console.error(`[${time}] ${message}`, data ?? "");
};
