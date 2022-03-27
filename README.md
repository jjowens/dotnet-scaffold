# dotnet-scaffold
Javascript library to create Visual Studio Studio projects using Dotnet Cli commands.

This javascript library is a Work In Progress (WIP). Do not use for production! Have fun playing around with it.

## Basic command

### dotnetscaffold

The command is 'dotnetscaffold'. This will create projects based off a JSON file. It will generate DotNet Cli commands and then create projects from those commands.

There are a few JSON files in the directory examples. More may be added in future. If you plan to re-run the same JSON, please ensure you have the ["force-overwrite"] set to true. See "NorthwindOverwrite.json"

```
npm run dotnetscaffold --workflow="examples/NorthwindFull.json"

npm run dotnetscaffold --workflow="examples/NorthwindOverwrite.json"

npm run dotnetscaffold --workflow="examples/NorthwindExportOnly.json"

npm run dotnetscaffold --workflow="examples/GolfBreaks.json"

```

### How it works

When the scaffolding process begins, it will loop through project and check the "project-type" field to create new projects. The "project-type" is used to generate projects. It's based off the shortname that Dotnet Cli recognises. Dotnet will create a project off their own templates. Examples below

- console
- wpf
- classlib
- web
- mvc

See this webpage for more details https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new


### Examples JSON files

- GolfBreaksExportOnly.json - Creates a Visual Studio project with multiple projects attached to it. Although EF libraries are added, no EF database are generated.

- NorthwindExportOnly.json - Creates a Visual Studio project with multiple projects attached to it. Although EF libraries are added, no EF database are generated. It will export Dotnet Cli commands to a timestamped file.

- NorthwindFull.json - Creates a Visual Studio project with multiple projects attached to it. An EF database will be generated. Based off Northwind database. It will create 3 libraries and a website. Those libraries are added as references to the website. One of the library is a database engine. An Entity Framework database will set up, creating new classed based off the table. Use Northwind database script to install database on your local machine. For this example, the username and password I've used was NorthwindUser and password100.

- NorthwindFull.json - Creates a Visual Studio project with some projects attached to it. An EF database will be generated. Some of the projects have a "ignore" flag. You can retain your settings in the JSON file while setting them as ignore. Useful if you re-run parts of the process.

- NorthwindOverwrite.json - Creates a Visual Studio project with multiple projects attached to it. This file is set up with "force-overwrite" flag. DotNet Cli will overwrite files in the subdirectory. An EF database will be generated. Based off Northwind database. It will create 3 libraries and a website. Those libraries are added as references to the website. One of the library is a database engine. An Entity Framework database will set up, creating new classed based off the table. Use Northwind database script to install database on your local machine. For this example, the username and password I've used was NorthwindUser and password100.

- ShopEmptyWebsite.json - Creates a Visual Studio project with an empty website.

- ShopMVCWebsite.json - Creates a Visual Studio project with an MVC website. Dotnet Cli will generate a website with thier own templates

- SimpleTailwinds.json - Creates a Visual Studio project with an MVC website. It will use npm to add Tailwinds to the project folder.



## Workflow of Scaffolding

It will act on the following instructions from the JSON file in the following order

- Create Solution File
- Create Projects
- For each project, add any nuget packages if requested. It will then add the project to the Solution
- Check if project requires Entity Framework. If any EntityFramework database connection strings are found, it will scaffold new EF files.
- Once all projects are generated, it will scan all projects again if any references are required to be added to other projects. For example, using Separation of Concerns concept, you might want to add Models projects to a Service project.

### Example Files

There are a few examples files you can create. One creates a simple website with tailwinds added as a package, the other will create a website with multiple projects added as references to the solution. More examples will added.


- SimpleTailWinds.json - Creates an empty website with Tailwind CSS added as a package

- GolfBreaks - Creates a Visual Studio solution with multiple projects attached to it. It adds references and npm packages. It will also generate an EF database library. This version is not complete 




### JSON Fields
Fields you can use in JSON file

Top Level


- ["solution-name"] - Name of your solution file.

- ["directory-path"] - It will create a new directory and generate all projects inside this folder. Keeps your projects organised.

- ["dry-run"] - This will not run any Dotnet Cli commands. Use ["display-command"] to show commands on screen and ["export-to-file"] to save generated commands to file.

- ["display-command"] - This will show generated Dotnet Cli commands on screen.

- ["export-to-file"] - This will write generated Dotnet Cli commands to a file. Might help you if you prefer to run your DotNet Cli commands manually. Files are saved in timestamped text files.

- ["ignore"] - This will tell the process to skip the current step e.g. don't generate projects, don't execute anmy actions nor add any packages. This can be set at local level in projects, packages, references or actions.

- ["do-not-create-solution"] - This will instruct process not to create a solution file

- ["force-overwrite"] - This will add a "--force" suffix to all "dotnet new" commands. If at top level the "force-overwrite" is set, it will over-ride any "force-overwrite" commands at local/project level.



Local Level


- "actions" - This will run any actions after the solution and projects are created. You might wish to use npm commands

- "project-name" - Name of project. Bear in mind, if you need to add this project as a reference to other projects, please enscure spelling and case sensivity matches up to project names referred to in ["references"] fields.

- "project-type" - The type of project to generate. See DotNet cli commands for new info. https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new

- "project-description" - Description of project. Not used by process. For information purposes only.

- "references" - List of project names to be added to current project. This list will be used to search for generated project file paths. None are found, it won't add any refernce to project.