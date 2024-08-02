"use client";
import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClickAway, useDebounce } from "react-use";
import Link from "next/link";
import { Api } from "@/services/api-client";
import { Product } from "@prisma/client";
import Image from "next/image";

interface ISearchInputProps {
  className?: string;
}

const SearchInput: React.FunctionComponent<ISearchInputProps> = ({
  className,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [onFocus, setOnFocus] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);
  const ref = React.useRef(null);
  useClickAway(ref, () => {
    setOnFocus(false);
  });

  useDebounce(
    async () => {
      try {
        const { data } = await Api.products.search(searchQuery);
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    },
    300,
    [searchQuery]
  );

  const handleClickLink = () => {
    setOnFocus(false);
    setSearchQuery("");
  };
  return (
    <>
      {onFocus && <div className="fixed inset-0 bg-black/50 z-30" />}
      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11",
          onFocus && "z-30"
        )}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          type="text"
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          placeholder="Поиск пиццы..."
          onFocus={() => setOnFocus(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div
          className={cn(
            "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
            onFocus && "visible opacity-100 top-12"
          )}
        >
          {products.length > 0 ? (
            products.map((item) => (
              <Link
                onClick={handleClickLink}
                key={item.id}
                href={`/product/${item.id}`}
              >
                <div className="px-3 py-2 hover:bg-primary/10 cursor-pointer flex items-center gap-1">
                  <Image
                    className="rounded-sm"
                    src={item.imageUrl}
                    width={32}
                    height={32}
                    alt={item.name}
                  />
                  <p>{item.name}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="px-3 py-2">По вашему запросу ничего не найдено</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchInput;
