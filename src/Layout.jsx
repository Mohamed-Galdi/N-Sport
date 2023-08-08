import React, { useState, useEffect } from "react";
import  competitionsData  from "./Competitions.json";
import Matches from "./Matches";
import { Link } from "react-router-dom";


function Layout() {
  const [Competitions, setCompetitions] = useState([]);
  const [selectedCompetitions, setSelectedCompetitions] = useState("PL");

  useEffect(() => {
    const fetchData = () => {
      setCompetitions(competitionsData);
    };

    fetchData();
  }, []);

  const handleCompetition = (code, e) => {
    e.preventDefault();
    setCompetitions((prevCompetitions) =>
      prevCompetitions.map((Comp) => ({
        ...Comp,
        active: Comp.code === code ? true : false,
      }))
    );
    setSelectedCompetitions(code);
  };

  return (
    // ------------------------------------------------------- App Layout -----------------------------------------------------//
    // --------------------------------------------------- Nav Bar   -----------------------------------------------------//
    <div className="font-Ubuntu  font-semibold">
      <nav className="bg-ns_background flex justify-between items-center  mx-24  py-4 ">
        <img
          className="h-10"
          src="public/images/logo/logo.png"
          alt="N-Sport logo"
        />
        <div className="bg-black p-2 font-bold font-Ubuntu text-white rounded-md">
          {new Date().toLocaleString("en-US", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <div className="flex gap-4 justify-center items-center">
          <button className="font-bold bg-ns_primary text-white hover:bg-ns_primary/[0.8] px-6 py-2 rounded-md border border-white  ">
            login
          </button>
          <button className="font-bold border-2 text-ns_primary hover:text-white hover:bg-ns_primary border-ns_primary rounded-md p-2  ">
            register
          </button>
        </div>
      </nav>
      {/* --------------------------------------------------- Main  -------------------------------------------------------  */}
      <div className=" bg-neutral-100  min-h-screen">
        <div className="mx-auto max-w-5xl">
          {/* -------------------------------------- Competitions Buttons ---------------------------------------- */}
          <div className="flex justify-around items-center py-2">
            {Competitions.map((competition, index) => (
              <button
                onClick={(e) => handleCompetition(competition.code, e)}
                key={index}
                className={`flex border-b-ns_primary pb-2 w-1/7 ${
                  competition.active
                    ? "border-b-4 transition duration-300 ease-in-out"
                    : "border-b-0"
                } ${
                  competition.active ? "" : "grayscale"
                } transition duration-300 ease-in-out`}
              >
                <img src={competition.img} alt="" className="h-16" />
              </button>
            ))}
          </div>
          {/* -------------------------------------- Components ---------------------------------------- */}
          <div>
            {/* ------------------------------------ Standings ----------------------------------- */}
            <div>
              <Matches competition={selectedCompetitions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
