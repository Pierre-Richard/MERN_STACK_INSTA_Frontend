import axios from "axios";
import React, { useEffect, useState } from "react";

const BASE_URL = "https://restcountries.com/v3.1/";

const FILTERABLE_CAPITALS = [
  "Tallinn",
  "Paris",
  "Geneve",
  "Oslo",
  "NewYork",
  "Miami",
] as const;

type Capital = (typeof FILTERABLE_CAPITALS)[number];

interface Country {
  name: {
    common: string;
  };
  capital: string;
}

interface CounttryCardProps {
  country: Country;
}

const CountryCard = ({ country }: CounttryCardProps) => {
  return (
    <div className="bg-blue-200 p-4">
      <p key={country.name.common}>
        Pays :{country.name.common} Capital: {country.capital}
      </p>
    </div>
  );
};
const CountriesPages = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [capital, setCapital] = useState<Capital>();
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${BASE_URL}/all`);
      setCountries(response.data);
      console.log("countries", response.data);
    };
    getData();
  }, []);

  return (
    <>
      <div className="bg-blue-200 p-4">
        {countries.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
    </>
  );
};

export default CountriesPages;
