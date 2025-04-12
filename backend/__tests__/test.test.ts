const sum = (a: number, b: number) => a + b;
test("Suma 1 + 2 debe ser igual a 3", () => {
  expect(sum(1, 2)).toBe(3);
});
