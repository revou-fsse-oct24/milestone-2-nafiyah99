
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

export interface FormRegistErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface FormLoginErrors{
  email?: string;
  password?: string;
}

export interface MainLayoutProps {
  children: React.ReactNode;
}

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface CartItem {
  product: Products;
  quantity: number;
}

export interface CartProps {
  cart: CartItem[];
  onRemove: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

export interface CartItemProps {
  item: CartItem;
  onRemove: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

export interface CartContextType {
  cart: CartItem[];
  onAddToCart: (product: Products) => void;
  onRemoveFromCart: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

export interface AuthContextType {
  user: { name?: string; email?: string } | null;
  token: string | null;
  cart: any[] | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}