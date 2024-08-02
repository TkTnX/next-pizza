import * as React from "react";

interface IProductPageProps {
  id: string;
  params: {
    id: string;
  };
}

const ProductPage: React.FunctionComponent<IProductPageProps> = ({
  params,
}) => {
  return <div>id = {params.id}</div>;
};

export default ProductPage;
