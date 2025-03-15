import { CarProps, FilterProps } from "@/types";


export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, fuel } = filters;

  const headers = {
    'x-rapidapi-key': '9990cd1561mshe9f1b893bbdf81bp1d5583jsndd6af2bf7c33',
    'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com',
  };

  let AllCars: any[] = [];
  
  // Fetch data for the past 5 years (as an example)
  for (let i = 0; i < 20; i++) {
    const apiUrl = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${
      year - i
    }&model=${model}&fuel_type=${fuel}`;

    try {
      const response = await fetch(apiUrl, { headers });
      const result = await response.json();

      if (Array.isArray(result)) {
        AllCars = [...AllCars, ...result]; // Merge results
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  }

  return AllCars;
}


export const calculateCarRent = (city_mpg: number, year: number) =>{
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  const milageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear()-year)*ageFactor;

  const rentalRatePerDay = basePricePerDay + milageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};


export const generateCarImageURL = (car: CarProps, angle?: string) =>{
  const url = new URL('https://cdn.imagin.studio/getimage');

  const {make, year, model} = car;

  url.searchParams.append('customer', 'img');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(' ')[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
}

export const updateSearchParams = (type:string, value:string)=>{
const searchParams = new URLSearchParams(window.location.search);

searchParams.set(type, value);

const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

return newPathname;
}
