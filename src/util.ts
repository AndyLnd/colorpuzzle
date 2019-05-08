export const rndInt = (max: number): number => Math.floor(Math.random() * max);

export const rndArrayElement = <T>(array: T[]): T => array[rndInt(array.length)];

export const wrap = (number: number, max: number): number => (max === 0 ? number : ((number % max) + max) % max);
