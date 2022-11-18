# AttendanceManagement

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0.

## Dependencies
Run `npm install` after first time cloning the base code, to download the dependencies into node_modules.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Debug
- Create launch.json file containing
```
{
  "version": "0.2.0",
  "configurations": [
  {
    "name": "Launch Chrome",
    "request": "launch",
    "type": "chrome",
    "url": "http://localhost:4200",
    "webRoot": "${workspaceFolder}"
  }
  ]
}
```
- Define break points.
- Run `ng serve --host=127.0.0.1`
- Execute 'Run and Debug' in Visual Studio Code.

## Attendance Management API
Clone and run the Attendance Management Rest APIs to enable integration with the services for the data.
https://github.com/edchancdn/attendance-system

## Roadmap
- Implement authentication token when calling the APIs.
- Implement styling.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
