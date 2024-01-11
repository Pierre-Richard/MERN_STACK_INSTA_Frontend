import React, { ChangeEvent, useState } from "react";

interface formProps {
  username: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  firstname: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setUserPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  label?: string;
}

const FormText = ({
  username,
  setUserName,
  firstname,
  setFirstName,
  email,
  setEmail,
  password,
  setUserPassword,
  onSubmit,
  label,
}: formProps) => {
  // const [isButtonDisabled, setButtonDisabled] = useState(true);

  // const handleInputUsername = (e: ChangeEvent<HTMLInputElement>) => {
  //   const valueInputUsername = e.target.value;
  //   setUserName(e.target.value);
  //   console.log("Username: ", valueInputUsername);
  // };

  // const handleInputFirstname = (e: ChangeEvent<HTMLInputElement>) => {
  //   const valueInputFirstname = e.target.value;
  //   setFirstName(e.target.value);
  //   console.log("Firstname: ", valueInputFirstname);
  // };

  // const handleInputEmail = (e: ChangeEvent<HTMLInputElement>) => {
  //   const valueInputEmail = e.target.value;
  //   setEmail(valueInputEmail);
  //   console.log(valueInputEmail);
  //   checkFormValidity();
  // };

  // const handleInputPassword = (e: ChangeEvent<HTMLInputElement>) => {
  //   const valueInputUserPassword = e.target.value;
  //   setUserPassword(valueInputUserPassword);
  //   checkFormValidity();
  // };

  // const checkFormValidity = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (username.length === 0 && password.length === 0) {
  //     setButtonDisabled(true);
  //   } else {
  //     setButtonDisabled(false);
  //   }
  // };

  return (
    <div className="flex justify-center items-center h-screen bg-indigo-600">
      <form
        className="w-96 p-6 shadow-lg bg-white rounded-md"
        onSubmit={onSubmit}
      >
        <h1 className="text-3xl block text-center font-semibold">{label}</h1>
        <hr className="mt-3" />
        <div className="mt-3">
          <label className="block text-base mb-2">username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={handleInputUsername}
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
          />
        </div>
        <div className="mt-3">
          <label className="block text-base mb-2">firstname</label>
          <input
            type="text"
            placeholder="Enter firstname"
            onChange={handleInputFirstname}
            value={firstname}
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
          />
        </div>
        <div className="mt-3">
          <label className="block text-base mb-2">Email</label>
          <input
            type="text"
            placeholder="Enter email"
            onChange={handleInputEmail}
            value={email}
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
          />
        </div>
        <div className="mt-3">
          <label className="block text-base mb-2">password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handleInputPassword}
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
          />
        </div>
        <div className="mt-3 flex justify-between items-center">
          <a className="text-blue-500 font-semibold">Inscrivez-vous</a>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            disabled={isButtonDisabled}
            className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full"
          >
            {label}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormText;
