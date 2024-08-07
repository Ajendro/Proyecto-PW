import React from 'react';

const categories = [
  { id: 1, name: 'Cerámica', imgSrc: './herramientas/vasijas.webp', imgAlt: 'Category 1' },
  { id: 2, name: 'Tejidos', imgSrc: './herramientas/tejidos.jpg', imgAlt: 'Category 2' },
  { id: 3, name: 'Madera', imgSrc: '/placeholder.svg', imgAlt: 'Category 3' },
  { id: 4, name: 'Vidrio', imgSrc: '/placeholder.svg', imgAlt: 'Category 4' },
  { id: 5, name: 'Joyería', imgSrc: '/placeholder.svg', imgAlt: 'Category 5' },
];



const CategoryCard = ({ name, imgSrc, imgAlt }) => (
  <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
    <a className="absolute inset-0 z-10" href="#">
      <span className="sr-only">View</span>
    </a>
    <img
      src={imgSrc}
      alt={imgAlt}
      width="250"
      height="250"
      className="aspect-video object-cover rounded-md"
    />
    {name && (
      <div className="p-4 bg-background">
        <h3 className="text-xl font-bold">{name}</h3>
      </div>
    )}
  </div>
);

const CategoriesGrid = () => (
    <div>
      <div className="mb-16">
        <h2 className="text-2xl font-bold ">Explora nuestras categorías</h2>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            imgSrc={category.imgSrc}
            imgAlt={category.imgAlt}
          />
        ))}
      </div>
    </div>
  );
  
  const App = () => (
    <div>
      <CategoriesGrid />
    </div>
  );
  
  export default App;
