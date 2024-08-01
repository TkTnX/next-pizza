"use client";
import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClickAway } from "react-use";
import Link from "next/link";
import { Api } from "@/services/api-client";

interface ISearchInputProps {
  className?: string;
}

const SearchInput: React.FunctionComponent<ISearchInputProps> = ({
  className,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [onFocus, setOnFocus] = React.useState(false);
  const ref = React.useRef(null);
  useClickAway(ref, () => {
    setOnFocus(false);
  });

  React.useEffect(() => {
    Api.products.search(searchQuery);
  }, [searchQuery]);

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
          <Link href={`/product/2`}>
            <div className="px-3 py-2 hover:bg-primary/10 cursor-pointer flex items-center gap-1">
              {/*  eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="rounded-sm"
                src="http://localhost:3000/_next/image?url=https%3A%2F%2Fmedia.dodostatic.net%2Fimage%2Fr%3A292x292%2F11EE7D610D2925109AB2E1C92CC5383C.avif&w=256&q=75"
                width={32}
                height={32}
                alt="pizza 1"
              />
              <p>Пицца 1</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SearchInput;
