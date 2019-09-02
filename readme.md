# MOVIE APP

The main purpose of this repository is to show a simple Node.js express REST API application written with TypeScript. Backend utilizes MongoDB as noSQL data storage for movie collection, users and comments data.

Features:

- user authentication via JSON Web Tokens,
- submiting movies by title and fetching additional data from an external API,
- posting comments,
- getting paginated movies and comments.

## Pre-reqs

* Clone the repository

`git clone https://github.com/robertpiosik/netguru-movies.git`

* Install dependencies

`cd netguru-movies && npm i`

* Configure environment variables

```
_.env_

NODE_ENV="development"
PORT="8000"
DATABASE_CONNECTION="mongodb server connection string"
JWT_PRIVATE_KEY="randomstring"
OMDB_API_KEY=""
```

* Run tests

`npm run test`

* Build and run

`npm run build && npm start`

## REST API Reference

**POST** `/api/v1/auth/signup`

> Example request body:

```json
{
	"email": "piosik@netguru.com",
	"password": "q{UHh^)9@<qBJJ3!"
}
```

> Example success response:

```json
{
	"name": "Success",
	"message": "User registered successfully.",
	"data": {
		"id": "5d6aa7eb769f07c74135f9ed"
	}
}
```

**POST** `/api/v1/auth/login`

> Example request body:

```json
{
	"email": "piosik@netguru.com",
	"password": "q{UHh^)9@<qBJJ3!"
}
```

> Example success response:

```json
{
	"name": "Success",
	"message": "User authenticated successfully.",
	"data": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjliOGU5NWE1YmY1NzgyYmJkNjFkYiIsImlhdCI6MTU2NzI3MDk1OCwiZXhwIjoxNTY3NDQzNzU4fQ.EtkVcg1uFgH0lqj4Ng5QTsQ6K0ALVAIWkclitSR9X0c",
		"expiresAt": 1567443758
	}
}
```

**POST** `/api/v1/movies`

_Authenticate yourself with Bearer Token._

> Example request body:

```json
{
	"title": "Interstellar"
}
```

> Example success response:

```json
{
  "name": "Success",
  "message": "Movie has been added successfully.",
  "data": {
    "comments": [],
    "_id": "5d6b8de7e9087b29d7c088a4",
    "title": "Interstellar",
    "creator": "5d69b8e95a5bf5782bbd61db",
    "fetchedMovieData": {
      "Title": "Interstellar",
      "Year": "2014",
      "Rated": "PG-13",
      "Released": "07 Nov 2014",
      "Runtime": "169 min",
      "Genre": "Adventure, Drama, Sci-Fi",
      "Director": "Christopher Nolan",
      "Writer": "Jonathan Nolan, Christopher Nolan",
      "Actors": "Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow",
      "Plot": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      "Language": "English",
      "Country": "USA, UK, Canada",
      "Awards": "Won 1 Oscar. Another 43 wins & 143 nominations.",
      "Poster": "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
      "Ratings": [
        {
          "Source": "Internet Movie Database",
          "Value": "8.6/10"
        },
        {
          "Source": "Rotten Tomatoes",
          "Value": "72%"
        },
        {
          "Source": "Metacritic",
          "Value": "74/100"
        }
      ],
      "Metascore": "74",
      "imdbRating": "8.6",
      "imdbVotes": "1,323,520",
      "imdbID": "tt0816692",
      "Type": "movie",
      "DVD": "31 Mar 2015",
      "BoxOffice": "$158,737,441",
      "Production": "Paramount Pictures",
      "Website": "http://www.InterstellarMovie.com/",
      "Response": "True"
    },
    "createdAt": "2019-09-01T09:22:47.082Z",
    "updatedAt": "2019-09-01T09:22:47.082Z",
    "__v": 0
  }
}
```

**GET** `/api/v1/movies`

| Parameter | Type    | Description                                                             |
| --------- | ------- | ----------------------------------------------------------------------- |
| page      | integer | Current page of the collection. Default is `1`.                         |
| per_page  | integer | Maximum number of items to be returned in a result set. Default is `2`. |

