
export interface Products {
  id: number; // Unique identifier for the product
  title: string; // Name or title of the product
  price: number; // Price of the product
  description: string; // Detailed description of the product
  category: Category; // Category of the product
  images: string[]; // Array of image URLs for the product
}


export interface Category {
  id: number; // Unique identifier for the category
  name: string; // Name of the category
  image: string; // URL of the category's image
}


export interface User {
  id: number; // Unique identifier for the user
  email: string; // Email address of the user
  name: string; // Full name of the user
  role: string; // Role of the user (e.g., "admin", "customer")
  avatar: string; // URL of the user's profile picture
}


export interface LoginData {
  onSubmit(
    email: string, // Email address used for login
    password: string // Password used for login
  ): void;
}


export interface RegisterData extends LoginData {
  name: string; // Full name of the user
  avatar: string; // URL of the user's profile picture
}

export interface CartItem extends Products {
  quantity: number; // Number of this product in the cart
}

export interface FormErrors {
  email?: string;
  password?: string;
}