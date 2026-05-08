import React from 'react';
import ProductItem from './ProductItem';

function ProductList({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p>Aucun produit trouvé.</p>
        <p>Ajoutez votre premier produit avec le formulaire ci-dessus.</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      <h2>Liste des produits ({products.length})</h2>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ProductList;
