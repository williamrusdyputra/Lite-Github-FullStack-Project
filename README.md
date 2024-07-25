# Lite Github Test Project

## Tasks

Here are the requirements for the take-home project

### Basic tasks

Implement and deploy (to the platform provider of your choice) an application that

- [x] Show profile of a github user / organization with:
  - [x] Profile picture
  - [x] Full name
  - [x] Email if it's available
  - [x] Numbers of followers and following
- [x] Show the first 6 (or less if there're less repositories from such user) repositories of such user
- [x] The default home page will redirect to `/octocat`
- [x] Users can login using their github account using Oauth

The frontend design for this app can be found in [this Figma file](https://www.figma.com/file/fLiLQfjSF6X7pEfHli2Lwh/Fullstack-Engineer-Test-Case?type=design&node-id=0%3A1&mode=design&t=RfULQB2MF956TxTT-1)

**Notes**:

- Go usage is optional, you can create your own backend implementation in the backend folder.
- Frontend must be using React and the existing setup that we have in the [frontend](./frontend/) folder.
- Tailwind usage is optional, please feel free to use any CSS libraries / frameworks.

### Stretch (optional) tasks

These tasks are optional but we would encourage you to give them a try to demonstrate more of your skills

- [x] Setup Github Actions workflow file for lint check on PRs to `master`
- [x] Setup Github Actions workflow file to deploy on pushes to `master`
- [x] Deploy the website and submit the URL to us
