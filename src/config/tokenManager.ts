const blacklistedTokens: Set<string> = new Set();

export const isTokenBlacklisted = (token: string) => {
  return blacklistedTokens.has(token);
};

export const blacklistToken = (token: string) => {
  blacklistedTokens.add(token);
};

export const removeTokenFromBlacklist = (token: string) => {
  blacklistedTokens.delete(token);
};
