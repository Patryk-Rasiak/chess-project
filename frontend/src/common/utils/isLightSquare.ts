export const isLightSquare = (
  position: string,
  index: number,
  color: string
) => {
  const row = position[1];
  const isEven = (x: number) => !(x % 2);

  if (color === "w") {
    return (
      (isEven(Number(row)) && !isEven(index + 1)) ||
      (isEven(index + 1) && !isEven(Number(row)))
    );
  } else {
    // Reverse the logic for black player
    return (
      (!isEven(Number(row)) && !isEven(index + 1)) ||
      (isEven(index + 1) && isEven(Number(row)))
    );
  }
};
