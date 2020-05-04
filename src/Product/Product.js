import React from 'react';
import './Product.css';

function Product(props) {
    return (
        <div className='product'>
            <div className='dp' style={{
                backgroundImage: 'url(' + props.dp + ')'
            }}></div>
            <div className='name'>{props.name}</div>
        </div>
    )
}

export default Product;