> Example success response:

```json
{
  "name": "Success",
  "data": {
    "total": 7,
    "movies": [
      {
        "comments": [
          {
            "_id": "5d6d1705aa33b22dce57f872",
            "creator": {
              "_id": "5d69b8e95a5bf5782bbd61db",
              "email": "piosik@netguru.com"
            },
            "content": "Lorem ipsum.",
            "createdAt": "2019-09-02T13:20:05.387Z",
            "updatedAt": "2019-09-02T13:20:05.387Z"
          },
          {
            "_id": "5d6d1733aa33b22dce57f873",
            "creator": {
              "_id": "5d69b8e95a5bf5782bbd61db",
              "email": "piosik@netguru.com"
            },
            "content": "Lorem ipsum.",
            "createdAt": "2019-09-02T13:20:51.815Z",
            "updatedAt": "2019-09-02T13:20:51.815Z"
          }
        ],
        "_id": "5d6cdaa67d47610e1144ba3f",
        "title": "Green Book",
        "creator": "5d69b8e95a5bf5782bbd61db",
        "fetchedMovieData": {
          "Title": "Green Book",
          "Year": "2018"
        },
        "createdAt": "2019-09-02T09:02:30.937Z",
        "updatedAt": "2019-09-02T09:02:30.937Z",
        "__v": 0
      }
    ]
  }
}
```

**POST** `/api/v1/comments`

_Authenticate yourself with Bearer Token._

> Example request body:

```json
{
	"movieId": "5d6b8de7e9087b29d7c088a4",
	"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}
```

> Example success response:

```json
{
	"name": "Success",
	"data": {
		"_id": "5d6d1e9755fb1c3315d854bf",
		"creator": "5d69b8e95a5bf5782bbd61db",
		"movieId": "5d6b8de7e9087b29d7c088a4",
		"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		"createdAt": "2019-09-02T13:52:23.259Z",
		"updatedAt": "2019-09-02T13:52:23.259Z",
		"__v": 0
	}
}
```

**GET** `/api/v1/comments`

| Parameter | Type    | Description                                                             |
| --------- | ------- | ----------------------------------------------------------------------- |
| page      | integer | Current page of the collection. Default is `1`.                         |
| per_page  | integer | Maximum number of items to be returned in a result set. Default is `2`. |

> Example success response:

```json
{
  "name":"Success",
  "data":{
    "total":5,
    "comments":[
      {
        "_id":"5d6d52901bc191151d594f54",
        "creator":{
          "_id":"5d6d51545ac1be0017f0dff4",
          "email":"piosik@netguru.com"
        },
        "movieId":{
          "_id":"5d6d5166990262147c615ea6",
          "title":"Interstellar"
        },
        "content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec pellentesque lorem, sed varius tellus. Phasellus pretium tortor vel porta sodales. Proin a ornare nisi, non lobortis urna. Aliquam vulputate quam ac congue pulvinar. Praesent aliquet egestas felis id vulputate. Pellentesque consectetur lorem nisl. Vivamus gravida fringilla interdum.",
        "createdAt":"2019-09-02T17:34:08.560Z",
        "updatedAt":"2019-09-02T17:34:08.560Z",
        "__v":0
      },
      {
        "_id":"5d6d529b1bc191151d594f55",
        "creator":{
          "_id":"5d6d51545ac1be0017f0dff4",
          "email":"piosik@netguru.com"
        },
        "movieId":{
          "_id":"5d6d5166990262147c615ea6",
          "title":"Interstellar"
        },
        "content":"Proin a ornare nisi, non lobortis urna. Aliquam vulputate quam ac congue pulvinar. Praesent aliquet egestas felis id vulputate. Pellentesque consectetur lorem nisl. Vivamus gravida fringilla interdum.",
        "createdAt":"2019-09-02T17:34:19.399Z",
        "updatedAt":"2019-09-02T17:34:19.399Z",
        "__v":0
      }
    ]
  }
}
```
