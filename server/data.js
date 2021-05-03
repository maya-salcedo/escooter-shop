import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Maya',
      email: 'maya@email.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true
    },
    {
      name: 'Susi',
      email: 'susi@email.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false
    }
  ],
  products: [
    {
      _id: '1',
      name: 'Synergy Sport 800W',
      category: 'Electric scooter',
      image: '/images/p1.jpg',
      price: 1600,
      countInStock: 21,
      brand: 'North49 Brands',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      _id: '2',
      name: 'Xiaomi Mi Electric Scooter PRO2',
      category: 'Electric scooter',
      image: '/images/p2.jpg',
      price: 700,
      countInStock: 25,
      brand: 'Xiaomi',
      rating: 4.0,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      _id: '3',
      name: 'Dualtron Storm Electric Scooter',
      category: 'Electric scooter',
      image: '/images/p3.jpg',
      price: 4500,
      countInStock: 10,
      brand: 'Dualtron',
      rating: 4.8,
      numReviews: 17,
      description: 'high quality product',
    },
    {
      _id: '4',
      name: 'Zero 11X',
      category: 'Electric scooter',
      image: '/images/p4.jpg',
      price: 5500,
      countInStock: 5,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 14,
      description: 'high quality product',
    },
    {
      _id: '5',
      name: 'Kaabo Wolf Warrior X Pro',
      category: 'Electric scooter',
      image: '/images/p5.jpg',
      price: 4000,
      countInStock: 7,
      brand: 'Puma',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      _id: '6',
      name: 'Zero 10x 21ah/60v Dual 1200w',
      category: 'Electric scooter',
      image: '/images/p6.jpg',
      price: 3300,
      countInStock: 0,
      brand: 'Adidas',
      rating: 4.5,
      numReviews: 15,
      description: 'high quality product',
    },
  ],
};

  export default data;