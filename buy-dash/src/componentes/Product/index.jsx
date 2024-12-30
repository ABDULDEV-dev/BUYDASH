import ProductItem from "./Components/Product-Item";
import "./style.css";



function ProductList({Categories}) {
 
    return(
        <>
        <p className="title">Haji's Clothing Collection</p>
        <h4></h4>
        {/* <ProductItem /> */}
     
    <ul>
        {Categories.map((item, index) => 
        (<ProductItem SingleProductItem={item} key={index} />
    ))}
    </ul>

        </>
    ) 
}


export default ProductList