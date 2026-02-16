import acServicingImg from '../assets/images/services/ac-servicing.webp'
import acInstallationImg from '../assets/images/services/ac-installation.webp'
import tank500lImg from '../assets/images/services/tank-500l.webp'
import tank1000lImg from '../assets/images/services/tank-1000l.webp'
import tank2000lImg from '../assets/images/services/tank-2000l.webp'
import customTankImg from '../assets/images/services/tank-custom.webp'
import acCustomImg from '../assets/images/services/ac-custom.webp'

export const acServices = [
  {
    id: "ac-servicing",
    name: 'AC Servicing',
    category: 'AC Services',
    price: 299,
    duration: "45–60 mins",
    description: 'Professional AC servicing and maintenance',
    image: acServicingImg,
  },
  {
    id: "ac-installation",
    name: 'AC Installation',
    category: 'AC Services',
    price: 1999,
    duration: "2–3 hours",
    description: 'Expert AC installation service',
    image: acInstallationImg,
  },
  {
    id: "ac-custom-request",
    name: "Custom AC Request",
    category: "AC Services",
    duration: "Flexible",
    description: "For any AC service not listed, request a custom quote.",
    image: acCustomImg,
    isCustom: true,
    price: 0
  }
];

export const waterTankServices = [
  {
    id: "water-tank-500l",
    name: "500L Water Tank Cleaning",
    category: 'Water Tank Cleaning',
    duration: "1–2 hours",
    price: 399,
    description: "Professional cleaning for 500L water tank",
    image: tank500lImg
  },
  {
    id: "water-tank-1000l",
    name: "1000L Water Tank Cleaning",
    category: 'Water Tank Cleaning',
    duration: "2–3 hours",
    price: 699,
    description: "Professional cleaning for 1000L water tank",
    image: tank1000lImg
  },
  {
    id: "water-tank-2000l",
    name: "2000L Water Tank Cleaning",
    category: 'Water Tank Cleaning',
    duration: "3–4 hours",
    price: 999,
    description: "Professional cleaning for 2000L water tank",
    image: tank2000lImg
  },
  {
    id: "water-tank-custom",
    name: "Custom Size Water Tank",
    category: 'Water Tank Cleaning',
    duration: "Flexible",
    price: 0,
    description: "Contact us for custom size water tank cleaning quotes.",
    image: customTankImg,
    isCustom: true
  }
];
