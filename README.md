# letter-to-representative
A service that uses the Lob API to send a letter to your representative.

## Requirements
  1. Node & NPM

## Installation
  1. `npm install`
  2. `node server.js`

## How it works
This app uses two APIs. The first one that is called is the Google Civic Information API. This call serves
two purposes. First is to get the representative for the user's address. The second purpose is to format
the user's address to the proper format. This call is sent back to the front end so the user can confirm
all of their information.

The second API that is used is the Lob API. The Lob API is used to make a physical letter and mail it to the
address that was found in the Google API call.
