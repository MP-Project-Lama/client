# client


# Masterpiece-Project

## User Story: 
- *signe up* : As an anon you can sign up in the platform so that you can navigate through the app . 
- *Verification* : as a new user ,you will resave an Email with verification Code/Link  , after enter the code/ press the link , you will active your account 

- *Login* : as long as you have an actived account you can login by enter your email/username , and your password . 

- *Login With Google* : user can login by his Gmail account
- *User Profile* : user can edit his information in profile page , like reset his avatar , reset his password , edit first / last name ...etc 

###### Blog Page
- *Add Comments* : in blog page , user can comment on posts .
- *Edit Comments* : also, user can edit his own comments . 
- *Delete Comments* :  user can remove his own comments as well . 
- *Add Likes* : in blog page , user can favorite posts .
- *Unlike* :  user can remove his likes .


###### Designers page 

- *Chatting With Designers* : user can contact with designers in a direct message . 



# UML Diagram 

![uml](./diagrams/uml.png)



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
