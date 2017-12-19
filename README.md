This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

About:

LFG (Looking for Group) is a lightweight event planner for gamers looking to form groups. By using the search function, they can search for players that play a specific game, assuming that user is actively looking for a group.

Installation:

1) Set up the backend (repo https://github.com/Jisho23/lfg_api). The app assumes using http://localhost:3001 as the default port, so make sure to start the server (bundle install, rake db:create db:migrate db:seed, rails s -p 3001) on that port.  
2) Run npm install, npm start.

Use:
1) There are four default users, their params can be found in the seed files for the API. Otherwise, simply create a new user following the link on the login page.
2) On redirecting to the myprofile page, a user can change their status, browse their feed, or toggle if they are LFG. 
3) A user can add games to their collection by going to the browse games tab in the nav bar.
4) Users can create new groups on the create group page and look for players playing any game. This sends and invite to those users who will only be able to have access to the chat and group view upon accepting an invite.
5) Users can view groups by following a clickable link on their myprofile page.
6) From the group view, the owner can kick players or disban. Other players can leave the group. All members of a group can use the chat feature. 
