import Slider from 'react-slick';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel1 = ({ products }) => {
  const getSeverity = (status) => {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {products.map((product) => (
        <div key={product.id} className="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
          <div className="mb-4">
            <div className="relative mx-auto">
              <img
                src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLE8eHT0m2C3DHAT7s8_hYayED-w-FHQeGtA&s${product.image}`}
                alt={product.name}
                className="w-full rounded"
              />
              <Tag
                value={product.inventoryStatus}
                severity={getSeverity(product.inventoryStatus)}
                className="absolute"
                style={{ left: '5px', top: '5px' }}
              />
            </div>
          </div>
          <div className="mb-4 font-medium">{product.name}</div>
          <div className="flex justify-between items-center">
            <div className="mt-0 font-semibold text-xl">${product.price}</div>
            <span>
              <Button icon="pi pi-heart" severity="secondary" outlined />
              <Button icon="pi pi-shopping-cart" className="ml-2" />
            </span>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel1;
