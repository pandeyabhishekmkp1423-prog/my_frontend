import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import PriceList from "./pages/PriceList";
import Register from"./pages/register";
import Login from "./pages/login";
import Header from "./component/Header";
import Footer from "./component/Footer";
import LoadingSpinner from "./component/LoadingSpinner";
import ErrorBoundary from "./component/ErrorBoundary";
import { CartProvider } from "./pages/PriceListContext";

const Contact = React.lazy(() => import("./pages/Contact"));
const About = React.lazy(() => import("./pages/About"));
const CartPage = React.lazy(() => import("./pages/Cart"));

const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">
      <ErrorBoundary>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </React.Suspense>
      </ErrorBoundary>
    </main>
    <Footer />
  </div>
);

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

      // ✅ New routes for authentication
     { path:"/login" , element:<Login />},
     { path:"/register", element:<Register/>},
    ],
  },
]);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
