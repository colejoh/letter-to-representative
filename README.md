# letter-to-representative
A website that uses the Lob API to send a letter to your representative.

## Requirements
  1. Node.js
  2. NPM

## Installation
  1. `npm install`
  2. Put your API keys in config.js

## Running
  1. `node server.js`
  2. Visit `localhost:8080`

## How it works
### The APIs
This app uses two APIs. The first one that is called is the Google Civic Information API. This call serves
two purposes. First is to get the representative for the user's address. The second purpose is to format
the user's address to the proper format. This call is sent back to the front end so the user can confirm
all of their information.

The second API that is used is the Lob API. The Lob API is used to make a physical letter and mail it to the
address that was found in the Google API call.

### The Tech
This app is made in Node.js for the back end and AngularJS for the front end.
