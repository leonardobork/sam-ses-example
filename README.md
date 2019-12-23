# AWS Simple Email System + Serverless Application Model Example

## Setup

Feed your envs in `./template.yaml` with the following:

- SMTP_HOST - your smtp host
- SMTP_PORT - the port
- SMTP_USER - the user
- SMTP_PASS - the password


To use the SAM CLI, you need the following tools.

* SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* Node.js - [Install Node.js 10](https://nodejs.org/en/), including the NPM package management tool.
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)

## Running

Run the function:
- `sam local invoke SendEmailFunction --event events/event.json -d 5858`

Run as API:
- `sam local start-api -d 5858`

Debug should be available on port `5858`

## Unit tests

Go to `/ses-example/tests/unit`

Run with `yarn run tests`
