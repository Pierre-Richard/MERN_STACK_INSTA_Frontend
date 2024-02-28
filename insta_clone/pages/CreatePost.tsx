import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { yupResolver } from "@hookform/resolvers/yup"; // Import du résolveur Yup pour react-hook-form
import * as Yup from "yup"; // Import de Yup pour la validation des schémas
import axios from "axios"; // Import d'axios pour les requêtes HTTP

import {
  Resolver,
  ResolverOptions,
  SubmitHandler,
  useForm,
} from "react-hook-form"; // Import des fonctions nécessaires de react-hook-form

// Définition du type de données que le formulaire soumettra
type CreatePostSubmit = {
  title: string;
  body: string;
  photo: File | null;
};

const CreatePost = () => {
  const [error, setError] = useState<string>("");
  const validationForm = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(5, "Title must be at least 5 characters"),
    body: Yup.string().required("Body is required"),
    photo: Yup.mixed().test("required", "Photo is required", (value) => {
      return value !== null && value !== undefined;
    }),
  });
  // Utilisation du hook useForm pour gérer le formulaire et obtenir les fonctions de manipulation
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<CreatePostSubmit>({
    resolver: yupResolver(validationForm) as Resolver<
      CreatePostSubmit,
      Partial<ResolverOptions<CreatePostSubmit>>
    >,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setValue("photo", event.target.files[0]); // Définir la valeur du champ de fichier
    } else {
      setValue("photo", null); // Aucun fichier sélectionné, définir la valeur sur undefined
    }
  };

  // Fonction appelée lorsque le formulaire est soumis
  const onSubmit: SubmitHandler<CreatePostSubmit> = async (formData) => {
    try {
      const accessToken = window.localStorage.getItem("access_token"); // Récupérez le token

      if (!accessToken) {
        console.error("Access token not found.");
        return;
      }
      const response = await axios.post(
        "http://localhost:4000/api/post/createpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`, // Inclure le token dans les en-têtes de la requête
          },
        }
      );
      if (accessToken) {
        alert("Post user is Cretead");
        console.log("accessToken", accessToken);
      }
    } catch (err) {
      console.error("error: ", err);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter title..."
                {...register("title")}
              />
              <div className="text-red-600 px-1 mt-1">
                {errors.title?.message}
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="body"
              >
                Body
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="body"
                placeholder="Enter body..."
                rows="4"
                {...register("body")}
              />
              <div className="text-red-600 px-1 mt-1">
                {errors.body?.message}
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="image"
              >
                Upload Image
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="photo"
                type="file"
                onChange={handleFileChange}
                name="photo"
              />
              <div className="text-red-600 px-1 mt-1">
                {errors.photo?.message}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
