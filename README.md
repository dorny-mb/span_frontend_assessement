# span frontend assessement

This repository contains A react typescript application

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before we get started, we're going to need to make sure we have a few things installed and available on our machine.

#### Node >= 12

##### MacOS

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

##### Other

See the installation guides available @ nodejs.org:

https://nodejs.org/en/download/package-manager/

#### Yarn

```bash
npm i -g yarn
```

### Installing

Below is a series of step by step instructions that tell you how to get a development env running.

Create a local clone of the repository

```bash
git clone git@github.com:dorny-mb/span_frontend_assessement.git
```

Enter the cloned repositories' directory

```bash
cd span_frontend_assessement
```

Install the projects dependencies

```bash
yarn
```

Create a `.env` file based on the [.env.example template](.env.example)

Export the contents of the created `.env` file to the current terminal session.

```bash
set -o allexport; source .env; set +o allexport
```

Make sure the `REACT_APP_UNSPLASH_API_KEY` and `REACT_APP_UNSPLASH_API_SECRET` var is set in the `.env` file

Start the projects development server

```bash
yarn start
```

The project should now be available at http://localhost:3000

![login page](https://dorny-s-files.s3.amazonaws.com/Screenshot+2021-09-28+at+13.51.27.png)

## Authors

- **Dorny Muba** <dornymuba2016@gmail.com>

## Meta

| Version | Author                               | Date       |
| ------- | ------------------------------------ | ---------- |
| 0.0.1   | Dorny Muba <dornymuba2016@gmail.com> | 11/09/2021 |
