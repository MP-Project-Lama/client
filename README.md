# client

# UML Diagram 





# Router Routes

| Path              | Component         |   permissions     |                           Behavior                                               |               
| :---              |     :---:         |     :---:         |                             :---:                                                |
| /                 |     Home          |      Public       |    Home Page, About , Concat                                                     |
| /signup           |     Signup        |      Public       |    Signup form, navigate to the login form                                       |
| /login            |     Login         |      Public       |    Login form, navigate to the home page                                         |
| /blog             |     Blog          |      Public       |    Show all designers's posts                                                    |
| /post/:id         |     Post          |     User Only     |    show specific post and it's likes, comments                                   |
| /explre           |     Explore       |      Public       |    show the collections , designers, materials , and navigate to all of them     |
| /collection /:id  |     Collection    |     User Only     |    show a specific collection , navigate to Dierct message                       |
| /designer/:id     |     Designer      |      Public       |    show the designer's info , navigate to dierct message                         |
| /room/:id         |  DirectMessage    |     User Only     |    dierct message between client and the designer                                |
| /material/:id     |     Material      |      Public       |    show all collections that made with a material                                |
| /profile/:id      |     Profile       |     User Only     |    show user's info                                                              |
 


## Components

* Signup 
* Login 
* Home 
* Blog
   - Post
* Explore
  - Collection
    - DirectMessage
  - Designer
  - Material

* Profile



### Trello 
=> https://trello.com/b/v5XlqqjM/mp-project-lama
