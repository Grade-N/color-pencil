# Contribution Guideleine 

## Contributing
1. Fork the repository.
2. Clone your forked repository.
3. Create a new branch for your changes.
4. Make your changes.
5. Commit and push your changes to your fork.
6. Create a pull request from your fork's branch to the `main` branch of this repository.
<!-- - Create your own branch
- Pull all the changes from main to your branch `git pull origin main`
- Put your changes 
- Add, Commit and Push your branch
- Create a pull request on the main branch from your branch. Don't forget to mention the issue id and changes you have made. -->

## System Requirements
- Node 12 or above

## Install 
After getting done with git cloning the project this command will initialize and install the required packages. Running `npm i` might not work.
```console
npm run init
```

## Build 
Once the changes are in place the project must be built.
```console
npm run build
```
## Test
Link the library to golbal npm.
```console
npm link
```
Open a test project and link/bring/install the library from global to the local/project directory npm.
```console
npm link lib-name
```

Unlink/remove the library from local/project directory npm, if necessary.
```console
npm unlink lib-name
```

Unlink/remove the library from global npm, if necessary.
```console
npm unlink -g lib-name
```

## Code of Conduct
Please adhere to the [Code of Conduct](CODE_OF_CONDUCT.md) when contributing.
