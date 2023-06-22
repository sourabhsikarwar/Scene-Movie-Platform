
<h1 align="center">✨Scene-Movie-Platform✨</h1>

<!-------------------------- Badges------------------------------>
<div align="center">
  
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)
![Visitors](https://api.visitorbadge.io/api/visitors?path=sourabhsikarwar%2FScene-Movie-Platform%20&countColor=%23263759&style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/sourabhsikarwar/Scene-Movie-Platform?style=for-the-badge)
![GitHub Repo stars](https://img.shields.io/github/stars/sourabhsikarwar/Scene-Movie-Platform?style=for-the-badge)
![GitHub contributors](https://img.shields.io/github/contributors/sourabhsikarwar/Scene-Movie-Platform?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/sourabhsikarwar/Scene-Movie-Platform?style=for-the-badge)
![GitHub repo size](https://img.shields.io/github/repo-size/sourabhsikarwar/Scene-Movie-Platform?style=for-the-badge)
![Github](https://img.shields.io/github/license/sourabhsikarwar/Scene-Movie-Platform?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/sourabhsikarwar/Scene-Movie-Platform?style=for-the-badge)
![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/sourabhsikarwar/Scene-Movie-Platform?style=for-the-badge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/sourabhsikarwar/Scene-Movie-Platform?style=for-the-badge)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/sourabhsikarwar/Scene-Movie-Platform?style=for-the-badge)
  
</div>

<!-------------------------Table of Contents------------------------------>

<div id="top"></div>

## Table of Contents🧾

- [Introduction📌](#introduction)
- [Technology Used🚀](#technology-used)
- [Getting Started💥](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [How To Contribute](#how-to-contribute)
- [Code Of Conduct📑](#code-of-conduct)
- [Project Admin⚡](#project-admin)
- [Contributing is fun🧡](#contributing-is-fun)


<!-------------------------------------Introduction-------------------------------- -->
## Introduction📌

Scene is a OTT platform clone, similar to popular streaming services like Netflix or Hulu. It is built using React.js for the frontend and Firebase for the backend services.

### Features
 - **User Authentication**: Users can sign up, log in, and manage their accounts. Firebase Authentication is used to handle user authentication and account management.

 - **Media Catalog**: The platform provides a catalog of movies, TV shows, and other media content. Users can browse and search for their favorite shows or movies.

 - **Media Details**:Each media item has its own dedicated page with details such as title, description, genre, and rating.

 - **User Profiles**: Users can create personalized profiles and manage their watchlists, favorites, and viewing history.

## Live Site -- [Click Here](https://scene-movie-platform.vercel.app/)


<!---------------------Tech stack---------------------------- -->
<h2>Technology Used🚀</h2>
<p>
 
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

<p align="right">(<a href="#top">back to top</a>)</p>
<!--------------------Getting Started--------------------------- -->

## Getting Started💥
To get started with Scene Movie Platform, follow the instructions below.

### Prerequisites

Before installing the application, ensure that you have the following:
- Node.js (version 12 or higher)
- MovieDB API Key

<!-- - MongoDB  -->

### Installation

1. Fork this Repository.
2. Clone the forked repository in your local system.
```bash
git clone https://github.com/<your-github-username>/Scene-Movie-Platform.git
```
3. Navigate to the project directory:
```bash
cd Scene-Movie-Platform
``` 
4. Install Dependencies
```bash
npm i
#or
yarn install
```
### Running the Application

To run the application, follow the steps below

1. Set up a Firebase project and enable the necessary services ((Firebase Authentication, Firebase Firestore, Firebase Storage).
> Firebase setup is already done in this repo you can skip this step.
2.  Get an API KEY from [MovieDB Website](http://api.themoviedb.org/).
3.  Create a `.env` file in root directory.
```.env
REACT_APP_API_KEY=paste your moviedb api key
```
4. Then start the application with
```bash
npm start #using npm 
#or
yarn start #using yarn 
```
5.Open your web browser and visit [localhost:3000](http://localhost:3000) to access the Scene Movie Platform.

### How To Contribute

We welcome contributions from the community! To contribute to the Scene Movie Platform project, follow the steps below:

- View the [Live Project](https://scene-movie-platform.vercel.app/) here.
- Raise an issue if you find a bug or add a feature.
- Wait for the issue to be assigned and proceed only after the issue is assigned to you.
- Navigate to the project directory.
```bash
cd Scene-Movie-Platform
```
- Create a new branch for your feature.
```bash
git checkout -b <your_branch_name>
```
- Perfom your desired changes to the code base.
- Track and stage your changes.
```bash
# Track the changes
git status
# Add changes to Index
git add .
```
- Commit your changes.
```
git commit -m "your_commit_message"
```
- Push your committed changes to the remote repo.
```
git push origin <your_branch_name>
```
- Go to your forked repository on GitHub and click on `Compare & pull request`.
- Add an appropriate title and description to your pull request explaining your changes and efforts done.
- Click on `Create pull request`.
- Congrats! 🥳 You've made your first pull request to this project repo.
- Wait for your pull request to be reviewed and if required suggestions would be provided to improve it.
- Celebrate 🥳 your success after your pull request is merged successfully.
<p align="right">(<a href="#top">back to top</a>)</p>

### Increase Lighthouse score (Performance, Accessibity and SEO)

- Use modern image formats like WebP, which offer better compression than JPEG or PNG.
- Use lazy loading techniques to defer loading images until they come into view.
- Minify your JavaScript and CSS files to remove unnecessary characters, white spaces, and comments, reducing file sizes. This will be done automatically when you build the react app.
- Utilize code splitting techniques to load only the necessary code for each page, reducing the initial bundle size and improving load times.
- Remove all the console.log messages.
- Remove all the unused javascript codes.
- Only include li tags directly inside ul tags
- Add proper associated labels to all form elements


<!-----------------Code Of Conduct--------------------------- -->
<h2>Code Of Conduct📑</h2>

This project and everyone participating in it is governed by the [Code of Conduct](https://github.com/sourabhsikarwar/Scene-Movie-Platform/blob/master/CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.


<!-- --------------------------------------------------------------------------------------------------------------------------------------------------------- -->
<h2>This repo is a part of the following Open Source Program🥳</h2>
<table>
<tr>
<td align="center">
<a href="https://gssoc.girlscript.tech/"><img src="https://gssoc.girlscript.tech/GS_logo_White.svg" height="140px" width="100%" alt="Hacktoberfest2022"></a><br><sub><b>GSSoC '23</b></sub>
</td>
</tr>
</table>

<p align="right">(<a href="#top">back to top</a>)</p>
<!-- --------------------------------------------------------------------------------------------------------------------------------------------------------- -->
<h2>Project Admin⚡</h2>
<table>
<tr>
<td align="center">
<a href="https://github.com/sourabhsikarwar/"><img src="https://avatars.githubusercontent.com/u/85223699?v=4" height="150px" width="150px" alt="Sourabh Sikarwar"></a><br><sub><b>Sourabh Sikarwar</b></sub>
</td>
</tr>
</table>
<!-- --------------------------------------------------------------------------------------------------------------------------------------------------------- -->

<h2>Project Contributors🫂</h2>

<a href="https://github.com/sourabhsikarwar/scene-movie-platform/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sourabhsikarwar/scene-movie-platform" />

</a>
<!-- --------------------------------------------------------------------------------------------------------------------------------------------------------- -->

<h2>Contributing is fun🧡</h2>

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

<h3>Contributions of any kind from anyone are always welcome🌟!!</h3>
<h3>Give it a 🌟 if you ❤ this project. Happy Coding👨‍💻</h3>
<p align="right">(<a href="#top">back to top</a>)</p>
