# Game Library Application

This is a single-page React application for managing a personal game library. Users can add new games, view a list of existing games, update the details of a game, and delete games from their collection.

## Technologies Used

* **React:** A JavaScript library for building user interfaces.
* **GraphQL:** A query language for your API.
* **Apollo Client:** A comprehensive state management library for JavaScript that enables you to manage local and remote data with GraphQL.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.

## Features

* **Add Game:** Allows users to input the title and platform(s) of a new game and add it to their library.
* **List Games:** Displays a comprehensive list of all the games currently in the library, showing their titles and associated platforms.
* **Update Game:** Enables users to modify the title and platform(s) of an existing game.
* **Delete Game:** Provides the functionality to remove games from the library.
* **Loading States:** Visual indicators are present during data fetching and mutation operations to provide feedback to the user.
* **Error Handling:** Displays informative error messages if any issues occur during API interactions.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install  # or yarn install
    ```

3.  **Configure Apollo Client:**
    * Ensure you have a running GraphQL server.
    * In your React application, locate the file where you initialize your Apollo Client (e.g., `src/apolloClient.js` or similar).
    * Update the `uri` property in the `ApolloClient` constructor to point to your GraphQL API endpoint:
        ```javascript
        import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

        const client = new ApolloClient({
          link: new HttpLink({ uri: 'YOUR_GRAPHQL_API_ENDPOINT' }),
          cache: new InMemoryCache(),
        });

        export default client;
        ```
        Replace `'YOUR_GRAPHQL_API_ENDPOINT'` with the actual URL of your GraphQL server.

4.  **Define GraphQL Schemas and Operations:**
    * Ensure your GraphQL server has the necessary schema defined for `Game` objects, including fields like `id`, `title`, and `platform`.
    * In your React components, you will need to define GraphQL queries and mutations for fetching, adding, updating, and deleting games. Examples:

        ```javascript
        // Example Mutation for Adding a Game
        import { gql } from '@apollo/client';

        export const ADD_GAME = gql`
          mutation AddGame($title: String!, $platform: [String!]!) {
            addGame(title: $title, platform: $platform) {
              id
              title
              platform
            }
          }
        `;

        // Example Query for Listing Games
        export const GET_GAMES = gql`
          query GetGames {
            games {
              id
              title
              platform
            }
          }
        `;

        // Example Mutation for Updating a Game
        export const UPDATE_GAME = gql`
          mutation UpdateGame($id: ID!, $title: String, $platform: [String!]) {
            updateGame(id: $id, title: $title, platform: $platform) {
              id
              title
              platform
            }
          }
        `;

        // Example Mutation for Deleting a Game
        export const DELETE_GAME = gql`
          mutation DeleteGame($id: ID!) {
            deleteGame(id: $id)
          }
        `;
        ```

5.  **Run the application:**
    ```bash
    npm run dev
    ```
    This will typically start the React development server at `http://localhost:5173/`.

## Usage

Once the application is running, you can:

* **Add a new game:** Enter the game title and select one or more platforms from the dropdown in the "Add Game" section. Click the "Add" button to save the game.
* **View the game list:** The "Listing Games" section will display all the games currently stored. Each game will show its title and the platforms it's available on.
* **Update a game:** In the "Listing Games" section, each game entry may have an "Edit" icon (✏️). Clicking this icon will likely populate the "Add Game" section with the selected game's details, allowing you to modify them and click an "Update" button.
* **Delete a game:** In the "Listing Games" section, each game entry will have a "Delete" icon (❌ or 🗑️). Clicking this icon will trigger a request to remove the game from the database.

![Screenshot of Add Game Form](assets/homepage.png)

## Folder Structure (Example)

your-app-directory/
├── public/
├── src/
│   ├── components/
│   │   ├── AddGame.js
│   │   ├── GameList.js
│   │   ├── GameItem.js
│   │   └── ...
│   ├── graphql/
│   │   ├── mutations.js
│   │   ├── queries.js
│   │   └── ...
│   ├── apolloClient.js
│   ├── App.js
│   ├── index.js
│   ├── App.css
│   └── ...
├── package.json
├── yarn.lock
├── README.md
└── .


## Contributing

Contributions to this project are welcome. Please fork the repository and submit a pull request with your changes.

## License

[Specify your project license here, e.g., MIT]

