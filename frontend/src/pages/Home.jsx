import React from "react";
import "../styles/Home.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./Theme";
import { Typography } from "@mui/material";


function Home() {
  return (
    <ThemeProvider theme={theme}>
      <div className="landing">
        <Typography
          variant="h2"
          fontFamily={"EB Garamond"}
          color={"secondary"}
          align="center"
          noWrap
        >
          Become the writer you want to be
        </Typography>
        <section>
          <Typography
            variant="h6"
            fontFamily={"EB Garamond"}
            color={"secondary"}
            align="center"
            noWrap
          >
            StoryStreak is a application that allows for writers to share their
            stories, articles, blogs and more!
          </Typography>
          <Typography
            variant="h6"
            fontFamily={"EB Garamond"}
            color={"secondary"}
            align="center"
            noWrap
          >
            Write a story and get your streak started today!
          </Typography>
        </section>
      </div>
    </ThemeProvider>
  );
}

export default Home;
