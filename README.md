<a name="readme-top">aaa</a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Licėjaus Šimtadienio Svetainė</h3>

  <p align="center">
    <br />
    <a href="https://lic100.lt">View Demo</a>
    ·
    <a href="https://github.com/81GB3N/simtadienis/issues">Report Bug</a>
    ·
    <a href="https://github.com/81GB3N/simtadienis/issues">Request Feature</a>
  </p>
</div>

### Built With

- [![React][React.js]][React-url]
- [![Express][Express.js]][Express-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

The dependencies of this project are managed with npm

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:81GB3N/simtadienis.git && cd /simtadienis
   ```
2. Install all the project dependencies 
   ```sh
   npm i && npm run install-packages
   ```
3. Setup your `/backend/.env` file
   ```sh
   cd /backend && touch .env
   ``` 
   ```sh
   # /simtadienis/backend/.env
   NODE_ENV=development
   PORT=4000
   URI="mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER_URL/"
   JWT_SECRET_KEY="YOUR_JWT_SECRET_KEY"
   ```
4. Create an `auth.json` file for Google Drive authentication
   Documentation found in <a href="https://developers.google.com/drive/api/quickstart/nodejs">Google Drive documentation for nodejs<a>
   ```sh
   touch auth.json
   ```  
   ```json
   {
    "type": "service_account",
    "project_id": "YOUR_PROJECT_ID",
    "private_key_id": "YOUR_PRIVATE_KEY_ID",
    "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n",
    "client_email": "YOUR_CLIENT_EMAIL",
    "client_id": "YOUR_CLIENT_ID",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/YOUR_CLIENT_EMAIL",
    "universe_domain": "googleapis.com"
    }
   ```
5. Run the app
   ```sh
   cd .. && npm start
   ```

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->

## Contact

<table al>
    <tr>
      <th>
        <img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white">
      </th>
      <th>
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
      </th>
    </tr>
    <tr>
     <td>
        <a href="https://www.facebook.com/profile.php?id=100015847005996" target="_blank">Adam Samulionis</a>
        <br>
        <a href="https://www.facebook.com/jonas.balukonis" target="_blank">Jonas Balukonis</a>
     </td>
     <td>
                 <a href="https://www.linkedin.com/in/adam-samulionis-90683a2b8/" target="_blank">Adam Samulionis</a>
            <br>
            <a href="https://www.linkedin.com/in/jonas-balukonis-0045832ab/" target="_blank">Jonas Balukonis</a></td>
    </tr>

</table>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com/
[Facebook]: https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white
[LinkedIn]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
