import fs from "node:fs";

export const has = async (key: string) => {
  return fs.existsSync(`.cache/${key}`);
};

export const del = async (key: string) => {
  fs.rmSync(`.cache/${key}`);
};

export const get = async (key: string) => {
  const s = fs.readFileSync(`.cache/${key}`, "utf8");
  return JSON.parse(s);
};

export const set = async (key: string, val: any) => {
  fs.mkdirSync(".cache", { recursive: true });
  fs.writeFileSync(`.cache/${key}`, JSON.stringify(val));
};

export const hash = (val: any) => {
  const key = JSON.stringify(val);
  return cyrb53(key).toString();
};

// https://stackoverflow.com/a/52171480
const cyrb53 = (str: string, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return (h2 >>> 0).toString(16).padStart(8, "0") + (h1 >>> 0).toString(16).padStart(8, "0");
};
