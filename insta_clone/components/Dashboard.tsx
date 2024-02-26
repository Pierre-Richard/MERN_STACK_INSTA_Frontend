import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

interface UserData {
  username: string;
  // Ajoutez d'autres propriétés si nécessaire
}

export interface CardData {
  _id: string;
  photoUrl: string;
  title: string;
  body: string;
  likes: [];
  postedBy: UserData;
}
const Dashboard = () => {
  const [data, setData] = useState<CardData[]>([]); // Utilisation de CardData[] pour indiquer un tableau de CardData
  useEffect(() => {
    const getData = async () => {
      const token = window.localStorage.getItem("access_token");
      const response = await axios.get(
        "http://localhost:4000/api/post/getPosts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
      console.log("Response Data:", response.data);
    };
    getData();
  }, []);

  return (
    <div>
      {data.map((item) => (
        <Card
          _id={item._id}
          photoUrl={item.photoUrl}
          title={item.title}
          body={item.body}
          likes={item.likes}
          postedBy={item.postedBy}
        />
      ))}
    </div>
  );
};

export default Dashboard;
