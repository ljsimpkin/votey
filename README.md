# votey
## A party game voting app

Built to help groups make decisions, this project taught me a lot about about web sockets with socket.io, how to break down projects with spikes, data structures, one directional data flow which enables testing, designing using figma, and how to deploy with heroku for the back end and github for the front end.

[**TRY ME!**](https://ljsimpkin.github.io/votey/)


# Tech stack

- React
- Vite
- Socket.io
- Express
- Node.js
- Jest
- Heroku
- HTML
- CSS
- Javascript

# figma designs
![figma 1](./client/public/figma%201.png)
![figma 2](./client/public/figma%202.png)
![figma 3](./client/public/figma%203.png)

# deploy
`./deploy`
`git push heroku main:main`

# features

- [x] Deploy!! Github pages and Heroku perhaps?
- [x] Combine drafting and voting onto one page
- [ ] Add url to room
- [x] Add QR code to lobby
- [ ] Add enter key submission for form
- [ ] Move back and forward independently
- [ ] Order ideas by votes
- [x] Fix iphone blue fonts
- [ ] Remove undefined idea entry
- [ ] Position text to the left and keep votes on the right

- [x] Identify when your vote is cast
- [o] Display people's names in the lobby
- [ ] Have admin privelages
- [o] Only view next arrow if admin
- [o] Ready up to move to the next round

# Bugs

- [ ] When creator clicks on their own idea to remove vote, it removes all the votes
- [ ] 2 people clicking next at the same time move twice. Will be solved with ready up or a one page app.
- [ ] Double votes when people refresh and rejoin room. Readying up and not allowing new joins after would solve this.

# Credits

Phoenix! For his awesome consultations that helped me plan the project with spikes and data structures. 

Started with the help of this tutorial
https://www.youtube.com/watch\?v\=djMy4QsPWiI\&ab_c…