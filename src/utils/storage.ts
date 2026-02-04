export const saveData = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));

export const getData = (key: string, fallback: any) =>
  JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
