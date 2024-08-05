/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";

interface IProductImageProps {
  src: string;
  alt: string;
  className?: string;
  size: 20 | 30 | 40;
}

const ProductImage: React.FunctionComponent<IProductImageProps> = ({
  src,
  alt,
  className,
  size = 20,
}) => {
  return (
    <div className={cn("flex items-center justify-center flex-1 relative w-full", className)}>
      <img
        src={src}
        alt={alt}
        className={cn(
          "relative left-2 top-2 transition-all z-10 duration-300",
          {
            "w-[300px] h=[300px]": size === 20,
            "w-[400px] h=[400px]": size === 30,
            "w-[500px] h=[500px]": size === 40,
          }
        )}
          />
          
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray w-[450px] h-[450px]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray w-[370px] h-[370px]" />
    </div>
  );
};

export default ProductImage;
