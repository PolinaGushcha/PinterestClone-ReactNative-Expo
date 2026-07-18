import { Dimensions } from "react-native";
import { spacing } from "../styles";

const windowWidth = Dimensions.get("window").width;
export const MASONRY_GAP = spacing.md;
export const MASONRY_COLUMN_WIDTH = (windowWidth - MASONRY_GAP * 3) / 2;

const MIN_HEIGHT = 140;
const MAX_HEIGHT = 520;
const FALLBACK_ASPECT = 1.3;

export const getPinHeight = (item: { width?: number; height?: number }) => {
  const aspect =
    item?.width && item?.height ? item.height / item.width : FALLBACK_ASPECT;
  return Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, MASONRY_COLUMN_WIDTH * aspect));
};

export type MasonryColumn<T> = { item: T; height: number }[];

export const distributeMasonry = <T extends { width?: number; height?: number }>(
  items: T[]
): [MasonryColumn<T>, MasonryColumn<T>] => {
  const left: MasonryColumn<T> = [];
  const right: MasonryColumn<T> = [];
  let leftHeight = 0;
  let rightHeight = 0;

  items.forEach((item) => {
    const height = getPinHeight(item);
    if (leftHeight <= rightHeight) {
      left.push({ item, height });
      leftHeight += height;
    } else {
      right.push({ item, height });
      rightHeight += height;
    }
  });

  return [left, right];
};
