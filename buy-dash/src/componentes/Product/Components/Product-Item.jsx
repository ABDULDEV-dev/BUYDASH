import styles from './product.module.css'

function Button() {

    return(
        <>
        <button className={styles.buttonstyle}> click</button>
        </>
    )
}

function ProductItem({SingleProductItem, key}) {
    return(
        <div key={key}>
            <p>{SingleProductItem}</p>
            <Button />

        </div>
    )
}


export default ProductItem