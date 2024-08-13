import React, { useState, useEffect } from 'react';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:4000/apicategory/categories', {
          method: 'POST', // Asegúrate de que el backend maneje POST para obtener categorías
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched categories:', data); // Para depuración
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    if (productImage) {
      formData.append('Productimage', productImage); // Usa 'Productimage'
    }
  
    try {
      const response = await fetch('http://localhost:4000/apiproduct/productscreate', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Error creating product.');
      }
      // Clear form fields
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setProductImage(null);
      alert('Product created successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create product.');
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto" style={{ maxWidth: '1600px' }}>
        <div className="lg:-mx-6 lg:flex lg:items-center">
          <div className="lg:w-1/2 lg:mx-6 w-full h-96 rounded-lg lg:h-[36rem]">
            <img
              className="object-cover object-center w-full h-full rounded-lg"
              src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="Product"
            />
          </div>

          <div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white lg:text-3xl lg:w-96">
              Create a New Product
            </h1>

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Product Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))
                  ) : (
                    <option value="">No categories available</option>
                  )}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="productImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Product Image
                </label>
                <input
                id="productImage"
                type="file"
                onChange={(e) => setProductImage(e.target.files[0])}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
              >
                Create Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateProduct;
