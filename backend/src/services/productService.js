const { Product } = require('../models');

class ProductService {
  async create(data) {
    return await Product.create(data);
  }

  async getAll() {
    return await Product.findAll({ order: [['createdAt', 'DESC']] });
  }

  async getById(id) {
    const product = await Product.findByPk(id);
    if (!product) {
      const error = new Error('Produit non trouvé');
      error.statusCode = 404;
      throw error;
    }
    return product;
  }

  async update(id, data) {
    const product = await this.getById(id);
    return await product.update(data);
  }

  async delete(id) {
    const product = await this.getById(id);
    await product.destroy();
    return { message: 'Produit supprimé avec succès' };
  }
}

module.exports = new ProductService();
