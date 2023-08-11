// Import necessary libraries/modules
import React, { useState, useEffect } from "react";
import competitionsData from "./Competitions.json"; // Import JSON data containing competitions
import Matches from "./Matches"; // Import the Matches component
import Standings  from "./Standings"; // Import the Standings component
import Scorers from "./Scorers"; // Import the Scorers component

// Define the Layout component
function Layout() {
  // State variables
  const [Competitions, setCompetitions] = useState([]); // Store competitions data
  const [selectedCompetitions, setSelectedCompetitions] = useState("PL"); // Store the code of the selected competition

  // Fetch competitions data using useEffect hook
  useEffect(() => {
    const fetchData = () => {
      setCompetitions(competitionsData); // Set the competitions data from imported JSON
    };

    fetchData();
  }, []);

  // Function to handle the selection of a competition
  const handleCompetition = (code, e) => {
    e.preventDefault();
    setCompetitions((prevCompetitions) =>
      // Update the active state of competitions based on the selected competition
      prevCompetitions.map((Comp) => ({
        ...Comp,
        active: Comp.code === code ? true : false,
      }))
    );
    setSelectedCompetitions(code); // Set the selected competition
  };

  return (
    // Main Layout
    <div className="font-Ubuntu font-semibold">
      {/* Navigation Bar */}
      <nav className="bg-ns_background flex justify-between items-center mx-24 py-4">
        {/* N-Sport logo */}
        <img
          className="h-10"
          src="public/images/logo/logo.png"
          alt="N-Sport logo"
        />
        {/* Current date and time */}
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
        {/* Login and Register buttons */}
        <div className="flex gap-4 justify-center items-center">
          <button className="font-bold bg-ns_primary text-white hover:bg-ns_primary/[0.8] px-6 py-2 rounded-md border border-white">
            login
          </button>
          <button className="font-bold border-2 text-ns_primary hover:text-white hover:bg-ns_primary border-ns_primary rounded-md p-2">
            register
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="bg-neutral-100 min-h-screen">
        <div className="mx-auto max-w-7xl">
          {/* Competitions Buttons */}
          <div className="flex justify-around items-center py-2">
            {/* Map through Competitions and render buttons */}
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

          {/* Components */}

          <div className="flex gap-8">
            {/* Standings Component */}
            <div className="w-3/12">
              <Standings competition={selectedCompetitions} />
            </div>
            {/* Matches Component */}
            <div className="w-7/12">
              <Matches competition={selectedCompetitions} />
            </div>

            {/* Standings Component */}
            <div className="w-2/12">
              <Scorers competition={selectedCompetitions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout; // Export the Layout component
