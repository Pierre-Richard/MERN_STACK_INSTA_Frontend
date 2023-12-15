import React, { ChangeEvent, useState } from "react";

interface formProps {
  username: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  label: string;
}

const FormText = ({
  username,
  setPassword,
  password,
  setUserName,
  onSubmit,
  label,
}: formProps) => {
  const [isButtonDisabled] = useState(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const valueInputUserName = e.target.value;
    setUserName(valueInputUserName);
  };

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
            onChange={handleInput}
            value={username}
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
          />
        </div>
        <div className="mt-3">
          <label className="block text-base mb-2">password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            className={`border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full  ${
              !isButtonDisabled &&
              username.length === 0 &&
              password.length === 0
                ? "cursor-not-allowed opacity-50"
                : "rounded-md hover:bg-transparent hover:text-indigo-700"
            }`}
          >
            {label}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormText;
