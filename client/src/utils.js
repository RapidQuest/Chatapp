const stringToHash = (string) => {
  if (!string) return 0;

  string = String(string);
  let hash = 0;

  if (string.length === 0 || !string) return hash;

  for (let i = 0; i < string.length; i++) {
    const char = string.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
};

const getHash = (str1, str2) => {
  if (!str1 && !str2) return 0;

  str1 = String(str1);
  str2 = String(str2);

  const hash1 = stringToHash(str1 + str2);
  const hash2 = stringToHash(str2 + str1);

  return String(Math.abs(hash1 + hash2));
};

export { getHash };
