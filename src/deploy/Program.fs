open Farmer
open Farmer.Builders
open Farmer.LocationExtensions
open System

let tasksCloneBackend = webApp {
    name "tasksCloneBackend"
    operating_system Linux
    app_insights_off
    zip_deploy @"../../publish"
}

let tasksCloneFrontend = staticWebApp {
    name "tasksCloneFrontend"
    repository "https://github.com/timotheegloerfeld/todo-example"
    app_location "src/client"
    artifact_location "out"
}

let deployment = arm {
    location Location.WestEurope
    //add_resource tasksCloneBackend
    add_resource tasksCloneFrontend
}

deployment
    |> Deploy.execute "tasks-clone" [tasksCloneFrontend.RepositoryParameter, "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"]
    |> Console.WriteLine