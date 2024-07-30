
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/cdewitt2/StoryStreak">
    <img src="frontend/public/storystrek.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">StoryStreak</h3>

  <p align="center">
    A project social media application that allows users to share their writing and compare daily post streaks
    <br />
    <br />
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

Project Link: https://30d5ec58-eb05-4605-b096-3a36dca1f19f.e1-us-east-azure.choreoapps.dev/

The site will be slow because I am using the free tier of Choreo so bear with me

![Home Screen Shot][home-screenshot]

I created this project because I wanted to learn the Django framework to build APIs and database functionality. As you may be able to tell (from my ugly frontend), I am a backend focused developer, but I wanted to challenge myself to create a fullstack application. Above is the landing page and is the only page accessible without logging in (login, logout, register all availible by clicking top right icon, simple react so not shown).

![Posts Screen Shot][posts-screenshot]

The above picture is the "Read" tab that allows users to click on a story that seems interesting to read. If the read tab is clicked without koggin in the user is automatically redirected to the login page.

After clicking on a story, the reader is directed to the read detail view where they can view the content, like, comment and compare their streak to the author's

![Read Detail Name Screen Shot][read-detail-screenshot]

Below is the place where the writting is done (again sorry for my frontend). I used the ReactJS library Quill to handle the rich text editing. This allows the writer to put headers, indent, italisize, and more.

![Create Screen Shot][create-screenshot]
![MyPosts Name Screen Shot][myposts-screenshot]



### Built With

Django was used for the backend server, handling REST API requests and database operations. This was a lost easier than previous Flask projects I have done because of all the funcitonality Django takes care of automatically. A Vite/ReactJS frontend was used to create the frontend server. To handle user authentication I used JSON Web Tokens with a refresh and access token.


## Potential Additions

* Tags/Categories for stories
* Search Bar for authors/tags/categories/titles
* Better UI design

<!-- CONTACT -->
## Contact

Charlie DeWitt - charliedewitt20@gmail.com

Project Link: [https://github.com/cdewitt02/StoryStreak](https://github.com/cdewitt02/StoryStreak)



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/charlie-dewitt/
[home-screenshot]: frontend/public/Home.png
[posts-screenshot]: frontend/public/posts.png
[read-detail-screenshot]: frontend/public/readdet.png
[create-screenshot]: frontend/public/create.png
[myposts-screenshot]: frontend/public/myposts.png
