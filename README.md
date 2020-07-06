# h!pstar
h!pstar is a movie rating and recommendation app which connects users and recommends movies by a metric of mutual distaste.

## Table of Contents
    *[Search Database] (#search-the-movie-database)
    *[User Profile] (#user-profile)
    *[Recommendation Page] (#recommendation-page)
    *[Future Plans] (#future-plans)
    *[Technology Used] (#technology-used)
    *[Install Instructions] (#install-instructions)

## The User Experience

### Search The Movie Database

With help from an external API (The Movie Database), a user can search for a movie and see the results of their search. From the search results page, a user can rate the movie as "Loved" or "Hated," and can remove existing ratings from films.  

![Search Results](/src/readMeImg/search-image.png)

Clicking on a search results card will open a modal which gives the user more detailed description of the film.

![Search Modal](/src/readMeImg/search-modal-image.png)

### User Profile

After a user has rated movies, the Loved and Hated movies will show up under the "Loves" and "Hates" tabs on the user's profile page. From here users can re-rate movies or remove a rating. When these affordances are utilized, the movie will be moved to the corosponding tab on the profile or removed form the profile entirely.

![Profile Page](src/readMeImg/profile-image.png)

From the Profile Page, when a user clicks on a movie card, they are presented with a modal displaying a description of the film, reviews of the movie made by users of the site, and an affordance for the active user to add their own review.

When a user clicks on one of their own reviews they an affordance to edit or delete the review is displayed. When the user clicks on another reviewers username they are directed to that user's profile page.

<!-- ![Movie Modal](src/readMeImg/comments-image.png) -->
![Edit Modal](src/readMeImg/Edit-modal.png)

### Recomendation Page

After a user has rated a movie as "Hated," they are delivered a list of recommended movies on the Recs page. The active user's list of hated movies is compared to all other user's hated movies list and is matched with the user whose Hated Movie List has the most in common. The active user is presented with movies from the matched user's Loved Movie List which the active user has not yet rated.

![Recs Page](src/readMeImg/recs-image.png)

### Future Plans

This was a front-end project at Nashville Software School, made before I had a concpetion of what back-end meant. I soon came to realize that my ultimate conception of a movie recommendation project was that of a back-end project. A future iteration of this app will be build with Django ORM with Rest Framework. Recommendations will be based on more advanced data relationships.

## Technologies Used
    React.js
    Reactstrap
    The Movie Database (external API)
    HTML
    CSS

## Install Instructions

### Clone the Project
Enter the following command in your terminal to clone the project to your computer.
```sh
    git clone git@github.com:mister-michael/hipStar.git
```
### The Movie Database API

To use the site you will need access to [The Movie Database API](https://www.themoviedb.org/documentation/api). Sign up for an account and request a API key in your Profile and Settings by clicking on the Avatar on the top right of the screen.

When you recieve your key you will need to add it to the project. Create a file called "apiKey.js" in the "src" folder. 

```sh
    cd hipstar/src
    touch apiKey.js
    cd ..
```

Open the "apiKey.js" file and declare the value of the apiKey variable as your key as shown below. You can copy the template code below.

    const apiKey = "paste your key inside the quotation marks"
    
    export default apiKey


### NPM Install
Install the NPM dependencies from the root directory (hipstar)
```sh
    npm install
    npm install react-router-dom
    npm install reactstrap react react-dom
```

### Json Server
Move to the api directory
```sh
    cd api
    touch database.json
    ls
```

Copy the contents of the database.json.example file into your newly created database.json file.

Then run your JSON server.
```sh
    json-server -p 5002 -w database.json
```

### NPM Start

After installing dependencies, adding your TMDb key and creating your databse.json file, start the server
```sh
    npm start
```

Now that the server is running, you can visit the site
```sh
    http://localhost:3000/
```


















----------------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
