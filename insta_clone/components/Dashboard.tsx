import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

interface UserData {
  username: string;
  _id: string;
  // Ajoutez d'autres propriétés si nécessaire
}

interface Comment {
  _id: string;
  text: string;
  postedBy: UserData;
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
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    const getData = async () => {
      const token = window.localStorage.getItem("access_token");
      const userId = window.localStorage.getItem("userId");
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
  console.log("console.log(comments):", comments);

  return (
    <div>
      {data.map((item) => (
        <Card
          key={item._id}
          postId={item._id}
          photoUrl={item.photoUrl}
          title={item.title}
          body={item.body}
          likes={item.likes}
          comments={comments.filter(
            (comment) => comment.postedBy._id === item.postedBy._id
          )}
          postedBy={{ _id: item._id, username: item.postedBy._id }}
        />
      ))}
    </div>
  );
};

export default Dashboard;
