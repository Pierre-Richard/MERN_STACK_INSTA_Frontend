import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface UserData {
  firstname: string;
  username: string;
  email: string;
  // ... Ajoutez d'autres champs si nécessaire
}

const Profil: React.FC = () => {
  const userId = window.localStorage.getItem("userId");
  const accessToken = window.localStorage.getItem("access_token"); // Récupérez le token
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  //const _id = "65a50b3f6a2064ce39be6210";
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/user/profil/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Ajoutez le token d'authentification dans les en-têtes
            },
          }
        );
        setData(response.data);
        setLoading(false); // Marquez le chargement comme terminé
        console.log("Data", response.data);
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError("Erreur inattendue"); // Définissez un message d'erreur générique
          console.error("Erreur inattendue:", error);
        }
        setLoading(false); // Marquez le chargement comme terminé même en cas d'erreur
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId, id]); // Assurez-vous de dépendre de userId pour déclencher le rechargement lorsque l'ID utilisateur change

  return (
    <>
      <p className="text-red-600">Bienvenue sur la page Profil</p>
      {loading && <p>Chargement...</p>}
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
