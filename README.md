# Bus Stop Lister

## Description

This small node/react application lists bus stops for a given route and direction. It is based on the MetroTransit APIs.

Information about the api is available on the [metrotransit.org web services](https://svc.metrotransit.org/NexTrip) website.

Most of the logic is done in the front-end react code and the node express server is only used as a pass-through for the MetroTransit calls to get around cross-site errors in the browser.

---

### Releases:

All releases are available in GitHub. [Releases for this project](https://github.umn.edu/oit-canvas/[[repo]]/releases)

You can determine the version of this application by inspecting the `package.json` file or by going to the following endpoint when the server is running: ``http://localhost:8080/version`

---

## Prerequisites and Dependencies

### Node

The main dependency is that node is installed on the development system. You can check if node is installed by running `node -v` on a command line. If node is not available, it is available from the [node.js website](https://nodejs.org/en/).

The versions of node that this application has been tested on should be documented in the "engines" key on the `package.json` file.

---

## Installing

After cloning this repo, install npm modules and related dependencies by typing the following in a command line while in the root directory of the project:

```
npm install
```

Build the UI by typing the following in a command line:

```
npm run build
```

---

## Running the Tests

Ensure the application is installed, and `npm install` along with `npm run build` is run (see above).

The tests are fully fixturized and will not hit the MetroTransit apis. To start the tests run the following in the command line while at the root folder of the project:

```
npm run test
```

### Code coverage

After running the tests, Jest creates a "coverage" folder in the project's root directory.

---

## Linting and Formatting

This application already has esLint and esLint configuration files (.eslintrc.json) already referenced in package.json file and should be installed when `npm install` is run.

If you want to run esLint manually on the entire project, type the following in a command line:

```
npm run eslint
```

You can also run eslint in "watch" mode where eslint will be run every time a file is saved:

```
npm run eslintDev
```

This application is configured to use Prettier to automatically format the code. You can get a list of files that have formatting issue by running the `npm run prettier:check` command. Prettier can fix all formatting issues by running `npm run prettier:write`.

---

## Starting the Application in Development mode

You can use the following npm command to start the application in development mode:

```
npm run dev
```

The application will be available at: `http://localhost:8080/`

**Note:** During initial development, the MetroTransit API endpoints were unreliable. You can run the server to use fixtures in the `__fixtures__` directory instead of hitting the MetroTransit API by using this command: `npm run dev:mock`

---

## Commits

The following should be done before committing/merging to the main feature branch (commonly just called `development`) or master:

- Tests have been written for new code and/or changes.
- All tests (including new tests) pass. `npm run test`
- Linting hs been done (see "Linting" section above). `npm run eslint`
- There aren't any medium, high, or critical security vulnerabilities. `npm audit`.
- Readme has been updated if needed.

The commit message should follow the [Seven rules of a great Git commit message](https://chris.beams.io/posts/git-commit/#seven-rules).

**Note:** More commits with smaller changes is preferred to commits that have larger changes. This make code reviews much easier.

---

## Known Issues / Future Work

Known issues and future work are documented in GitHub's issues area.
