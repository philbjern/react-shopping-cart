import App from "./App";
import ErrorPage from "./ErrorPage";
import Cart from "./components/Cart";
import Shop from "./components/Shop";

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: 'shop',
        element: <Shop />
      },
      {
        path: 'cart',
        element: <Cart />
      },

    ]
  },
]

export default routes;