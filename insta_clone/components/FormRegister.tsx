import React, { useState } from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type UserSubmitFormRegister = {
  username: string;
  firstname: string;
  email: string;
  password: string;
};

const FormRegister = () => {
  const [error, setError] = useState<string>("");

  const validationForm = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters"),
    firstname: Yup.string()
      .required("Firstname is required")
      .min(6, "Firstname must be at least 6 characters")
      .max(20, "Firstname must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserSubmitFormRegister>({
    resolver: yupResolver(validationForm),
  });

  const onSubmit: SubmitHandler<UserSubmitFormRegister> = async (data) => {
    try {
      await axios.post("http://localhost:4000/api/auth/register", data);
      alert("User Enregistrer! Now login");
      navigate("/login");
    } catch (err) {
      if (
        axios.isAxiosError(err) &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        setError(err.response.data.message);
      } else {
        // Gestion d'autres types d'erreurs (peut-être log ou traiter différemment)
        console.error("Erreur inattendue:", err);
      }
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form
          className="w-96 p-6 shadow-lg bg-white rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-3xl block text-center font-semibold">Register</h1>
          <hr className="mt-3" />
          <div className="mt-3">
            <label className="block text-base px-1 mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="border w-full text-base px-2 py-1 focus:outline-none  focus:ring-2 focus:ring-red-300 rounded-lg"
              {...register("username")}
            />
            <div className="text-red-600 px-1 mt-1">
              {errors.username?.message}
            </div>
          </div>
          <div className="mt-3">
            <label className="block text-base px-1 mb-2">Firstname</label>
            <input
              type="text"
              placeholder="Enter firstname"
              className={`border w-full text-base px-2 py-1 focus:outline-none focus:ring-2 rounded-lg ${
                errors.firstname
                  ? "border-red-500 focus:border-red-600 focus:ring-2"
                  : ""
              } `}
              {...register("firstname")}
            />
            <div className="text-red-600 px-1 mt-1">
              {errors.firstname?.message}
            </div>
          </div>
          <div className="mt-3">
            <label className="block text-base px-1 mb-2">Email</label>
            <input
              type="text"
              placeholder="Enter email"
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-2 rounded-lg focus:border-blue-500"
              {...register("email")}
            />
            <div className="text-red-600 px-1 mt-1">
              {errors.email?.message}
            </div>
          </div>
          <div className="mt-3">
            <label className="block text-base px-1 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-2 rounded-lg focus:border-blue-500"
              {...register("password")}
            />
            <div className="text-red-600 px-1 mt-1">
              {errors.password?.message}
            </div>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <a className="text-blue-500 font-semibold">Inscrivez-vous</a>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="mt-5">
            <button
              type="submit"
              className="border-2 border-indigo-700 bg-indigo-700 rounded-lg text-white py-1 w-full"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormRegister;
