import axios from "axios";
import React, { useEffect, useState } from "react";

const Profil = () => {
  // Récupérer l'ID de localStorage
  const userId = window.localStorage.getItem("userId");

  const [data, setData] = useState<string>("string");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/user/profil/${userId}`
        );
        setData(response.data);
        console.log("Data", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <>
      <p className="text-red-600">Bienvenue sur la page Profil</p>
      {data && (
        <div>
          <p className="text-red-600">
            Bienvenue sur la page Profil {data.firstname}
          </p>
          <p>Username: {data.username}</p>
          <p>Email: {data.email}</p>
          {/* ... Autres données à afficher ... */}
        </div>
      )}
    </>
  );
};

export default Profil;
