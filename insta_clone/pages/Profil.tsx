import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardData } from "../components/Dashboard";
import Card from "../components/Card";

interface UserData {
  firstname: string;
  username: string;
  email: string;
  pic: string;
  followers: [];
  following: [];
}

const Profil: React.FC = () => {
  const userId = window.localStorage.getItem("userId");
  const accessToken = window.localStorage.getItem("access_token"); // Récupérez le token
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [dataProfile, setDataProfile] = useState<CardData[]>([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resppnse = await axios.get(
          "http://localhost:4000/api/post/myposts",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setDataProfile(resppnse.data);
        console.log("My Posts dataProfile", resppnse.data);
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
    fetchData();
  }, []);
  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-center border">
          <div className="mt-6 ml-6 md:mt-0 md:ml-0 md:mr-6 md:flex-shrink-0">
            <img
              className="rounded-full w-40 h-40 md:w-48 md:h-48 object-cover"
              src={data?.pic}
            />
          </div>
          <div className="mt-6 mr-6 flex flex-col items-center md:items-start">
            {data && (
              <div>
                <h4 className="mb-2">Bienvenue {data.firstname}</h4>
                <h4 className="mb-2">Username {data.username}</h4>
                <h4 className="mb-2">Email {data.email}</h4>
                <div className="flex justify-between w-full md:w-80 mb-2">
                  <h5>40 posts</h5>
                  <h5>{data?.following?.length ?? 0} following</h5>
                  <h5>{data?.followers?.length ?? 0} following</h5>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {dataProfile.map((item) => (
          <div className="shadow  rounded-lg" key={item._id}>
            <Card
              _id={item._id}
              photoUrl={item.photoUrl}
              title={item.title}
              body={item.body}
              likes={item.likes}
              postedBy={item.postedBy}
              showInput={true}
            />
          </div>
        ))}
      </div>
      {loading && (
        <p className="text-center mt-6">
          Chargement...besoin de vous connecter
        </p>
      )}
      {error && <div className="text-red-500 text-center mt-6">{error}</div>}
    </>
  );
};

export default Profil;
