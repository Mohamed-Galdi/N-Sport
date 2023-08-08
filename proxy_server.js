import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const port = 5000;
app.use(cors());

app.get("/matches", async (req, res) => {
  const competition = req.query.competition;
  
  try {
    const response_1 = await axios.get(
      "https://api.football-data.org/v4/competitions/"+ competition,
      {
        headers: {
          "X-Auth-Token": "eb4c3705e0174cf6ae84847c5968441f",
        },
      }
    );
    const matchDay = response_1.data.currentSeason.currentMatchday;
    const response = await axios.get(
      "https://api.football-data.org/v4/competitions/"+ competition +"/matches/?matchday=" +
        matchDay,
      {
        headers: {
          "X-Auth-Token": "eb4c3705e0174cf6ae84847c5968441f",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res
      .status(error.response?.status || 500)
      .json({ error: "Error fetching data" });
  }
});

app.get("/matcheDetails", async (req, res) => {
  const id = req.query.id;

  try {
    console.log("Fetching data for match ID:", id);
    const response = await axios.get(
      `https://api.football-data.org/v4/matches/${id}`,
      {
        headers: {
          "X-Auth-Token": "eb4c3705e0174cf6ae84847c5968441f",
        },
      }
    );
    console.log("Fetched data:", response.data);
    res.json(response.data); 
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res
      .status(error.response?.status || 500)
      .json({ error: "Error fetching data" });
  }
});




app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
