# Projct GenomaWork @MejorConTocino
This project was made using Python and Js, splited into two directories, one for the UI and client side (Frontend) and the other for de API (Backend). Also, a sqlite db is in this repo.
**NOTE: python3.9**

## Online Resources

 - https://reactjs.org/
 - https://www.django-rest-framework.org/
 - https://styled-components.com/
 - https://www.smashingmagazine.com/2020/03/sortable-tables-react/
 
 ## Libraries and Frameworks implemented
 
### Frontend
 - React.js
 - Styled-components
 - Webpack
 - Babel
 
 ### Backend
 - Django
 - Django REST framework

## Installation and dev server
### Frontend 

 1. Move into "frontend" directory
 2. install dependencies with "npm install"
 3. run "npm run dev" to bundle the project
 4. run "npm run start" to start the dev server
 5. run "npm run build" for build a production bundle

 
 ### Backend
 - Move into "backend" directory
 - Create using env with virtualenv or using python3 venv -m env. Then start env
 - Install dependencies with "pip3 install -r requirements.txt"
 - run "python3 manage.py makemigrations" and "python3 manage.py migrate" (Optional)
 - run "python3 manage.py runserver" for start django server
 - run "python3 manage.py test" for run api test (Optional) 
 ### Api Endpoints
 - localhost:8000/api/restaurant/ ----> Return all the restaurants
 - localhost:8000/api/restaurant/:id/ ----> Return the element with that id. This endpoint let you **get, put, patch and delete** that element
 
 - localhost:8000/api/restaurant/?state=value ----> Also, the API accept query parameters to filter the result data. Can add all the model's attribute in query parameters 

 
 ## Instructions
 ### Backend
 
 - The "Restaurant" model have **name, state, country, type food, rating, and visited** attributes
 - Basic CRUD for **create, read, update and delete**
 - The API can filter the table (from the client) with **state, country, type food and rating**
 - The database is the **db.sqlite3**
 
### Frontend
 - Made request to django API and show the table and it information 
 - Frontend side have filters in **name**
 - The table can be ordered using their columns
 - Forms for **update, create and delete**
 
