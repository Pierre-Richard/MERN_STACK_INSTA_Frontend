import axios from "axios";
import React, { useState } from "react";

interface CardUserData {
  _id: string;
  username: string;
}

interface Comment {
  _id: string;
  text: string;
  postedBy: CardUserData;
}

interface CardProps {
  _id?: string;
  postId?: string;
  photoUrl: string;
  title: string;
  body: string;
  likes: [];
  postedBy: CardUserData;
  showInput?: boolean;
  comments?: Comment[];
}
const Card = ({
  photoUrl,
  title,
  body,
  likes,
  postedBy,
  showInput,
  postId,
  comments,
}: CardProps) => {
  const [commentText, setCommentText] = useState<string>("");

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  //const userId = window.localStorage.getItem("userId");
  const accessToken = window.localStorage.getItem("access_token");
  console.log("postedBy", postedBy.username);

  const handle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:4000/api/post/comments",
        {
          postId: postId,
          text: commentText,
          postedBy: postedBy.username,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Comment added", response.data);

      // Réinitialiser le texte du commentaire
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  console.log("commentText:", commentText);

  return (
    <div className="">
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
        <div className="font-bold text-xl mb-2">Titile: {title}</div>
        <p className="text-gray-700 text-base">Boby: {body}</p>
      </div>
      <div className="px-6 py-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded-md">
          Like {likes.length}
        </button>
        <div className="px-6 py-4">
          {comments &&
            comments.map((comment) => (
              <div key={comment._id} className="mb-2">
                <span className="font-bold">
                  {comment.postedBy.username}username
                </span>
                <span>{comment.text}</span>
              </div>
            ))}
        </div>
      </div>
      {!showInput && (
        <form className="px-6 py-4" onSubmit={handle}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={handleCommentChange}
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            ok
          </button>
        </form>
      )}
    </div>
  );
};

export default Card;
