import { useState, useEffect } from "react"; // Import React hooks
import axios from "axios"; // Import Axios for making HTTP requests
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"; // Import Skeleton component for loading placeholders
import "react-loading-skeleton/dist/skeleton.css"; // Import Skeleton component styles
import Countdown from "./utils/Countdown";

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

  //Round States
  const [currentRound, setCurrentRound] = useState();
  const [selectedRound, setSelectedRound] = useState();
  const [totalRounds, setTotalRounds] = useState();

  // Function to format date (Day Month X 202Y)
  function formatDate(utcDate) {
    const date = new Date(utcDate);
    const day = date.toLocaleString("en-US", { weekday: "short" });
    const dayOfMonth = date.getDate();
    const month = date.toLocaleString("en-US", { month: "2-digit" });
    return `${day} ${dayOfMonth}/${month}`;
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
    return axios
      .get(`${import.meta.env.VITE_API_URL}/matches`, {
        params: {
          competition: competition,
        },
      })
      .then((res) => {
        setSelectedRound(res.data.currentRound);
        setCurrentRound(res.data.currentRound);
        setTotalRounds(res.data.totalRounds);
        const allMatches = res.data.allMatches;
        return allMatches;
      })
      .catch((error) => {
        // console.error("Error fetching data:", error);
        return []; // Return an empty array in case of an error
      });
  };

  // Function to handle the navigation of rounds
  const handleIncrementRound = () => {
    if (selectedRound < totalRounds) {
      setSelectedRound(selectedRound + 1);
    }
  };
  const handleDecrementRound = () => {
    if (selectedRound > 1) {
      setSelectedRound(selectedRound - 1);
    }
  };

  // Function to determine match status (used in jsx to render a status text based on match.status value)
  const matchStatus = (status) => {
    switch (status) {
      case "SCHEDULED":
        return (
          <div className="mx-auto w-1/5">
            <p className="text-center mx-auto">Date is not available yet </p>
          </div>
        );

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
        return <p className="text-center mx-auto"> Postponed </p>;
      case "SUSPENDED":
        return <p className="text-center mx-auto"> Suspended </p>;
      case "CANCELED":
        return <p className="text-center mx-auto"> Canceled </p>;
      default:
        return <p className="text-center mx-auto"> Unknown </p>;
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
      // console.error("Error fetching data:", error);
      // setError("😕 An error occurred while fetching data !!!");
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
        default:
          fetchedData = await fetchMatches(props.competition);
      }
    };

    fetchData();
  }, [props.competition]);

  return (
    <div>
      {!currentRound ? (
        <Skeleton className="skeleton mt-4" height={30} />
      ) : (
        <div className="w-full h-16 mt-4  flex justify-between gap-4">
          <button
            onClick={handleDecrementRound}
            className="rounded-md bg-white w-1/6 flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              width="20"
              viewBox="0 0 320 512"
              fill="#4e84f9"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
          </button>

          <div
            className={`rounded-md w-full flex flex-col justify-center items-center font-Ubuntu md:text-xl ${
              selectedRound === currentRound ? " bg-ns_primary text-white" : "bg-white"
            }`}
          >
            <p>Round: {selectedRound} </p>
            {selectedRound === currentRound ? (
              <p className="text-sm">🟢 current round</p>
            ) : null}
          </div>
          <button
            onClick={handleIncrementRound}
            className="rounded-md bg-white w-1/6 flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              width="20"
              viewBox="0 0 320 512"
              fill="#4e84f9"
            >
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4 mt-4">
        {/* Display error message if an error occurred */}
        {error ? (
          <div className="text-center text-ns_accent text-3xl mt-8">
            {error}
          </div>
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
          Matches.filter((match) => match.matchday === selectedRound).map(
            (match, index) => (
              <div key={index}>
                {match.homeTeam.id && match.awayTeam.id ? (
                  // Match information
                  <div>
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
                    <div>
                      {/* // Display match details if selected */}
                      {selectedMatch === index && (
                        <div
                          className={`bg-ns_background text-ns_text p-2 rounded-b-md border border-black border-t-0 w-11/12 mx-auto transition-transform transform ${
                            selectedMatch === index
                              ? "translate-y-0"
                              : "-translate-y-full"
                          }`}
                        >
                          {/* Match details */}
                          <div className=" flex flex-col gap-1 ">
                            {match.status == "TIMED" ? (
                              <div className="flex md:gap-4 gap-1">
                                <p className=" text-sm md:text-base">
                                  Start in:{" "}
                                </p>
                                {matchDetails === "" ? (
                                  <SkeletonTheme
                                    baseColor="#f5f5f5"
                                    highlightColor="#444"
                                  >
                                    <Skeleton
                                      className="skeleton"
                                      height={10}
                                      containerClassName="flex-1"
                                    />
                                  </SkeletonTheme>
                                ) : (
                                  <Countdown matchDate={match.utcDate} />
                                )}
                              </div>
                            ) : null}
                            <div className="flex md:gap-4 gap-1">
                              {/* Display stadium information */}
                              <p className=" text-sm md:text-base ">Stadium:</p>
                              {matchDetails === "" ? (
                                <SkeletonTheme
                                  baseColor="#f5f5f5"
                                  highlightColor="#444"
                                >
                                  <Skeleton
                                    className="skeleton"
                                    height={10}
                                    containerClassName="flex-1"
                                  />
                                </SkeletonTheme>
                              ) : (
                                <p className="border-ns_primary border-2 rounded-lg md:px-3 px-1 text-sm md:text-base">
                                  {matchDetails.venue}
                                </p>
                              )}
                            </div>
                            {/* Display referee information */}
                            <div className="flex md:gap-4 gap-1">
                              <p className=" text-sm md:text-base">Referee:</p>
                              {matchDetails === "" ? (
                                <SkeletonTheme
                                  baseColor="#f5f5f5"
                                  highlightColor="#444"
                                >
                                  <Skeleton
                                    className="skeleton"
                                    height={10}
                                    containerClassName="flex-1"
                                  />
                                </SkeletonTheme>
                              ) : (
                                <p className="border-ns_primary border-2 rounded-lg md:px-3 px-1 text-sm md:text-base">
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
                  </div>
                ) : null}
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

export default Matches;
