const scaffold = require("./lib/scaffold");

var obj = new Object();
obj.Workflow = process.env.npm_config_workflow;

scaffold.run(obj);