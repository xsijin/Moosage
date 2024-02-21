import React, { useState, useEffect } from "react";
import MoosageDisplay from "./MoosagesDisplay";
import MoosageInput from "./MoosagesInput";


const MoosageLanding = () => {
  const [boardId, setBoardId] = useState("65d434013c7234ba2e82dc58"); // replace this with the actual board ID
  const [moosages, setMoosages] = useState([]);

  useEffect(() => {
    fetchMoosages();
  }, [boardId]);

  const fetchMoosages = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/moosages/show/${boardId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch moosages");
      }
      const data = await response.json();
      setMoosages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addMoosage = async (newMoosage) => {
    try {
      // const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      // if (!token) throw new Error("Token not found");

      const response = await fetch(
        `http://localhost:3000/moosages/create/${boardId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`, // Include the authorization header
          },
          body: JSON.stringify(newMoosage),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add moosage");
      }

      // Fetch the updated moosages again to reflect the changes immediately
      fetchMoosages();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <MoosageInput addMoosage={addMoosage} />
      {moosages.map((moosage) => (
        <MoosageDisplay key={moosage._id} moosage={moosage} boardId={boardId} moosages={moosages} moosageId={moosage._id} setMoosages={setMoosages} />
      ))}
    </div>
  );
};

export default MoosageLanding;