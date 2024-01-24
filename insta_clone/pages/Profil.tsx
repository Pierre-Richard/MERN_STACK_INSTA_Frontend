import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../components/Auth";

const Profil = () => {
  // Récupérer l'ID de localStorage
  const userId = window.localStorage.getItem("userId");
  const [data, setData] = useState<string>("string");
  const [error, setError] = useState<string>();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/user/profil/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer${user?.token}`,
            },
          }
        );
        setData(response.data);
        console.log("Data", response.data);
        console.log(user?.email);
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          // Gestion d'autres types d'erreurs (peut-être log ou traiter différemment)
          console.error("Erreur inattendue:", error);
        }
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
      {error && <div className="text-red-500">{error}</div>}
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
