import { useState, useEffect } from "react";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Matches(props) {
  const [Matches, setMatches] = useState([
    {
      id: 435943,
      utcDate: "2023-08-11T19:00:00Z",
      status: "TIMED",
      matchday: 1,
      stage: "REGULAR_SEASON",
      group: null,
      lastUpdated: "2023-06-16T10:33:56Z",
      homeTeam: {
        id: 328,
        name: "Burnley FC",
        shortName: "Burnley",
        tla: "BUR",
        crest: "https://crests.football-data.org/328.png",
      },
      awayTeam: {
        id: 65,
        name: "Manchester City FC",
        shortName: "Man City",
        tla: "MCI",
        crest: "https://crests.football-data.org/65.png",
      },
      score: {
        winner: null,
        duration: "REGULAR",
        fullTime: {
          home: null,
          away: null,
        },
        halfTime: {
          home: null,
          away: null,
        },
      },
      odds: {
        msg: "Activate Odds-Package in User-Panel to retrieve odds.",
      },
      referees: [],
    },
  ]);
  const [error, setError] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [matchDetails, setMatchDetails] = useState("");

  // format that for matches date and time
  function formatDate(utcDate) {
    const date = new Date(utcDate);
    const day = date.toLocaleString("en-US", { weekday: "short" });
    const dayOfMonth = date.getDate();
    const month = date.toLocaleString("en-US", { month: "2-digit" });

    return `${day} ${dayOfMonth}/${month}`;
  }
  function formatTime(utcDate) {
    const date = new Date(utcDate);
    const time = date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${time}`;
  }

  useEffect(() => {
    setMatches([]);
    setSelectedMatch(null);
    axios
      .get("http://localhost:5000/matches", {
        params: {
          competition: props.competition,
        },
      })
      .then((res) => {
        setMatches(res.data.matches);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("😕 An error occurred while fetching data !!!");
      });
  }, [props.competition]);

  const showMatchDetails = async (id, index) => {
    setSelectedMatch(selectedMatch === index ? null : index);
    setMatchDetails("");
    try {
      const response = await axios.get("http://localhost:5000/matcheDetails", {
        params: {
          id: id,
        },
      });
      setMatchDetails(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("😕 An error occurred while fetching data !!!");
    }
  };

  return (
    <div className="flex flex-col gap-4 w-2/3 mt-4">
      {error ? (
        <div className="text-center text-ns_accent text-3xl mt-8">{error}</div>
      ) : Matches.length === 0 ? (
        <>
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
        Matches.map((match, index) => (
          <div key={index}>
            <div
              onClick={() => {
                showMatchDetails(match.id, index);
              }}
              key={index}
              className="flex  items-center bg-white p-4 rounded-md border border-ns_primary h-[80px] hover:cursor-pointer hover:border-2"
            >
              <div className="flex justify-between items-center gap-8 border-r-2 border-r-ns_primary pr-8 w-4/5 h-[55px]">
                <div className="flex justify-start text-center items-center gap-2 w-2/5">
                  <img
                    src={match.homeTeam.crest}
                    alt=""
                    width={35}
                    height={35}
                  />
                  <p>{match.homeTeam.name}</p>
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
                  <p>{match.awayTeam.name}</p>
                  <img
                    src={match.awayTeam.crest}
                    alt=""
                    width={35}
                    height={35}
                  />
                </div>
              </div>
              <div className="w-1/5 flex items-center justify-center flex-col">
                <p>{formatDate(match.utcDate)}</p>{" "}
                <p>{formatTime(match.utcDate)}</p>
              </div>
            </div>
            {selectedMatch === index && (
              <div
                className={`bg-ns_background text-ns_text p-2 rounded-b-md border border-black border-t-0 w-11/12 mx-auto transition-transform transform ${
                  selectedMatch === index
                    ? "translate-y-0"
                    : "-translate-y-full"
                }`}
              >
                <div className=" flex flex-col gap-1">
                  <div className="flex gap-4">
                    <p>Stad:</p>
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
                  <div className="flex gap-4">
                    <p>Refere:</p>
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
                        {matchDetails.referees.name
                          ? matchDetails.referees.name
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
