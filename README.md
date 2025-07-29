## Today I learned app

Small and simple project for keeping track of the things i learned today and a todo list. You learn every day, but my problem is, i also forget a lot.

I use docker for development (postgresql) and not production, so it can be a bit tricky.
Goal is:

- [x] Add new TIL
- [x] Update TIL
- [ ] User login and roles
- [ ] Search for TILL based on category and title
- [ ] Category view 
- [ ] Export TIL to markdown file
- [ ] Pagination
- [ ] Todo keep track of what needs to be done
- [ ] KISS
- [ ] DRY
- [ ] Clean Architecture
- [ ] Fun

For the backend i use **go**. Frontend is build in **Sveltekit**.

For database migration i use **go-migrate**, so you will need to download this. Fo easy compiling and migrating i use **make** and **Makefile**.

Maybe i will make a flutter app that can consume the api. Will see.

## Install

Install [nodejs](https://nodejs.org/en/download) by following the instructions on that website. 

> chmod +x build-frontend.sh

Before building, first get `public.pem` from the backend and copy it to config/jwt/public.pem. Now you can run 

> ./build-frontend.sh
