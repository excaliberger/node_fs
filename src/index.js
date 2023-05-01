// installing a 3rd party module/dependency

const fs = require("fs");
const path = require("path")

let packageName = "templater.js";
let hasPackageJson = fs.existsSync("./package.json")

if (hasPackageJson) {
    updateDependencies(packageName);
} else {
    let content = { dependencies: {} };
    content.dependencies[packageName]
    fs.writeFile("./package.json", JSON.stringify(content), (err) => {
        if (err) return console.error(err);
    })
}


installDependencies(packageName);

function updateDependencies(packageName) {
    fs.readFile("./package.json", (err, data) => {
        if (err) return console.error(err);

        let json = JSON.parse(data.toString());
        json.dependencies[packageName] = "1.0.0"

        fs.writeFile("./package.json", JSON.stringify(json), (err) => {
            if (err) return console.error(err);
        } )
    })
}

function installDependencies(packageName) {
    let hasNodeModules = fs.existsSync("./node_modules");

    if (hasNodeModules) {
        downloadDependency(packageName);
    } else {
        fs.mkdir("./node_modules", (err) => {
            if (err) return console.error(err);
        })
        
        downloadDependency(packageName);
    }

}

function downloadDependency(packageName) {
    fs.readFile("../npmregistry/" + packageName, (err, data) => {
        if (err) return console.error(err)
    })
}