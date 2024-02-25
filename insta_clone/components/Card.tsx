import React, { useEffect, useState } from "react";
import axios from "axios";

interface CardData {
  photoUrl: string;
  title: string;
  body: string;
  likes: [];
}
const Card = () => {
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
      {data.map((item, index) => (
        <div key={index} className="max-w-xs rounded overflow-hidden shadow-lg">
          <img
            className="w-full"
            style={{ width: "200px", height: "150px" }}
            src={item.photoUrl}
            alt={`Instagram post ${index}`}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{item.title}</div>
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{item.body}</div>
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{item.body}</div>
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{item.likes.length}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
