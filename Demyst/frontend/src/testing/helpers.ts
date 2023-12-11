export const asMockFunction = <T = unknown, Y extends unknown[] = unknown[]>(
  func: (...args: Y) => T
): jest.MockedFunction<typeof func> => func as jest.MockedFunction<typeof func>;
