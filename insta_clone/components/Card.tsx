import React from "react";

interface UserData {
  username: string;
  // Ajoutez d'autres propriétés si nécessaire
}

interface CardProps {
  _id: string;
  photoUrl: string;
  title: string;
  body: string;
  likes: [];
  postedBy: UserData;
}
const Card = ({ _id, photoUrl, title, body, likes, postedBy }: CardProps) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          Posted by {postedBy.username}
        </div>
      </div>
      <img
        className="w-full"
        style={{ width: "200px", height: "150px" }}
        src={photoUrl}
        alt="Instagram post"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{body}</p>
      </div>
      <div className="px-6 py-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded-md">
          Like {likes.length}
        </button>
      </div>
      <form className="px-6 py-4">
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </form>
    </div>
  );
};

export default Card;
