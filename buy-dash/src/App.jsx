
import './App.css'
import Header from './componentes/Header'
import ProductList from './componentes/Product';

const Categories = ["MEN", "WOMEN" , "CHILDREN"];

function App() {
  
  return (
    <>
    <h1>WELCOME TO BUY DASH</h1>
    <Header /> 

    <ProductList Categories={Categories} />
    </>
  )
}

export default App
