import axios from "axios";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

type UserSubmitForm = {
  email: string;
  password: string;
};

const FormLogin = () => {
  const [, setCookies] = useCookies(["access_token"]);

  const validationForm = Yup.object().shape({
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

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UserSubmitForm> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        data
      );

      setCookies("access_token", response.data.token);
      await window.localStorage.setItem("userId", response.data.userID);
      await window.localStorage.setItem("access_token", response.data.token);
      console.log(window.localStorage.getItem("access_token"));
      navigate(`/profil/${response.data.userID}`);
    } catch (err) {
      console.error("error: ", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-indigo-600">
      <form
        className="w-96 p-6 shadow-lg bg-white rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl block text-center font-semibold">Login</h1>
        <hr className="mt-3" />
        <div className="mt-3">
          <label className="block text-base mb-2">Email</label>
          <input
            type="text"
            placeholder="Enter email"
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
            {...register("email")}
          />
          <div className="text-red-600 px-1 mt-1">{errors.email?.message}</div>
        </div>
        <div className="mt-3">
          <label className="block text-base mb-2">password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
            {...register("password")}
          />
          <div className="text-red-600 px-1 mt-1">
            {errors.password?.message}
          </div>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <a className="text-blue-500 font-semibold">Inscrivez-vous</a>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
