// Import necessary libraries/modules
import React, { useState, useEffect } from "react";
import competitionsData from "./Competitions.json"; // Import JSON data containing competitions
import Matches from "./Matches"; // Import the Matches component
import Standings from "./Standings"; // Import the Standings component
import Scorers from "./Scorers"; // Import the Scorers component
import axios from "axios"; // Import Axios for making HTTP requests
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"; // Import Skeleton component for loading placeholders
import "react-loading-skeleton/dist/skeleton.css"; // Import Skeleton component styles

// Define the Layout component
function Layout() {
  // State variables
  const [Competitions, setCompetitions] = useState([]); // Store competitions data
  const [selectedCompetitions, setSelectedCompetitions] = useState("PL"); // Store the code of the selected competition
  const [News, setNews] = useState([]); // Store News data (it's the state used on jsx to foreach News)
  const [error, setError] = useState(null); // Store error message

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

  // fetch News from the api only on first render
  useEffect(() => {
    console.log("I'm calling the API (News)");
    axios
      .get("http://localhost:5000/News")
      .then((res) => {
        setNews(res.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("😕 An error occurred while fetching data !!!");
        return []; // Return an empty array in case of an error
      });
  }, []);

  return (
    // Main Layout
    <div className="font-Ubuntu font-semibold ">
      {/* Navigation Bar */}
      <nav className="bg-ns_background flex justify-between items-center py-4 mx-auto max-w-7xl">
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
      <div className="bg-neutral-100 min-h-screen pb-12">
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

          <div className="mt-4 flex gap-8">
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
          {/* News */}
          <div>
            <div className="w-full h-[1px] my-12 bg-gray-800"></div>
            <div className="grid grid-cols-4 gap-4">
              {error ? (
                <div className="text-center text-ns_accent text-3xl mt-8">
                  {error}
                </div>
              ) : News.length === 0 ? (
                // Display Skeleton placeholders while loading data
                <>
                  {/* Skeleton placeholders  */}
                  <Skeleton className="skeleton" height={200} />
                  <Skeleton className="skeleton" height={200} />
                  <Skeleton className="skeleton" height={200} />
                  <Skeleton className="skeleton" height={200} />
                  <Skeleton className="skeleton" height={200} />
                  <Skeleton className="skeleton" height={200} />
                  <Skeleton className="skeleton" height={200} />
                  <Skeleton className="skeleton" height={200} />
                </>
              ) : (
                News.map((article, index) => (
                  <div
                    className="border bg-white p-2 rounded-lg hover:border hover:border-ns_primary hover:cursor-pointer"
                    key={index}
                  >
                    <a href={article.url} target="_blank">
                      <img
                        loading="lazy"
                        src={article.urlToImage}
                        alt="article image"
                      />
                      <p className="text-end mt-2">{article.title}</p>
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className=" flex justify-between items-center mx-auto max-w-7xl">
          <div>
            <img
              src="public/images/logo/White_Logo.png"
              alt="N-Sport"
              width={100}
            />
          </div>
          <div className="font-normal">
            <p>&#169; 2023 MOHAMED GALDI, ALL RIGHTS RESERVED</p>
          </div>
          <div className="flex justify-between items-center gap-4">
            <a
              href="https://github.com/Mohamed-Galdi"
              target="_blank"
              className=" group "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.5em"
                className=" fill-white group-hover:fill-ns_primary "
                viewBox="0 0 496 512"
              >
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/mohamed-galdi/"
              target="_blank"
              className=" group "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.5em"
                className=" fill-white group-hover:fill-ns_primary "
                viewBox="0 0 448 512"
              >
                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
              </svg>
            </a>
            <a
              href="https://twitter.com/GaldiMohamed"
              target="_blank"
              className=" group "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.5em"
                className=" fill-white group-hover:fill-ns_primary "
                viewBox="0 0 512 512"
              >
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
              </svg>
            </a>
            <a href="https://galdi.dev" target="_blank" className=" group ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.5em"
                className=" fill-white group-hover:fill-ns_primary "
                viewBox="0 0 512 512"
              >
                <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout; // Export the Layout component
