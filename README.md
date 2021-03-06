# TreeTop Engineering Problem

This repo contains a Node.js program that performs the TreeTop Engineering Problem.

* First, it reads the contents of
https://s3-us-west-2.amazonaws.com/sample-coding-dataset/organization_sample_data.csv

* Next, it starts up an Express server that accepts a single request: /organizations.

## Running the server

To run the server, execute these commands in a terminal:

    npm install
    npm start

The server will output:

    Server running at: http://localhost:3000

Then, in a browser, use this URL:

[http://localhost:3000/organizations?category=Greek&city=Washington](http://localhost:3000/organizations?category=Greek&city=Washington)

The server returns

    {"organizations":[{"id":"102","name":"Sigma Kappa Zeta Chapter","city":"Washington","state":"DC","postal":"20052","category":"Greek"}]}

The server is tolerant with the queries, using case-insensitive matching for the search terms, and searching for the term within the fields.  For example, you can search for "category=profit" to see all the "Non-Profit" and "For-Profit" organizations.

You can also use either "direction=DSC" or "direction=dsc" for descending sort orders.