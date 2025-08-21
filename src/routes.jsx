import App from "./App";
import ErrorPage from "./ErrorPage";
import Cart from "./components/Cart";
import ProductDetailView from "./components/ItemDetailView";
import Shop from "./components/Shop";
import { Navigate } from "react-router-dom";

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/shop" replace />
      },
      {
        path: 'shop',
        element: <Shop />
      },
      {
        path: 'shop/:productId',
        element: <ProductDetailView />
      },
      {
        path: 'cart',
        element: <Cart />
      },

    ]
  },
]

export default routes;