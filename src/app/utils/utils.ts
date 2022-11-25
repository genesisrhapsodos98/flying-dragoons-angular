export default class Utils {
  public static getRandomDelay(minMs: number, maxMs: number): number {
    return Math.random() * (maxMs - minMs) + minMs;
  }
}