function getWords(text: string, numberOfWords: number) {
  if (!text || typeof text !== "string") return "";
  const words = text.trim().split(/\s+/); // split on one or more spaces
  return words.slice(0, numberOfWords).join(" ");
}

export { getWords };
