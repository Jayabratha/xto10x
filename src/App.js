import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Product from './Product/Product';

function App() {

  const [productList, setProductList] = useState([]);
  const [categoryList, setCatergoryList] = useState([]);
  const [selectedCategoryList, setSelectedCategoryList] = useState([]);

  useEffect(() => {
    fetch('http://demo4603548.mockable.io/products').then(response => response.json()).then(data => {
      const list = data.products;
      const productLength = list.length;
      const categories = [];

      for (let i = 0; i < productLength; i++) {
        let product = list[i];
        if (categories.indexOf(product.category) < 0) {
          categories.push(product.category);
        }
      }

      setCatergoryList(categories);
      setProductList(list);

    });
  }, []);

  function toggleSelectedCategory(category) {
    let categories = [...selectedCategoryList];
    let categoryIndex = categories.findIndex((item) => category == item);
    if (categoryIndex >= 0) {
      categories.splice(categoryIndex, 1);
    } else {
      categories.push(category);
    }
    
    setSelectedCategoryList(categories);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="tag-wrapper">
          <div className={`tag ${selectedCategoryList.length === 0 ? 'active' : ''}`} onClick={(e) => setSelectedCategoryList([])} >All</div>
          {categoryList && categoryList.map((category, index) => 
            <div key={index} className={`tag ${selectedCategoryList.indexOf(category) >= 0 ? 'active' : ''}`} onClick={(e) => toggleSelectedCategory(category)}>{category}</div>
          )}
        </div>
      </header>
      <div className='product-wrapper'>
          {productList && productList.filter(product => selectedCategoryList.indexOf(product.category) >= 0 || selectedCategoryList.length === 0).map((product, index) => <Product key={index} dp={product.searchImage} name={product.productName}></Product>)}
      </div>
    </div>
  );
}

export default App;
