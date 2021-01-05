# RevitRoomParser


<p align="center"><img width=12.5% src="https://github.com/simonmoreau/RevitRoomParser/blob/main/RevitRoomParserApp/src/assets/logo-blue.svg"></p>
<h1 align="center">
  Revit Room Parser
</h1>

<h4 align="center">Display Revit rooms in a web browser viewer</h4>

# Overview

Revit To IFC is a web application using the Autodesk Forge web services to extract Revit rooms to a web-based plan viewer.

![Overview](https://github.com/simonmoreau/RevitRoomParser/blob/main/RevitRoomParserApp/src/assets/viewer.png)

# Installation

*Prerequisite*:

* Please install Angular-CLI by following [these instructions](https://github.com/angular/angular-cli#installation).
* Create a new application on the [Autodesk Forge website](https://developer.autodesk.com/myapps/create). This app must include the Data Management API and the Design Automation API

```bash
git clone https://github.com/simonmoreau/RevitRoomParser.git
cd RevitRoomParser/RevitRoomParserApp

# install the project's dependencies
npm install

# start the Azure Function localy
cd RevitRoomParser/RevitRoomParserFunction
func start

# starts the application in dev mode and watches your files for livereload
npm start
```

For comprehensive documentation on Angular-CLI, please see their [github repository](https://github.com/angular/angular-cli).

This Web app use [Azure Function](https://azure.microsoft.com/en-us/services/functions/) to handle the back-end. You can find these functions in the /api folder.

## Built With

* [Angular](https://angular.io/)
* [Autodesk Forge Design Automation API](https://forge.autodesk.com/en/docs/design-automation/v3/developers_guide/overview/)
* [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/)

# Development

Want to contribute? Great, I would be happy to integrate your improvements!

To fix a bug or enhance an existing module, follow these steps:

* Fork the repo
* Create a new branch (`git checkout -b improve-feature`)
* Make the appropriate changes in the files
* Add changes to reflect the changes made
* Commit your changes (`git commit -am 'Improve feature'`)
* Push to the branch (`git push origin improve-feature`)
* Create a Pull Request

# Bug / Feature Request

If you find a bug (connection issue, error while uploading, ...), kindly open an issue [here](https://github.com/simonmoreau/RevitToIFCApp/issues/new) by including a screenshot of your problem and the expected result.

If you'd like to request a new function, feel free to do so by opening an issue [here](https://github.com/simonmoreau/RevitToIFCApp/issues/new). Please include workflows samples and their corresponding results.

# License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details

# Contact information

This software is an open-source project mostly maintained by myself, Simon Moreau. If you have any questions or request, feel free to contact me at [simon@bim42.com](mailto:simon@bim42.com) or on Twitter [@bim42](https://twitter.com/bim42?lang=en).