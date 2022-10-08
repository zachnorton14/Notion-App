# iArchive 

## Description

iArchive is a free note taking app you can use to store, share, and save all of your notes.

## Features

* Create folders that can be published at any time to make them globally accessible on the internet.
* Build folders with many notes that can be used to store any information you wnat.
* Create an account and display a bio and profile picture.
* Navigation bar to guide you throughout the website
* Browse our public folders section to see what other user's are creating.
* You can get, create, delete, and edit any folders or notes you have created.

## APP

| Path     | Component    | Purpose    |
|----------|--------------|------------|
| /    | `Home.jsx`    | Home Page  |
| /Login    | `Login.jsx`    | Login Page  |
| /Signup | `Signup.jsx` | Signup page|
| /Profile/:userId | `Profile.jsx`    | Profile Page  |
| /Dashboard | `Dashboard.jsx` | Dashboard |
| /Dashboard/folder/:folderId | `FolderView.jsx` | Folder page|
| /Dashboard/folder/:folderId/note/:noteId    | `NoteView.jsx`    | Note Page  |

## Credit

This app was a two week project made by me, zachnorton14, with a split architecture between front-end and back-end.

### We plan to implement these features in the future.

* Comment on others posts and let them know how you feel about their folders/notes.

* View all posts by one user on their profile.

* Implement a search bar to find the folder you're looking for.

# iArchive-API

iArchive-API is an API where users can access and view, create, update, and delete folders, mnotes, and accounts on the iArchive database.

### **Setup**
***

First, you'll need to install the correct dependencies, use `pip install` and then install the dependencies in the `requirements.txt` file.

Use the command `flask run` to run the back-end server

### **Data Models**
***
Models for MongoDB collections

**Comments**

| folder | note | user |
| -- | --------- | ------ |
| name | name | username |
| creator | creator | password_hash |
| tags | description | email |
| is_published | content | bio |
| date_created | date_created | profile_picture |
|  | folder_id |  |


### **Routes** ([http://localhost:5000](http://localhost:5000))
***

| Method | Path | Purpose  |
| ------ | ---- | -------- |
| GET | /@me | Retrieves the current user | 
| POST | /users | Creates new user |
| POST | /users/:userId | Logs out user |
| GET | /users/:userId | Details about a specified user |
| PUT | /users/:userId | Update a user |
| DELETE | /users/:userId | Delete a user |
| POST | /authentication | Authenticates log-in form |
| GET | /folder | All current user's folders |
| POST | /folder | Creates a folder |
| GET | /folder/public | All public folders | 
| POST | /folder/:folderId | Publish specified folder |
| PUT | /folder/:folderId | Update specified folder |
| DELETE | /folder/:folderId | Delete specified folder |
| GET | /folder/:folderId/note | Gets all notes in specified folder |
| POST | /folder/:folderId/note | Creates new note in specified folder |
| PUT | /note/:noteId | Edit specified note |
| DELETE | /note/:noteId | Delete specified note |
| PUT | /note/:noteId/content | Edit specified notes content |

## License
***

MIT License

Copyright (c) 2022 Spootfiy

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.