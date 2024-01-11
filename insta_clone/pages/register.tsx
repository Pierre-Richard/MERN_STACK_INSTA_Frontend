import React, { useState } from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";

type UserSubmitForm = {
  username: string;
  firstname: string;
  email: string;
  password: string;
};

const Register: React.FC = () => {
  const [error, setError] = useState<string>("");

  const validationForm = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters"),
    firstname: Yup.string()
      .required('Firstname is required"')
      .min(6, "Firstname must be at least 6 characters")
      .max(20, "Firstname must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationForm),
  });

  const onSubmit: SubmitHandler<UserSubmitForm> = async (data) => {
    try {
      await axios.post("http://localhost:4000/api/auth/register", data);

      return alert("User Enregistrer! Now login");
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
      <div className="flex justify-center items-center h-screen bg-indigo-600">
        <form
          className="w-96 p-6 shadow-lg bg-white rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-3xl block text-center font-semibold">Register</h1>
          <hr className="mt-3" />
          <div className="mt-3">
            <label className="block text-base mb-2">username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
              {...register("username")}
            />
            <div>{errors.username?.message}</div>
          </div>
          <div className="mt-3">
            <label className="block text-base mb-2">firstname</label>
            <input
              type="text"
              placeholder="Enter firstname"
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
              {...register("firstname")}
            />
            <div>{errors.firstname?.message}</div>
          </div>
          <div className="mt-3">
            <label className="block text-base mb-2">Email</label>
            <input
              type="text"
              placeholder="Enter email"
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
              {...register("email")}
            />
            <div>{errors.email?.message}</div>
          </div>
          <div className="mt-3">
            <label className="block text-base mb-2">password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
              {...register("password")}
            />
            <div>{errors.password?.message}</div>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <a className="text-blue-500 font-semibold">Inscrivez-vous</a>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="mt-5">
            <button
              type="submit"
              className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
