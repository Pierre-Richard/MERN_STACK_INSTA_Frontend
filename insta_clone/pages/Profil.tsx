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
      <div>
        <div className="flex justify-center border">
          <div className="mt-6 ml-6  mx-6">
            <img
              className="rounded-full w-40 h-40 object-cover"
              src="https://images.unsplash.com/photo-1615813967515-e1838c1c5116?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHBlcnNvbnxlbnwwfDF8MHx8fDA%3D"
            />
          </div>
          <div className="mt-6 mr-6 flex items-center">
            {data && (
              <div className="">
                <h4 className="">Bienvenue {data.firstname}</h4>
                <h4>Username {data.username}</h4>
                <h4>Email {data.email}</h4>
                <div className="flex justify-between w-80">
                  <h5>40 posts</h5>
                  <h5>40 followers</h5>
                  <h5>40 following</h5>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {loading && <p>Chargement...</p>}
      {error && <div className="text-red-500">{error}</div>}
    </>
  );
};

export default Profil;
