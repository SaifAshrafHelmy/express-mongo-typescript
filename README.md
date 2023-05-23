# Project Readme

This is a Node.js project built with Express.js framework for creating a RESTful API server.

## Prerequisites

Before running the project, ensure that you have the following installed:

-   Node.js
-   npm (Node Package Manager)


## Getting Started

To get started with the project, follow these steps:

1. Clone the repository to your local machine:

git clone https://github.com/SaifAshrafHelmy/express-mongo-typescript.git

2. Install the dependencies by running the following command in the project directory:

npm install

3. Configure the project by modifying the `config/config.js` file. Set the MongoDB connection URL and other necessary configurations according to your environment.

4. Start the server by running the following command:

npm start

The server will start running on the specified port, and you will see a message indicating the port number in the console.

## API Endpoints

The following API endpoints are available:

-   `GET /ping`: Health check endpoint to verify if the server is running.
-   `GET /authors`: Retrieve all authors.
-   `GET /authors/:id`: Retrieve a specific author by ID.
-   `POST /authors`: Create a new author.
-   `PUT /authors/:id`: Update an existing author.
-   `DELETE /authors/:id`: Delete an author.
-   `GET /books`: Retrieve all books.
-   `GET /books/:id`: Retrieve a specific book by ID.
-   `POST /books`: Create a new book.
-   `PUT /books/:id`: Update an existing book.
-   `DELETE /books/:id`: Delete a book.

## Error Handling

If a request is made to an undefined route, a 404 error will be returned with a corresponding error message.

## Logging

The project includes a logging module (`library/Logger.js`) that logs incoming requests and outgoing responses. The logs can be found in the console.

## Contributing

Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
