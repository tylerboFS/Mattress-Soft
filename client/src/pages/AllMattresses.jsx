import { useEffect, useState } from "react";

const AllMattresses = () => {
  const [mattresses, setMattresses] = useState([]);

  useEffect(() => {
    const fetchMattresses = async () => {
      //set Mattresses state
      try {
        const response = await fetch("/api/mattress");
        // console.log(response);
        const mattressData = await response.json();
        // console.log(mattressData);
        setMattresses(mattressData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMattresses();
  }, []);

  return (
    <>
      <h2>Mattresses</h2>
      {mattresses.map((mattress) => {
        return <p key={mattress.id}>{mattress.name}</p>;
      })}
    </>
  );
};

export default AllMattresses;
