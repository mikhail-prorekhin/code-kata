# About

Hi there,<br>
I would like to present a small chalemge task 

## Run

The simpleast way to run is starting a docker container<br>
`docker-compose up`

## Authentification

This application uses local and a social network (<b>github</b>) to authenticate user<br>
To use github You need first add <br>
Settings->Developer settings-> OAuth Apps
set any `Homepage URL` and `Authorization callback URL` (it will be owerriten in our case), <br>
and take `Client ID` and `Client secrets`<br>
in a `Demyst/website/config/local.json` please add this valuses

```
{
  "auth": {
    "github": {
      "clientId": "Client ID",
      "secret": "Client secrets"
    }
  }
}
```
## Important
Would be very grateful for any feedback
