import { Route, Routes } from 'react-router-dom';

// importing the component from the library
import { Orders } from '@chrome-extend/orders';
import { ProductList } from '@chrome-extend/products';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page</p>
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/products" element={<ProductList />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
    </Routes>
  );
}

export default App;
