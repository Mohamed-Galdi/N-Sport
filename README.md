# n-sport - Football News

![n-sport screenshot](video.gif)

n-sport is a football data explorer built with React, utilizing a proxy server to access the Football Data API. This app offers a simple interface to explore match results, standings, top scorers, and news from the top 5 European leagues, Champions League, and European Cup. It's designed with a user-friendly and responsive interface to provide an easy-to-navigate experience for football enthusiasts.

## Live Demo

Explore the n-sport app live at [https://n-sport.vercel.app/](https://n-sport.vercel.app/).

## Features

- Fetches football-related data from the Football Data API via a proxy server to bypass CORS restrictions.
- Utilizes Vite for fast development and building.
- Styles the UI using Tailwind CSS for efficient and responsive design.
- Incorporates Skeleton for loading indicators during data retrieval.
- Displays match results, standings, top scorers, and news for various football competitions.
- Optimized to work within the Football Data API's free tier limits (10 calls per minute).

## Challenges
One of the significant challenges faced during development was optimizing the app to work within the constraints of the Football Data API's free tier, which limits the number of API calls to 10 per minute. This challenge required careful planning and efficient data fetching strategies to ensure the app's responsiveness while staying within the API limits.

## Acknowledgments
This project is part of my portfolio to showcase my development skills.
Special thanks to the Football Data API for providing valuable football-related data.