import React from 'react';

function ProductItem({ product, onEdit, onDelete }) {
  return (
    <div className="product-item">
      <div className="product-info">
        <h3 className="product-name">{product.nom}</h3>
        {product.description && (
          <p className="product-desc">{product.description}</p>
        )}
        <div className="product-meta">
          <span className="product-price">{parseFloat(product.prix).toFixed(2)} €</span>
          <span className="product-stock">Stock: {product.stock}</span>
          <span className="product-date">
            {new Date(product.createdAt).toLocaleDateString('fr-FR')}
          </span>
        </div>
      </div>
      <div className="product-actions">
        <button className="btn btn-sm btn-edit" onClick={() => onEdit(product)}>
          Modifier
        </button>
        <button className="btn btn-sm btn-delete" onClick={() => onDelete(product.id)}>
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
