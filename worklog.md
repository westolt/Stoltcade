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
|       | 1        | Add `app.use('/games', express.static(path.join(__dirname, 'games')))` to serve game files                                    |
|       | 1        | Edit Play page on frontend to display the game                                                                                |
| 13.11 | 1        | Improve frontend development environment (add proxy rule). Investigate issue with games not loading after refresh             |
|       | 3        | Study css (Flexbox) from youtube. Refactor css files. Fix layout when using application on mobile                             |
| 17.11 | 3        | Study how to change text when hovering over a button. Credit to Bitfumes for the tutorial: https://www.youtube.com/watch?v=GSHBhIqylxM. (not copied, but helpful). Implement hover-based game description in TextBox |
| 19.11 | 1        | Make header a link to Home page, add how_to_play column to games table and TextBox to Play page                               |
|       | 4        | Fix the issue where play page does not find the game after refreshing                                                         |
| 20.11 | 2        | Write backend tests for games API and set up initial test data with beforeEach                                                |
| total | 39       |                                                                                                                               |