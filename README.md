# Skotos

 The word **Skótos** is a Greek word that means
                Bright. This website is purposely made to help researchers,
                students and other individuals that seek
                `Mandaluyong City` Light Pollution Data
                Statistics. And also, this website provides articles,
                researches, studies related to light pollution that can help
                their projects.

Here's the [Demo](https://skotos.herokuapp.com)

## Installation

This app is not recommended to run locally because it needs personal credentials that the users need to provide. But for the sake of it.

First, create a file `.env` file inside the root.

```bash
$ touch .env
```

And these credentials are needed.

```bash
PORT=5000
GoogleAPI=*GooglePlusSigninAPI
MongoURI=mongodb://localhost/Skotos
G_USER=*Gmail username
G_PASS=*Gmail password
JWT_SECRET=*Provide an JWT Secret
```

Lastly, install `node_module` for both the root folder and client.

```bash
$ npm install
$ npm install --prefix client
```