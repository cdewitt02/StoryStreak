import React from "react";
import "../styles/Home.css";
import { ThemeProvider } from "@emotion/react";
import theme from "../components/Theme";
import { Typography } from "@mui/material";


function Home() {
  return (
    <ThemeProvider theme={theme}>
      <div className="landing">
        <Typography
          variant="h1"
          fontFamily={"EB Garamond"}
          color={"secondary"}
          align="center"
          noWrap
        >
          Become the writer you want to be
        </Typography>
        <section>
          <Typography
            variant="h4"
            fontFamily={"EB Garamond"}
            color={"secondary"}
            align="center"
            noWrap
          >
            StoryStreak is a application that allows for writers to share their
            stories, articles, blogs and more!
          </Typography>
          <Typography
            variant="h4"
            fontFamily={"EB Garamond"}
            color={"secondary"}
            align="center"
            noWrap
          >
            Write a story and get your streak started today!
          </Typography>
          <Typography
            variant="h6"
            fontFamily={"EB Garamond"}
            color={"secondary"}
            align="center"
            noWrap
          >
            Created by: Charlie DeWitt
          </Typography>     <Typography
            variant="h6"
            fontFamily={"EB Garamond"}
            color={"secondary"}
            align="center"
            noWrap
          >
          charliedewitt20@gmail.com | https://github.com/cdewitt02
          </Typography>
        </section>
      </div>
    </ThemeProvider>
  );
}

export default Home;
