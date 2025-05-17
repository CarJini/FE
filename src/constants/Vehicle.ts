import StariaImage from "@/assets/images/staria.png";
import Gn7Image from "@/assets/images/gn7.png";
import { SvgProps } from "react-native-svg";
import { FC } from "react";
import HyundaiLogo from "@/assets/images/hyundai.svg";

export const modelImageMap: Record<string, any> = {
  Staria: StariaImage,
  "Grandeur gn7": Gn7Image,
};

export type BrandName = "Hyundai";
export const brandLogoMap: Record<BrandName, FC<SvgProps>> = {
  Hyundai: HyundaiLogo,
};
