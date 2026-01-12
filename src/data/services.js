/**
 * Mock services for Uniqueofy platform
 * Each service object includes: id, name, category, price, duration, description, image
 * Branding: trusted, verified professionals, at-home service, fixed pricing
 */

export const services = [
  {
    id: "ac-repair",
    name: 'AC Repair',
    category: 'Home Repair',
    price: 1999,
    duration: "60–90 mins",
    description:
      'Trusted, verified professionals providing at-home AC repair with transparent, fixed pricing and a workmanship guarantee.',
    image: '/images/ac-repair.jpg',
  },
  {
    id: "deep-cleaning",
    name: 'Deep Home Cleaning',
    category: 'Cleaning',
    price: 1499,
    duration: "3–5 hours",
    description:
      'Deep home cleaning by trusted, verified professionals — at-home service with fixed pricing and a satisfaction promise.',
    image: '/images/deep-home-cleaning.jpg',
  },
  {
    id: "salon-men",
    name: 'Salon for Men',
    category: 'Salon',
    price: 399,
    duration: "45–60 mins",
    description:
      'Professional at-home grooming for men from trusted, verified stylists, delivered with fixed pricing and reliable service.',
    image: '/images/salon-men.jpg',
  },
  {
    id: "salon-women",
    name: 'Salon for Women',
    category: 'Salon',
    price: 599,
    duration: "60–90 mins",
    description:
      'At-home salon services for women by trusted, verified stylists with clear, fixed pricing and professional results.',
    image: '/images/salon-women.jpg',
  },
];

export default services;
