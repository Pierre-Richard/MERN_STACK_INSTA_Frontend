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
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((item) => (
          <div className="shadow rounded-lg" key={item._id}>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
