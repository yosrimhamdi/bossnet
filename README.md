# Bossnet web application

## Prerequisites

- Nodejs

```
$ node --version
v16.13.0
```

- Node package manager

```
$ npm --version
8.1.0
```

- MongoDB

```
> db.version()
5.0.3
```

- Redis

```
$ redis-server --version
Redis server v=6.0.16 sha=00000000:0 malloc=jemalloc-5.2.1 bits=64 build=a3fdef44459b3ad6
```

## Install dependencies

- Front

```
$ cd client
$ npm i
```

- Back

```
$ cd server
$ npm i
```

## Running

- Front

```
$ npm run dev
```

- Back

```
$ npm start
```

## Built with

### Front

- [Nuxtjs](https://nuxtjs.org/) - A framework that helps you build server-rendered Vue.js applications easily.
- [Tailwindcss](https://tailwindcss.com/) - A utility-first CSS framework.

### Back

- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.

- [Mongoose](https://mongoosejs.com/) - Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.

- [AdminBro](https://adminbro.com/) - An Auto-generated Admin Panel for Node.js Application.
