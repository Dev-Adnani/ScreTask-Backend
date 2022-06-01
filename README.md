# Backend-SaltPe

#### -> [BASE_URL](https://swaad-anusaar.herokuapp.com)

## Run Locally

Clone the project

```bash
  git clone https://github.com/Dev-Misc/Backend-SaltPe
```

Go to the project directory

```bash
  cd Backend-SaltPe
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_SECRET`

`PORT`

`MONGO_DB`

## API Reference

`API KEY : test`

# Authentication

#### Signup

```http
  POST BASE_URL/signup
```

| Parameter           | Type     | Description                             |
| :--------           | :------- | :--------------------------------       |
| `useremail`         | `string` | **Required**. User's Email              |
| `userpassword`      | `string` | **Required**. User's Password           |

#### Login

```http
  POST BASE_URL/login
```

| Parameter           | Type     | Description                             |
| :--------           | :------- | :--------------------------------       |
| `useremail`         | `string` | **Required**. User's Email              |
| `userpassword`      | `string` | **Required**. User's Password           |
