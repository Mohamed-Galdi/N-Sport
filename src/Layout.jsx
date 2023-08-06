import React, { useState } from "react";

function Layout() {
  const [Competitions, setCompetitions] = useState([
    {
      img: "public/images/Competitions/premier-league-logo.png",
      active: true,
      code: "PL",
    },
    {
      img: "public/images/Competitions/LaLiga_logo_2023.png",
      active: false,
      code: "PD",
    },
    {
      img: "public/images/Competitions/Italian-Serie-A-Logo.png",
      active: false,
      code: "SA",
    },
    {
      img: "public/images/Competitions/Bundesliga_logo.png",
      active: false,
      code: "BL1",
    },
    {
      img: "public/images/Competitions/ligue-1-logo.png",
      active: false,
      code: "FL1",
    },
    {
      img: "public/images/Competitions/UEFA_Champions_League.png",
      active: false,
      code: "CL",
    },
    {
      img: "public/images/Competitions/UEFA_Europa_League.png",
      active: false,
      code: "CUP",
    },
  ]);

  // const handleCompetition = (code, e) => {
  //   e.preventDefault();
  //   setCompetitions(
  //     ...Competitions,
  //     Competitions.map((Comp) => {
  //       Comp.code !== code
  //         ? { img: Comp.img, active: false, code: Comp.code }
  //         : { img: Comp.img, active: true, code: Comp.code };
  //     })
  //   );
  // };
  const handleCompetition = (code, e) => {
    e.preventDefault();
    setCompetitions((prevCompetitions) =>
      prevCompetitions.map((Comp) => ({
        ...Comp,
        active: Comp.code === code ? true : false,
      }))
    );
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
          {new Date().toLocaleString("en-US",{
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
      <div className="bg-neutral-200 h-screen ">
        <div className="mx-auto max-w-5xl">
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
        </div>
      </div>
    </div>
  );
}

export default Layout;
