import { Products } from "@/types/index";
// import { LoginData, SignUpData } from "@/types/register";

// Parse Image URLs
const parseImageUrls = (images: string | string[]): string[] => {
  try {
    let parsedImages: string[];

    if (typeof images === "string") {
      parsedImages = JSON.parse(images);
    } else if (Array.isArray(images)) {
      parsedImages = images;
    } else {
      return [];
    }

    return parsedImages.map((url: string) => {
      url = url.replace(/^"|"$/g, "").trim();

      if (url.startsWith("https://i.imgur.com/")) {
        return url;
      }

      const fileName = url.split("/").pop() || "default.jpeg";

      return `https://i.imgur.com/${fileName}`;
    });
  } catch (e) {
    console.error("Error parsing image URLs:", e);
    return [];
  }
};

// Filter Products
const isValidTitle = (title: string): boolean => {
  return title.trim().length >= 5 && title !== "New Product";
};

const isValidImage = (imageUrl: string): boolean => {
  return !imageUrl.includes("https://i.imgur.com/any");
};

export const fetchProducts = async (): Promise<Products[]> => {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    const data: Products[] = await response.json();
    const processedData = data
      .filter(
        (product) =>
          isValidTitle(product.title) && isValidImage(product.images[0]),
      )
      .map((product) => ({
        ...product,
        images: parseImageUrls(product.images),
      }));
    console.log("Fetched Product:", processedData);
    return processedData;
  } catch (error) {
    console.error("Error fetching:", error);
    return [];
  }
};

// Fetch category id with params
export const fetchCategoryProducts = async (
  categoryId: number,
): Promise<Products[]> => {
  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/ss?categoryId=${categoryId}`,
    );
    const data: Products[] = await response.json();
    const processedData = data
      .filter(
        (product) =>
          isValidTitle(product.title) && isValidImage(product.images[0]),
      )
      .map((product) => ({
        ...product,
        images: parseImageUrls(product.images),
      }));
    console.log("Fetched Product for Category:", processedData);
    return processedData;
  } catch (error) {
    console.error("Error fetching:", error);
    return [];
  }
};

// Fetch detailed product
export const fetchProductById = async (id: number): Promise<Products> => {
  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/${id}`,
    );
    const data: Products = await response.json();
    return {
      ...data,
      images: parseImageUrls(data.images),
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// Fetch related products by title
export const fetchRelatedProducts = async (
  title: string,
): Promise<Products[]> => {
  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products?title=${title}`,
    );
    const data: Products[] = await response.json();
    const processedData = data
      .filter(
        (product) =>
          isValidTitle(product.title) && isValidImage(product.images[0]),
      )
      .map((product) => ({
        ...product,
        images: parseImageUrls(product.images),
      }));
    console.log("Fetched Related Products:", processedData);
    return processedData;
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
};

// ============
