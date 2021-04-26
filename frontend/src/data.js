import img1 from './assests/images/Car1.1.jpg';
import img2 from './assests/images/Car2.1.jpg';
import img3 from './assests/images/Car3.1.jpg';
import image1 from './assests/images/Car1.jpg';
import image2 from './assests/images/Car2.jpg';
import image3 from './assests/images/Car3.jpg';

export const carModel = [
  {
    id: 1,
    title: 'sedan',
    image: img1,
    bImg: image1,
    link: '/preview/first',
    price: 200000,
  },
  {
    id: 2,
    title: 'convertible',
    image: img2,
    bImg: image2,
    link: '/preview/second',
    price: 250000,
  },
  {
    id: 3,
    title: 'suv',
    image: img3,
    bImg: image3,
    link: '/preview/third',
    price: 300000,
  },
];

export const specification = {
  color: [
    {
      name: 'Black',
      price: 25000,
    },
    {
      name: 'Blue',
      price: 35000,
    },
    {
      name: 'White',
      price: 25000,
    },
    {
      name: 'Red',
      price: 35000,
    },
  ],

  engine: [
    {
      name: 'CL-100',
      price: 25000,
    },
    {
      name: 'Cl-200',
      price: 45000,
    },
    {
      name: 'CL-300',
      price: 65000,
    },
    {
      name: 'CL-400',
      price: 85000,
    },
  ],

  tire: [
    {
      name: 'Bridgestone',
      price: 1000,
    },
    {
      name: 'JK Tyres',
      price: 3000,
    },
    {
      name: 'Yokoshima',
      price: 4000,
    },
    {
      name: 'CEAT Tyres',
      price: 2000,
    },
  ],

  fuel: [
    {
      name: 'Electric',
      price: 50000,
    },
    {
      name: 'Diesel',
      price: 30000,
    },
    {
      name: 'Petrol',
      price: 30000,
    },
    {
      name: 'CNG',
      price: 20000,
    },
  ],
};
