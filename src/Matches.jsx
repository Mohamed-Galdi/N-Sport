import { useState, useEffect } from "react"; // Import React hooks
import axios from "axios"; // Import Axios for making HTTP requests
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"; // Import Skeleton component for loading placeholders
import "react-loading-skeleton/dist/skeleton.css"; // Import Skeleton component styles

function Matches(props) {
  // State variables
  const [Matches, setMatches] = useState([]); // Store matches data (it's the state used on jsx to foreach matches)
  const [selectedMatch, setSelectedMatch] = useState(null); // Store index of selected match (to show details)
  const [matchDetails, setMatchDetails] = useState(""); // Store match details
  const [error, setError] = useState(null); // Store error message

  // State variables for different competitions (to  cache fetched competition to reduce api calls)
  const [PL_Matches, setPL_Matches] = useState([]);
  const [PD_Matches, setPD_Matches] = useState([]);
  const [SA_Matches, setSA_Matches] = useState([]);
  const [BL1_Matches, setBL1_Matches] = useState([]);
  const [FL1_Matches, setFL1_Matches] = useState([]);
  const [CL_Matches, setCL_Matches] = useState([]);
  const [EC_Matches, setEC_Matches] = useState([]);

  // Function to format date (Day Month X 202Y)
  function formatDate(utcDate) {
    const date = new Date(utcDate);
    const now = new Date();

    // Calculate the difference in days between the input date and today
    const timeDiff = date.getTime() - now.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
      return "TODAY";
    } else if (daysDiff === 1) {
      return "TOMORROW";
    } else {
      const day = date.toLocaleString("en-US", { weekday: "short" });
      const dayOfMonth = date.getDate();
      const month = date.toLocaleString("en-US", { month: "2-digit" });
      return `${day} ${dayOfMonth}/${month}`;
    }
  }


  // Function to format time (hh:mm PM)
  function formatTime(utcDate) {
    const date = new Date(utcDate);
    const time = date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${time}`;
  }

  // Function to fetch matches data (called by an upcoming useEffect only in case the competition data is not cached)
  const fetchMatches = (competition) => {
    // console.log("I'm calling the API (Matches)");
    return axios
      .get(`${import.meta.env.VITE_API_URL}/matches`, {
        params: {
          competition: competition,
        },
      })
      .then((res) => {
        return res.data;
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("😕 An error occurred while fetching data !!!");
        return []; // Return an empty array in case of an error
      });
  };

  // Function to determine match status (used in jsx to render a status text based on match.status value)
  const matchStatus = (status) => {
    switch (status) {
      case "SCHEDULED":
        return <p>Date is not available yet</p>;

      case "IN_PLAY":
        return (
          <div className="mx-auto">
            <p className="text-center mx-auto">🟢 Live </p>
          </div>
        );
      case "PAUSED":
        return (
          <div className="mx-auto">
            <p className="text-center mx-auto">🔵 Half-Time Pause </p>
          </div>
        );
      case "FINISHED":
        return (
          <div className="mx-auto">
            <p className="text-center mx-auto">🔴 Finished </p>
          </div>
        );
      case "POSTPONED":
        return   <p className="text-center mx-auto"> Postponed </p>;
      case "SUSPENDED":
        return   <p className="text-center mx-auto"> Suspended </p>;
      case "CANCELED":
        return   <p className="text-center mx-auto"> Canceled </p>;
      default:
        return  <p className="text-center mx-auto"> Unknown </p>;
    }
  };

  // Function to show match details (called on match click to show it's details)
  const showMatchDetails = async (id, index) => {
    setSelectedMatch(selectedMatch === index ? null : index);
    setMatchDetails("");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/matchDetails`,
        {
          params: {
            id: id,
          },
        }
      );
      setMatchDetails(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("😕 An error occurred while fetching data !!!");
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////
  // set of UseEffects to set matches when specific competition's data changes. (due to the asynchronous nature of JavaScript)
  useEffect(() => {
    if (PL_Matches.length !== 0) {
      setMatches(PL_Matches);
    }
  }, [PL_Matches]);

  useEffect(() => {
    if (PD_Matches.length !== 0) {
      setMatches(PD_Matches);
    }
  }, [PD_Matches]);

  useEffect(() => {
    if (SA_Matches.length !== 0) {
      setMatches(SA_Matches);
    }
  }, [SA_Matches]);

  useEffect(() => {
    if (BL1_Matches.length !== 0) {
      setMatches(BL1_Matches);
    }
  }, [BL1_Matches]);

  useEffect(() => {
    if (FL1_Matches.length !== 0) {
      setMatches(FL1_Matches);
    }
  }, [FL1_Matches]);

  useEffect(() => {
    if (CL_Matches.length !== 0) {
      setMatches(CL_Matches);
    }
  }, [CL_Matches]);

  useEffect(() => {
    if (EC_Matches.length !== 0) {
      setMatches(EC_Matches);
    }
  }, [EC_Matches]);
  //////////////////////////////////////////////////////////////////////////////////////////////

  // UseEffect to fetch and set matches data for the selected competition (call the fetchMatches() function if the competition is not cached, other ways use the cached data)
  useEffect(() => {
    setMatches([]); // to keep the Skeleton loading effect when calling new compitition
    setSelectedMatch(null); // to keep the Skeleton loading effect when calling new match details

    const fetchData = async () => {
      let fetchedData = [];

      switch (props.competition) {
        case "PL":
          if (PL_Matches.length !== 0) {
            setMatches(PL_Matches);
          } else {
            fetchedData = await fetchMatches(props.competition);
            setPL_Matches(fetchedData);
          }
          break;
        case "PD":
          if (PD_Matches.length !== 0) {
            setMatches(PD_Matches);
          } else {
            fetchedData = await fetchMatches(props.competition);
            setPD_Matches(fetchedData);
          }
          break;
        case "SA":
          if (SA_Matches.length !== 0) {
            setMatches(SA_Matches);
          } else {
            fetchedData = await fetchMatches(props.competition);
            setSA_Matches(fetchedData);
          }
          break;
        case "BL1":
          if (BL1_Matches.length !== 0) {
            setMatches(BL1_Matches);
          } else {
            fetchedData = await fetchMatches(props.competition);
            setBL1_Matches(fetchedData);
          }
          break;
        case "FL1":
          if (FL1_Matches.length !== 0) {
            setMatches(FL1_Matches);
          } else {
            fetchedData = await fetchMatches(props.competition);
            setFL1_Matches(fetchedData);
          }
          break;
        case "CL":
          if (CL_Matches.length !== 0) {
            setMatches(CL_Matches);
          } else {
            fetchedData = await fetchMatches(props.competition);
            setCL_Matches(fetchedData);
          }
          break;
        case "EC":
          if (EC_Matches.length !== 0) {
            setMatches(EC_Matches);
          } else {
            fetchedData = await fetchMatches(props.competition);
            setEC_Matches(fetchedData);
          }
          break;
        default:
          fetchedData = await fetchMatches(props.competition);
      }
    };

    fetchData();
  }, [props.competition]);

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* Display error message if an error occurred */}
      {error ? (
        <div className="text-center text-ns_accent text-3xl mt-8">{error}</div>
      ) : Matches.length === 0 ? (
        // Display Skeleton placeholders while loading data
        <>
          {/* Skeleton placeholders  */}
          <Skeleton className="skeleton" height={80} />
          <Skeleton className="skeleton" height={80} />
          <Skeleton className="skeleton" height={80} />
          <Skeleton className="skeleton" height={80} />
          <Skeleton className="skeleton" height={80} />
          <Skeleton className="skeleton" height={80} />
          <Skeleton className="skeleton" height={80} />
          <Skeleton className="skeleton" height={80} />
          <Skeleton className="skeleton" height={80} />
        </>
      ) : (
        // Render matches data
        Matches.map((match, index) => (
          <div key={index}>
            {/* Match information */}
            <div
              onClick={() => {
                showMatchDetails(match.id, index);
              }}
              key={index}
              className="flex md:flex-row flex-col  items-center bg-white p-4 pe-1 rounded-md border border-ns_primary md:h-[80px] hover:cursor-pointer hover:border-2"
            >
              <div className="flex justify-between items-center gap-8 order-last md:order-first md:border-r-2 border-t-2 md:border-t-0 border-t-ns_primary pt-4 mt-2 md:pt-0 md:mt-0 md:border-r-ns_primary md:pr-8 md:w-4/5 h-[55px]">
                <div className="flex justify-start text-center items-center gap-2 w-2/5">
                  <img
                    src={match.homeTeam.crest}
                    alt=""
                    width={35}
                    height={35}
                  />
                  <p className="md:block hidden">
                    {match.homeTeam.shortName
                      ? match.homeTeam.shortName
                      : "not yet defined"}
                  </p>
                  <p className="md:hidden block">
                    {match.homeTeam.tla
                      ? match.homeTeam.tla
                      : "not yet defined"}
                  </p>
                </div>

                <div className="flex justify-around px-2 items-center gap-2 w-1/5 border-2 h-8 border-ns_primary rounded-md">
                  <p>
                    {match.score.fullTime.home !== null
                      ? match.score.fullTime.home
                      : match.score.fullTime.home !== 0
                      ? "-"
                      : "0"}
                  </p>
                  <p> : </p>
                  <p>
                    {match.score.fullTime.away !== null
                      ? match.score.fullTime.away
                      : match.score.fullTime.away !== 0
                      ? "-"
                      : "0"}
                  </p>
                </div>

                <div className="flex justify-end text-center items-center gap-2 w-2/5">
                  <p className="md:block hidden">
                    {match.awayTeam.shortName
                      ? match.awayTeam.shortName
                      : "not yet defined"}
                  </p>
                  <p className="md:hidden block">
                    {match.awayTeam.tla
                      ? match.awayTeam.tla
                      : "not yet defined"}
                  </p>
                  <img
                    src={match.awayTeam.crest}
                    alt=""
                    width={35}
                    height={35}
                  />
                </div>
              </div>
              {match.status !== "TIMED" ? (
                matchStatus(match.status)
              ) : (
                <div className="w-full flex justify-around md:justify-end px-10 md:px-0  md:w-1/5 md:flex-col md:items-center md:gap-2">
                  <p>{formatDate(match.utcDate)} 📅 </p>
                  <p>{formatTime(match.utcDate)} ⏰</p>{" "}
                </div>
              )}
            </div>
            {/* Display match details if selected */}
            {selectedMatch === index && (
              <div
                className={`bg-ns_background text-ns_text p-2 rounded-b-md border border-black border-t-0 w-11/12 mx-auto transition-transform transform ${
                  selectedMatch === index
                    ? "translate-y-0"
                    : "-translate-y-full"
                }`}
              >
                {/* Match details */}
                <div className=" flex flex-col gap-1">
                  <div className="flex gap-4">
                    {/* Display stadium information */}
                    <p>Stadium:</p>
                    {matchDetails === "" ? (
                      <SkeletonTheme baseColor="#f5f5f5" highlightColor="#444">
                        <Skeleton
                          className="skeleton"
                          height={10}
                          containerClassName="flex-1"
                        />
                      </SkeletonTheme>
                    ) : (
                      <p>{matchDetails.venue}</p>
                    )}
                  </div>
                  {/* Display referee information */}
                  <div className="flex gap-4">
                    <p>Referee:</p>
                    {matchDetails === "" ? (
                      <SkeletonTheme baseColor="#f5f5f5" highlightColor="#444">
                        <Skeleton
                          className="skeleton"
                          height={10}
                          containerClassName="flex-1"
                        />
                      </SkeletonTheme>
                    ) : (
                      <p>
                        {matchDetails.referees.length !== 0
                          ? matchDetails.referees[0].name
                          : "unknown yet"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Matches;
