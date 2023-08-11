import { useState, useEffect } from "react"; // Import React hooks
import axios from "axios"; // Import Axios for making HTTP requests
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"; // Import Skeleton component for loading placeholders
import "react-loading-skeleton/dist/skeleton.css"; // Import Skeleton component styles

function Standings(props) {
  // State variables
  const [Standings, setStandings] = useState([]); // Store Standings data (it's the state used on jsx to foreach Standings)
  const [error, setError] = useState(null); // Store error message

  // State variables for different competitions (to  cache fetched competition to reduce api calls)
  const [PL_Standings, setPL_Standings] = useState([]);
  const [PD_Standings, setPD_Standings] = useState([]);
  const [SA_Standings, setSA_Standings] = useState([]);
  const [BL1_Standings, setBL1_Standings] = useState([]);
  const [FL1_Standings, setFL1_Standings] = useState([]);
  const [CL_Standings, setCL_Standings] = useState([]);
  const [EC_Standings, setEC_Standings] = useState([]);

  // Function to fetch Standings data (called by an upcoming useEffect only in case the competition data is not cached)
  const fetchStandings = (competition) => {
    console.log("I'm calling the API (Standings)");
    return axios
      .get("http://localhost:5000/standings", {
        params: {
          competition: competition,
        },
      })
      .then((res) => {
        return res.data.standings[0].table;
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("😕 An error occurred while fetching data !!!");
        return []; // Return an empty array in case of an error
      });
  };

  // function to convert the team form that comes as string ('W,W,L,L,D') into styled <p> element
  const formatTeamForm = (form) => {
    if(!form){
      return <p>-</p> // return - when it's null
    }
    const formArray = form.split(","); // convert string to array
    return formArray.map((result) => { // return here is important
      switch (result) {
        case "W":
          return <p className=" bg-green-600 rounded-full text-white w-4 h-4 text-xs">w</p>;
        case "L":
          return <p className=" bg-red-600 rounded-full text-white w-4 h-4 text-xs">l</p>;
        case "D":
          return <p className=" bg-blue-600 rounded-full text-white w-4 h-4 text-xs">d</p>;
        default:
          return <p className="">-</p>;
      }
    });
  };

  ////////////////////////////////////////////////////////////////////////////////////////////
  // set of UseEffects to set Standings when specific competition's data changes. (due to the asynchronous nature of JavaScript)
  useEffect(() => {
    if (PL_Standings.length !== 0) {
      setStandings(PL_Standings);
    }
  }, [PL_Standings]);

  useEffect(() => {
    if (PD_Standings.length !== 0) {
      setStandings(PD_Standings);
    }
  }, [PD_Standings]);

  useEffect(() => {
    if (SA_Standings.length !== 0) {
      setStandings(SA_Standings);
    }
  }, [SA_Standings]);

  useEffect(() => {
    if (BL1_Standings.length !== 0) {
      setStandings(BL1_Standings);
    }
  }, [BL1_Standings]);

  useEffect(() => {
    if (FL1_Standings.length !== 0) {
      setStandings(FL1_Standings);
    }
  }, [FL1_Standings]);

  useEffect(() => {
    if (CL_Standings.length !== 0) {
      setStandings(CL_Standings);
    }
  }, [CL_Standings]);

  useEffect(() => {
    if (EC_Standings.length !== 0) {
      setStandings(EC_Standings);
    }
  }, [EC_Standings]);
  //////////////////////////////////////////////////////////////////////////////////////////////

  // UseEffect to fetch and set Standings data for the selected competition (call the fetchStandings() function if the competition is not cached, other ways use the cached data)
  useEffect(() => {
    setStandings([]); // to keep the Skeleton loading effect when calling new compitition

    const fetchData = async () => {
      let fetchedData = [];

      switch (props.competition) {
        case "PL":
          if (PL_Standings.length !== 0) {
            setStandings(PL_Standings);
          } else {
            fetchedData = await fetchStandings(props.competition);
            setPL_Standings(fetchedData);
          }
          break;
        case "PD":
          if (PD_Standings.length !== 0) {
            setStandings(PD_Standings);
          } else {
            fetchedData = await fetchStandings(props.competition);
            setPD_Standings(fetchedData);
          }
          break;
        case "SA":
          if (SA_Standings.length !== 0) {
            setStandings(SA_Standings);
          } else {
            fetchedData = await fetchStandings(props.competition);
            setSA_Standings(fetchedData);
          }
          break;
        case "BL1":
          if (BL1_Standings.length !== 0) {
            setStandings(BL1_Standings);
          } else {
            fetchedData = await fetchStandings(props.competition);
            setBL1_Standings(fetchedData);
          }
          break;
        case "FL1":
          if (FL1_Standings.length !== 0) {
            setStandings(FL1_Standings);
          } else {
            fetchedData = await fetchStandings(props.competition);
            setFL1_Standings(fetchedData);
          }
          break;
        case "CL":
          if (CL_Standings.length !== 0) {
            setStandings(CL_Standings);
          } else {
            fetchedData = await fetchStandings(props.competition);
            setCL_Standings(fetchedData);
          }
          break;
        case "EC":
          if (EC_Standings.length !== 0) {
            setStandings(EC_Standings);
          } else {
            fetchedData = await fetchStandings(props.competition);
            setEC_Standings(fetchedData);
          }
          break;
        default:
          fetchedData = await fetchStandings(props.competition);
      }
    };

    fetchData();
  }, [props.competition]);

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* Display error message if an error occurred */}
      {error ? (
        <div className="text-center text-ns_accent text-3xl mt-8">{error}</div>
      ) : Standings.length === 0 ? (
        // Display Skeleton placeholders while loading data
        <>
          {/* Skeleton placeholders  */}
          <Skeleton className="skeleton" height={500} />
        </>
      ) : (
        // Render Standings data
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-2 py-3 text-center">
                  Pos
                </th>
                <th scope="col" className="px-6 py-3">
                  Team
                </th>
                <th scope="col" className="px-2 py-3">
                  Pts
                </th>
                <th scope="col" className="px-2 py-3">
                  Played
                </th>
                <th scope="col" className="px-2 py-3">
                  Win
                </th>
                <th scope="col" className="px-2 py-3">
                  Lose
                </th>
                <th scope="col" className="px-2 py-3">
                  Draw
                </th>
                <th scope="col" className="px-2 py-3">
                  Goals sccored
                </th>
                <th scope="col" className="px-2 py-3">
                  Goals Agains
                </th>
                <th scope="col" className="px-2 py-3">
                  Goals diff
                </th>
                <th scope="col" className="px-2 py-3">
                  Form
                </th>
              </tr>
            </thead>
            <tbody>
              {Standings.map((team, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-2 py-4 text-center">{team.position}</td>
                  <td className="px-2 py-4">
                    <div className="flex justify-start items-center gap-2">
                      <img
                        src={team.team.crest}
                        alt="team logo"
                        width={25}
                        height={25}
                      />
                      <p>{team.team.tla}</p>
                    </div>
                  </td>
                  <td className="px-2 py-4 text-center">{team.points}</td>
                  <td className="px-2 py-4 text-center">{team.playedGames}</td>
                  <td className="px-2 py-4 text-center">{team.won}</td>
                  <td className="px-2 py-4 text-center">{team.lost}</td>
                  <td className="px-2 py-4 text-center">{team.draw}</td>
                  <td className="px-2 py-4 text-center">{team.goalsFor}</td>
                  <td className="px-2 py-4 text-center">{team.goalsAgainst}</td>
                  <td className="px-2 py-4 text-center">
                    {team.goalDifference}
                  </td>
                  <td className="px-2 ">
                    <div className="text-center flex items-center justify-between gap-[2px]">
                      {formatTeamForm(team.form)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Standings;
