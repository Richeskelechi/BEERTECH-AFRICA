Assessment:



Create 2 separate services (Customer service and service) tha should communicate seamlessly via a Microservices architecture.



Procedure:



The Customer MS should receive customer details upon sign up.



Authentication would be based on details in the Customer MS Only a valid Customer should be able to Create an Order on the Order MS by passing a JWT token via the header for validation.



Expected Columns/Fields for Order MS:



orderld,



customerld,



itemid (Could be a dummy Id)



price



dateCreated timeCreated



orderStatus (orderStatus = 'placed' by default) Status of the Order should be adjustable via endpoint.



Note:



The below endpoints would be expected:



1. Create Customer Endpoint



2. Customer Login Endpoint



3. Create Order endpoint



4. Update Order status endpoint





Use Node.js/Express.js as the backend technology.

All endpoints must be probably secured with JWT 

Use docker and docker-compose to build the application

locally 

Prepared statement must be used

Stored Procedure would be an added advantage 

Push your update to your Git repo and share the Repo as response to your assessment

Running The Project.

Clone the Repository
Run npm install
ensure you create .env file and all the following
MONGO_URI="Your Connection To DataBase Goes here"
SALT_ROUNDS=10
JWT_SECRET="JWT_SECRET"

use npm run dev to start the server or npm start