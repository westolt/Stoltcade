# Work Log

|  Day  | Time (h) | Task                                                                                                                          |
| :---: | :------- | :---------------------------------------------------------------------------------------------------------------------------- |
| 29.10 | 3        | Design and prepare project                                                                                                    |
| 30.10 | 5        | Make components to Home page and update appearance                                                                            |
| 4.11  | 4        | Set up backend with Express and Sequelize, Neon PostgreSQL via Fly.io. Implement GET, POST and DELETE API endpoints for games |
| 5.11  | 1        | Structure backend into separate files                                                                                         |
| 6.11  | 2        | Add React Router for Play page navigation                                                                                     |
|       | 1        | Add game service to frontend using Axios and conndect fronten and bacend with cors                                            |
|       | 2        | Deploy fullstack app to Fly.io                                                                                                |
| 10.11 | 5        | Learn how to add and run game on Stoltcade, including figuring out why it didn't display initially                            |
|       | 1        | Add `app.use('/static-games', express.static('games'))` to serve game files. So basically the same technique as serving the frontend's static files, but with a different path  |
|       | 1        | Edit Play page on frontend to display the game                                                                                |
| 13.11 | 1        | Improve frontend development environment (add proxy rule). Investigate issue with games not loading after refresh             |
|       | 3        | Study css (Flexbox) from youtube. Refactor css files. Fix layout when using application on mobile                             |
| 17.11 | 3        | Study how to change text when hovering over a button. Credit to Bitfumes for the tutorial: [link](https://www.youtube.com/watch?v=GSHBhIqylxM). (not copied, but helpful). Implement hover-based game description in TextBox |
| 19.11 | 1        | Make header a link to Home page, add how_to_play column to games table and TextBox to Play page                               |
|       | 4        | Fix the issue where play page does not find the game after refreshing                                                         |
| 20.11 | 2        | Write backend tests for games API and set up initial test data with beforeEach                                                |
| 21.11 | 1        | Add frontend test for Text Box and fix CSS issues with gamebutton and gamelist                                                |
| 24.11 | 3        | Add e2e test folder, write tests for front page, game hover description, game opening and navigating from header              |
|       | 2        | Update Github actions CI workflow to include frontend, backend, and e2e tests. Add badges to README                           |
| 30.11 | 2        | Add user model, users controller, middleware and logger                                                                       |
| 7.12  | 2        | Add user registration functionality (frontend + backend) and add migrations for users, games and scores                       |
|       | 2        | Solve why user creation gave "malformatted id" errors in backend. This took more time that I'd like to admit, but I realised the issue was caused by using camelCase in migrations instead of snake_case. Fixed by changeing passwordHash to password_hash in the migration                             |
|       | 2        | Implement login form and login logic                                                                                          |
| 10.12 | 4        | Add scores.js controller to submit and update user scores                                                                     |
|       | 3        | Save high score to the score table after finishing a game                                                                     |
|       | 2        | Add high score list to user box                                                                                               |
| 12.12 | 1        | Investigate why logging in is not possible in the production version. Solution: I had not set the SECRET variable in Fly.io   |
|       | 1        | Add profile_picture column to User model via migration                                                                        |
| 13.12 | 1        | Study how to upload profile pictures (and how to delete old image files when uploading a new one) for users on Node, Sequelize and React. Used these videos: [link1](https://www.youtube.com/watch?v=sVYrH166LXM) and [link2](https://www.youtube.com/watch?v=kcQWzRX37ag)|
|       | 2        | Add controller and PUT route for uploading profile pictures. Test with Postman to confirm uploads work                       |
|       | 2        | Investigate why new profile pictures are not showing in the application. Still have no idea, but will continue troubleshooting tomorrow |
| 14.12 | 2        | Fix the issue with displaying profile pictures by adding the missing static route proxy configuration to `vite.config.js`.    |
|       | 2        | Add ImageButton component and profile picture update functionality                                                                      |
|       | 4        | Fix token assignment on registration and correct old image deletion                                                           |
| 15.12 | 2        | Add score router for gameId in backend and add top 10 scoreboard to games    |
| total | 79       |                                                                                                                               |