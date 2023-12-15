import React, { ChangeEvent, ChangeEventHandler, useState } from "react";

const Profil = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [statusButton, setStatusButton] = useState<boolean>(true);

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    if (value.length > 1) {
      return setStatusButton(false);
    } else {
      setStatusButton(true);
    }
  };

  const handleClick = () => {
    console.log("handleClick");
  };
  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form>
        <textarea value={text} onChange={handleChangeText} />
        <br />
        <button
          className="border-2 text-white border-indigo-700 bg-indigo-700"
          disabled={statusButton}
          onClick={handleClick}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Profil;
