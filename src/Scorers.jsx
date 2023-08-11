import { useState, useEffect } from "react"; // Import React hooks
import axios from "axios"; // Import Axios for making HTTP requests
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"; // Import Skeleton component for loading placeholders
import "react-loading-skeleton/dist/skeleton.css"; // Import Skeleton component styles

function Scorers(props) {
  // State variables
  const [Scorers, setScorers] = useState([]); // Store Scorers data (it's the state used on jsx to foreach Scorers)
  const [error, setError] = useState(null); // Store error message

  // State variables for different competitions (to  cache fetched competition to reduce api calls)
  const [PL_Scorers, setPL_Scorers] = useState([]);
  const [PD_Scorers, setPD_Scorers] = useState([]);
  const [SA_Scorers, setSA_Scorers] = useState([]);
  const [BL1_Scorers, setBL1_Scorers] = useState([]);
  const [FL1_Scorers, setFL1_Scorers] = useState([]);
  const [CL_Scorers, setCL_Scorers] = useState([]);
  const [EC_Scorers, setEC_Scorers] = useState([]);

  // Function to fetch Scorers data (called by an upcoming useEffect only in case the competition data is not cached)
  const fetchScorers = (competition) => {
    console.log("I'm calling the API (Scorers)");
    return axios
      .get("http://localhost:5000/scorers", {
        params: {
          competition: competition,
        },
      })
      .then((res) => {
        return res.data.scorers;
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("😕 An error occurred while fetching data !!!");
        return []; // Return an empty array in case of an error
      });
  };

  ////////////////////////////////////////////////////////////////////////////////////////////
  // set of UseEffects to set Scorers when specific competition's data changes. (due to the asynchronous nature of JavaScript)
  useEffect(() => {
    if (PL_Scorers.length !== 0) {
      setScorers(PL_Scorers);
    }
  }, [PL_Scorers]);

  useEffect(() => {
    if (PD_Scorers.length !== 0) {
      setScorers(PD_Scorers);
    }
  }, [PD_Scorers]);

  useEffect(() => {
    if (SA_Scorers.length !== 0) {
      setScorers(SA_Scorers);
    }
  }, [SA_Scorers]);

  useEffect(() => {
    if (BL1_Scorers.length !== 0) {
      setScorers(BL1_Scorers);
    }
  }, [BL1_Scorers]);

  useEffect(() => {
    if (FL1_Scorers.length !== 0) {
      setScorers(FL1_Scorers);
    }
  }, [FL1_Scorers]);

  useEffect(() => {
    if (CL_Scorers.length !== 0) {
      setScorers(CL_Scorers);
    }
  }, [CL_Scorers]);

  useEffect(() => {
    if (EC_Scorers.length !== 0) {
      setScorers(EC_Scorers);
    }
  }, [EC_Scorers]);
  //////////////////////////////////////////////////////////////////////////////////////////////

  // UseEffect to fetch and set Scorers data for the selected competition (call the fetchScorers() function if the competition is not cached, other ways use the cached data)
  useEffect(() => {
    setScorers([]); // to keep the Skeleton loading effect when calling new compitition

    const fetchData = async () => {
      let fetchedData = [];

      switch (props.competition) {
        case "PL":
          if (PL_Scorers.length !== 0) {
            setScorers(PL_Scorers);
          } else {
            fetchedData = await fetchScorers(props.competition);
            setPL_Scorers(fetchedData);
          }
          break;
        case "PD":
          if (PD_Scorers.length !== 0) {
            setScorers(PD_Scorers);
          } else {
            fetchedData = await fetchScorers(props.competition);
            setPD_Scorers(fetchedData);
          }
          break;
        case "SA":
          if (SA_Scorers.length !== 0) {
            setScorers(SA_Scorers);
          } else {
            fetchedData = await fetchScorers(props.competition);
            setSA_Scorers(fetchedData);
          }
          break;
        case "BL1":
          if (BL1_Scorers.length !== 0) {
            setScorers(BL1_Scorers);
          } else {
            fetchedData = await fetchScorers(props.competition);
            setBL1_Scorers(fetchedData);
          }
          break;
        case "FL1":
          if (FL1_Scorers.length !== 0) {
            setScorers(FL1_Scorers);
          } else {
            fetchedData = await fetchScorers(props.competition);
            setFL1_Scorers(fetchedData);
          }
          break;
        case "CL":
          if (CL_Scorers.length !== 0) {
            setScorers(CL_Scorers);
          } else {
            fetchedData = await fetchScorers(props.competition);
            setCL_Scorers(fetchedData);
          }
          break;
        case "EC":
          if (EC_Scorers.length !== 0) {
            setScorers(EC_Scorers);
          } else {
            fetchedData = await fetchScorers(props.competition);
            setEC_Scorers(fetchedData);
          }
          break;
        default:
          fetchedData = await fetchScorers(props.competition);
      }
    };

    fetchData();
  }, [props.competition]);

  //   console.log(Scorers)

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* Display error message if an error occurred */}
      {error ? (
        <div className="text-center text-ns_accent text-3xl mt-8">{error}</div>
      ) : Scorers.length === 0 ? (
        // Display Skeleton placeholders while loading data
        <>
          {/* Skeleton placeholders  */}
          {/* <Skeleton className="skeleton" height={500} /> */}
         
          <p className=" mt-4 text-2xl font-Ubuntu text-ns_primary"> {/* this message is better than skeleton loader because before competition start the api sends an empty array */}
            Scorers data still not available
          </p>
        </>
      ) : (
        // Render Scorers data
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-2 py-3 text-center">
                  Team
                </th>
                <th scope="col" className="px-6 py-3">
                  Player
                </th>
                <th scope="col" className="px-2 py-3">
                  Goals (penalties)
                </th>
                <th scope="col" className="px-2 py-3">
                  Assists
                </th>
                <th scope="col" className="px-2 py-3">
                  Played Matches
                </th>
              </tr>
            </thead>
            <tbody>
              {Scorers.map((player, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-2 py-4 text-center">
                    <img
                      className="mx-auto"
                      src={player.team.crest}
                      alt="team logo"
                      width={25}
                      height={25}
                    />
                  </td>

                  <td className="px-2 py-4 text-center">
                    {player.player.name}
                  </td>
                  <td className="px-2 py-4 text-center">
                    {player.goals ? player.goals : "0"} (
                    {player.penalties ? player.penalties : "0"})
                  </td>
                  <td className="px-2 py-4 text-center">
                    {player.assists ? player.assists : "0"}
                  </td>
                  <td className="px-2 py-4 text-center">
                    {player.playedMatches ? player.playedMatches : "0"}
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

export default Scorers;
