import styles from "./Piece.module.scss";
import PropTypes from "prop-types";
import { useRef } from "react";
import { Square } from "chess.js";

export const Piece = ({
  name,
  pos,
  setFromPos,
}: {
  name: string;
  pos: string;
  setFromPos: (pos: string) => void;
}) => {
  const element = useRef<HTMLImageElement | null>(null);

  let image;

  if (name === "") {
    image = "";
  } else {
    const color = name === name.toUpperCase() ? "w" : "b";
    const imageName = color + name.toUpperCase();
    image = `src/assets/pieces/${imageName}.png`;
  }

  const handleDragStart = () => {
    setFromPos(pos as Square);
    setTimeout(() => {
      if (element.current) {
        element.current.style.display = "none";
      }
    }, 0);
  };
  const handleDragEnd = () => {
    if (element.current) {
      element.current.style.display = "block";
    }
  };

  const handleClick = () => console.log({ name, pos });

  return (
    <img
      className={styles.piece}
      src={image}
      alt=""
      draggable={true}
      ref={element}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    />
  );
};

Piece.prototype = {
  name: PropTypes.string.isRequired,
  pos: PropTypes.string.isRequired,
  setFromPos: PropTypes.func.isRequired,
};
