import { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";
import {
  ColorScheme,
  ColorWeight,
  RadiusNest,
  RadiusSize,
  ShadowSize,
  SpacingToken,
  TextSize,
  TextType,
  TextVariant,
  TextWeight,
} from "./types";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number | string;
  rows?: number | string;
  tabletColumns?: "1col" | "2col" | "3col";
  mobileColumns?: "1col" | "2col" | "3col";
  tabletRows?: number | string;
  mobileRows?: number | string;
}

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
  justifyContent?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
  wrap?: boolean;
  flex?: number;
  tabletDirection?: "row" | "column";
  mobileDirection?: "row" | "column";
}

export interface TextProps<T extends ElementType = "span">
  extends HTMLAttributes<T> {
  as?: T;
  variant?: TextVariant;
  wrap?: CSSProperties["textWrap"];
  size?: TextSize;
  weight?: TextWeight;
}

export interface SizeProps extends HTMLAttributes<HTMLDivElement> {
  width?: number | SpacingToken;
  height?: number | SpacingToken;
  maxWidth?: number | SpacingToken;
  minWidth?: number | SpacingToken;
  minHeight?: number | SpacingToken;
  maxHeight?: number | SpacingToken;
  fit?: boolean,
  fitWidth?: boolean,
  fitHeight?: boolean,
  fill?: boolean,
  fillWidth?: boolean,
  fillHeight?: boolean,
}

export interface SpacingProps extends HTMLAttributes<HTMLDivElement> {
  padding?: SpacingToken;
  paddingLeft?: SpacingToken;
  paddingRight?: SpacingToken;
  paddingTop?: SpacingToken;
  paddingBottom?: SpacingToken;
  paddingX?: SpacingToken;
  paddingY?: SpacingToken;
  margin?: SpacingToken;
  marginLeft?: SpacingToken;
  marginRight?: SpacingToken;
  marginTop?: SpacingToken;
  marginBottom?: SpacingToken;
  marginX?: SpacingToken;
  marginY?: SpacingToken;
  gap?: SpacingToken;
  top?: SpacingToken;
  right?: SpacingToken;
  bottom?: SpacingToken;
  left?: SpacingToken;
}

export interface StyleProps extends HTMLAttributes<HTMLDivElement> {
  textVariant?: TextVariant;
  textSize?: TextSize;
  textType?: TextType;
  textWeight?: TextWeight;
  background?:
    | `${ColorScheme}-${ColorWeight}`
    | "surface"
    | "page"
    | "transparent";
  alpha?: `${ColorScheme}-${ColorWeight}`;
  solid?: `${ColorScheme}-${ColorWeight}`;
  border?: `${ColorScheme}-${ColorWeight}` | "surface" | "transparent";
  borderStyle?: "solid-1" | "solid-2";
  radius?: RadiusSize | `${RadiusSize}-${RadiusNest}`;
  shadow?: ShadowSize;
}

export interface ConditionalProps extends HTMLAttributes<HTMLDivElement> {
  hide?: "s" | "m";
  show?: "s" | "m";
}

export interface DisplayProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  position?: CSSProperties["position"];
  overflow?: CSSProperties["overflow"];
  overflowX?: CSSProperties["overflowX"];
  overflowY?: CSSProperties["overflowY"];
  zIndex?: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export interface CommonProps extends HTMLAttributes<HTMLDivElement> {
  onBackground?: `${ColorScheme}-${ColorWeight}`;
  onSolid?: `${ColorScheme}-${ColorWeight}`;
  align?: CSSProperties["textAlign"];
  className?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
}
