import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/UI/Button";
import { Products } from "@/types";
import Image from "next/image";
import { GetServerSideProps } from "next";

interface DetailProductPageProps {
  items: Products | null;
  onClickProps: (product: Products) => void;
}

const DetailProductPage: React.FC<DetailProductPageProps> = ({
  items,
  onClickProps,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const router = useRouter();

  const handleBack = () => {
    router.push("/products");
  };

  if (!items) {
    return <div className="m-10 text-4xl">Loading... or failed to load</div>;
  }

  return (
    <div className="mx-10">
      <button
        onClick={handleBack}
        className="text-xs lg:text-base flex items-center text-grayshade-50 bg-grayshade-500 border border-grayshade-300 m-2 px-4 py-2 rounded-full"
      >
        <p className="text-white">Back</p>
      </button>
      <section className="mt-4 flex items-center justify-center max-w-7xl m-auto">
        <div
          key={`${items.id}`}
          className="flex lg:flex-row flex-col bg-zinc-900 border border-zinc-700 rounded-xl max-lg:p-4 max-md:p-4 lg:p-10"
        >
          <div className="space-y-4">
            {items.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-24 h-24 rounded-lg overflow-hidden ${
                  selectedImage === index ? "ring-2 ring-zinc-500" : ""
                }`}
              >
                <Image
                  src={image}
                  alt={`${items.title} ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </button>
            ))}
          </div>

          <div className="ms-4 max-md:m-2 max-sm:m-0 relative w-96 h-96">
            <Image
              src={items.images[selectedImage]}
              alt={items.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          <div className="lg:px-8 max-md:p-4 flex lg:min-w-96 flex-col gap-2 justify-center">
            <h2 className="text-start mb-1 text-3xl max-sm:text-2xl font-semibold">
              {items.title}
            </h2>
            <span className="w-max border border-zinc-600 rounded-2xl text-xs p-1 px-2">
              {items.category.name.replace(/\d+/g, "")}
            </span>
            <p className="text-lg text-start text-zinc-400 max-sm:text-base text-grayshade-50 my-10">
              {items.description}
            </p>
            <div className="flex justify-between items-end">
              <div className="text-start">
                <p className="text-grayshade-50 text-lg">Price</p>
                <p className="font-bold text-white text-2xl">$ {items.price}</p>
              </div>
              <Button onClickProps={() => onClickProps(items)}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { product } = context.query;

  if (!product || !Array.isArray(product) || product.length === 0) {
    return {
      notFound: true,
    };
  }

  const id = product[0];

  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
    const productData = await res.json();

    if (!productData) throw new Error("Product not found");

    return {
      props: {
        items: productData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { items: null },
    };
  }
};

export default DetailProductPage;
