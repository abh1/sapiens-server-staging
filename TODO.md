1. Create a article model
2. Add create, edit and delete for articles
3. Add authentication layer
4. When the user logins, check if the public key is already there
5. If yes, give auth token
6. If not, create user and give auth token
7. During crud operation of articles, check if the account has tokens
8. Also check if the article belongs to the user
9. There is a status field - EDITING, VOTING, PUBLISHED
10. If it is vote status, anybody with the governance token can access it
11. Voting has to be done in the DAO agains the article id
12. The status can be changed to PUBLISHED