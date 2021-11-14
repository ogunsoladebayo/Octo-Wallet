<h3 align="center">octo-wallet</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/ogunsoladebayo/octo-wallet.svg)](https://github.com/ogunsoladebayo/octo-wallet/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/ogunsoladebayo/octo-wallet.svg)](https://github.com/ogunsoladebayo/octo-wallet/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> A mock cryptocurrency network system of with user management, Bitcoin and Ethereum wallet management and transaction management.
    <br> 
</p>

## 📝 Table of Contents

-   [About](#about)
-   [Getting Started](#getting_started)
-   [Deployment](#deployment)
-   [Usage](#usage)
-   [Built Using](#built_using)
-   [TODO](../TODO.md)
-   [Contributing](../CONTRIBUTING.md)
-   [Authors](#authors)
-   [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

A mock cryptocurrency network system of with user management, Bitcoin and Ethereum wallet management and transaction management.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them.

```
MySQL database server
SMTP mail server
```

### Installing

A step by step series of examples that tell you how to get a development env running.

Clone this repository

```
git clone https://github.com/ogunsoladebayo/octo-wallet.git
```

Create a file with the name '.env' and copy the contents of envcopy.env from the root directory to the new file to set up your environment variables.

```
cp envcopy.env .env
```

Fill up the fill up the file with environment variables for your environment.

Install dependencies by running the following command:

```
npm install
```

You can run the project in development environment by running the following command:

```
npm run dev
```

or in live environment

```
npm start
```

You should see the transaction processor running with the log output in the terminal.

## 🎈 Usage <a name="usage"></a>

You can find the API documentation for the application at [https://documenter.getpostman.com/view/11616904/UVC8DS9v](https://documenter.getpostman.com/view/11616904/UVC8DS9v).

## 🚀 Deployment <a name = "deployment"></a>

This application can be readily deployed to a live system with docker.

## ⛏️ Built Using <a name = "built_using"></a>

-   [MySQL](https://www.mysql.com/) - Database
-   [Express](https://expressjs.com/) - Server Framework
-   [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

-   [@ogunsoladebayo](https://github.com/ogunsoladebayo) - Sole author

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

-   Hat tip to anyone whose code was used
-   Inspiration
-   References
