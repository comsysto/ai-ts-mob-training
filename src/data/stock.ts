type Car = {
  id: string;
  brand: string;
  model: string;
  manufacturingYear: number;
  price: number;
  currency: string;
  color: string;
  exteriorDetails: string[];
};

export const carsInStock: Car[] = [
  {
    id: "1",
    brand: "BMW",
    model: "320i",
    manufacturingYear: 2022,
    price: 35000,
    currency: "EUR",
    color: "Black",
    exteriorDetails: ["alloy wheels", "tinted windows", "sports package", "LED headlights", "heated side mirrors"]
  },
  {
    id: "2",
    brand: "Audi",
    model: "A4",
    manufacturingYear: 2021,
    price: 38000,
    currency: "EUR",
    color: "White",
    exteriorDetails: ["spoiler", "sunroof", "tinted windows", "chrome accents", "rain-sensing wipers"]
  },
  {
    id: "3",
    brand: "Mercedes-Benz",
    model: "C-Class",
    manufacturingYear: 2023,
    price: 40000,
    currency: "EUR",
    color: "Silver",
    exteriorDetails: ["alloy wheels", "panoramic roof", "night package", "adaptive headlights", "power-folding mirrors"]
  },
  {
    id: "4",
    brand: "Tesla",
    model: "Model 3",
    manufacturingYear: 2023,
    price: 45000,
    currency: "EUR",
    color: "Red",
    exteriorDetails: ["glass roof", "custom wheels", "performance package", "autopilot", "flush door handles"]
  },
  {
    id: "5",
    brand: "Volkswagen",
    model: "Golf",
    manufacturingYear: 2021,
    price: 25000,
    currency: "EUR",
    color: "Blue",
    exteriorDetails: ["alloy wheels", "roof rack", "tinted windows", "LED daylights", "integrated rear spoiler"]
  },
  {
    id: "6",
    brand: "Ford",
    model: "Mustang",
    manufacturingYear: 2022,
    price: 37000,
    currency: "EUR",
    color: "Yellow",
    exteriorDetails: ["spoiler", "stripe decals", "sport suspension", "quad exhaust tips", "hood scoop"]
  },
  {
    id: "7",
    brand: "Porsche",
    model: "911",
    manufacturingYear: 2023,
    price: 120000,
    currency: "EUR",
    color: "Green",
    exteriorDetails: ["carbon fiber hood", "sports package", "tinted windows", "rear diffuser", "sport exhaust system"]
  },
  {
    id: "8",
    brand: "Lexus",
    model: "IS",
    manufacturingYear: 2020,
    price: 32000,
    currency: "EUR",
    color: "Gray",
    exteriorDetails: ["sunroof", "alloy wheels", "chrome details", "automatic high beams", "power moonroof"]
  },
  {
    id: "9",
    brand: "Toyota",
    model: "Camry",
    manufacturingYear: 2022,
    price: 28000,
    currency: "EUR",
    color: "Brown",
    exteriorDetails: ["alloy wheels", "tinted windows", "spoiler", "LED taillights", "rain-sensing wipers"]
  },
  {
    id: "10",
    brand: "Honda",
    model: "Civic",
    manufacturingYear: 2021,
    price: 23000,
    currency: "EUR",
    color: "Silver",
    exteriorDetails: ["sports package", "alloy wheels", "sunroof", "fog lights", "side skirts"]
  }
];