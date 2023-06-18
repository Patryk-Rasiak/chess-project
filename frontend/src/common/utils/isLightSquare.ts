export const isLightSquare = (position: string, index: number) => {
  const row = position[1];
  const isEven = (x: number) => !(x % 2);

  return (
    (isEven(Number(row)) && !isEven(index + 1)) ||
    (isEven(index + 1) && !isEven(Number(row)))
  );
};
