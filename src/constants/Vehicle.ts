import StariaImage from "@/assets/images/staria.png";
import K5Image from "@/assets/images/k5.png";
import Dn8Image from "@/assets/images/dn8.png";
import Sm6Image from "@/assets/images/sm6.png";
import Gn7Image from "@/assets/images/gn7.png";
import { SvgProps } from "react-native-svg";
import { FC } from "react";
import HyundaiLogo from "@/assets/images/hyundai.svg";
import KiaLogo from "@/assets/images/kia.svg";
import SamsungLogo from "@/assets/images/samsung.svg";

export const modelImageMap: Record<string, any> = {
  Staria: StariaImage,
  "Grandeur gn7": Gn7Image,
  K5: K5Image,
  Sonata: Dn8Image,
  SM6: Sm6Image,
};

export type BrandName = "Hyundai" | "Kia" | "Samsung";
export const brandLogoMap: Record<BrandName, FC<SvgProps>> = {
  Hyundai: HyundaiLogo,
  Kia: KiaLogo,
  Samsung: SamsungLogo,
};
