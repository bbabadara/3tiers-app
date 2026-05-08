import React, { useState, useEffect, useCallback } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import { productService } from './services/api';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await productService.getAll();
      setProducts(response.data.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des produits');
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCreate = async (data) => {
    try {
      await productService.create(data);
      await fetchProducts();
      setError(null);
    } catch (err) {
      const msg = err.response?.data?.errors?.[0] || 'Erreur lors de la création';
      setError(msg);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await productService.update(id, data);
      await fetchProducts();
      setEditingProduct(null);
      setError(null);
    } catch (err) {
      const msg = err.response?.data?.errors?.[0] || 'Erreur lors de la modification';
      setError(msg);
    }
  };

  const handleDelete = async (id) => {
    try {
      await productService.delete(id);
      await fetchProducts();
      setError(null);
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Gestion de Produits</h1>
      </header>

      <main className="container">
        {error && <div className="alert alert-error">{error}</div>}

        <ProductForm
          onSubmit={editingProduct ? (data) => handleUpdate(editingProduct.id, data) : handleCreate}
          initialData={editingProduct}
          onCancel={editingProduct ? handleCancelEdit : undefined}
        />

        <ProductList
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default App;
