// src/App.jsx
import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// Regular imports
import Dashboard from "./pages/Dashboard";
import PriceList from "./pages/PriceList";
import Header from "./component/Header";
import Footer from "./component/Footer";
import LoadingSpinner from "./component/LoadingSpinner";
import CartIcon from "./component/CartIcon";

// Context providers
import { CartProvider } from "./pages/CartContext";
import { OrdersProvider } from "./pages/OrdersContext";

// Lazy-loaded pages
const LearnMore = React.lazy(() => import("./pages/LearnMore"));
const Contact = React.lazy(() => import("./pages/Contact"));
const About = React.lazy(() => import("./pages/About"));
const CartPage = React.lazy(() => import("./pages/Cart"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Orders = React.lazy(() => import("./pages/Orders"));
const PickupForm = React.lazy(() => import("./component/PickupForm")); // Added PickupForm

// Layout component
const Layout = () => (
  <div className="min-h-screen flex flex-col relative">
    <Header />
    <main className="flex-grow">
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
    <CartIcon /> {/* Floating cart icon */}
  </div>
);

// Router setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "price", element: <PriceList /> },
      { path: "contact", element: <Contact /> },
      { path: "about", element: <About /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <Checkout /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "learn-more", element: <LearnMore /> },
      { path: "orders", element: <Orders /> },
      { path: "pickup-form", element: <PickupForm /> }, // PickupForm route
    ],
  },
]);

export default function App() {
  return (
    <CartProvider>
      <OrdersProvider>
        <RouterProvider router={router} />
      </OrdersProvider>
    </CartProvider>
  );
}
