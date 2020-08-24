import React, { Component } from 'react';
import UI from '../UI/UI';

class InputForm extends Component {
    constructor(props) {
        super(props);
        let fileReader;
        
        this.state = {
            isFileLoaded: false,
            finalPackageList: []
        }
        
    }




handleFileRead = (e) => {
    const packageName = "package-name";
    const packageDependency = "package-dependency";
    const packageDescription = "package-description";
    const content = this.fileReader.result;

    

    const textParser = function (options) {
        var token = [],
            types = [],
            parse = function () {
                //these are parse functions, with specific logic
                var data = options,
                    len = data.length,
                    a = 0,
                    parseName = function () {
                        var name = [],
                            b = 0;
                        for (b = a + 1; b <= len; b += 1) {
                            name.push(data[b]);
                            if (
                                data[b + 1] === "\n") {
                                break;
                            }
                        }
                        a = b;
                        token.push(name.join(""));
                        types.push(packageName);

                    },
                    parseDescription = function () {
                        var description = [],
                            b = 0;
                        for (b = a + 1; b <= len; b += 1) {
                            description.push(data[b]);
                            if (

                                data[b + 1] === "\n" &&
                                data[b + 2] !== " ") {
                                break;
                            }
                        }
                        a = b;
                        token.push(description.join(""));
                        types.push(packageDescription);

                    },
                    parseDependencies = function () {
                        var dependency = [],
                            b = 0,
                            ignoreVersion = false;
                        for (b = a + 1; b <= len; b += 1) {

                            if (ignoreVersion === false) {
                                dependency.push(data[b]);
                            }

                            if (data[b + 1] === "\n" || data[b + 1] === ",") {
                                break;
                            }

                            else if (data[b + 1] === " " &&
                                data[b + 2] === "(") {

                                ignoreVersion = true;
                            } else if (data[b] === ")") {

                                ignoreVersion = false;
                            }

                        }
                        a = b;
                        token.push(dependency.join(""));
                        types.push(packageDependency);
                        if (data[b + 1] === ",") {
                            //skip ", " and rerun for each dependancy
                            a = b + 2;
                            parseDependencies();
                        }

                    }
                // these are parser triggers
                for (a = 0; a < len; a += 1) {
                    // package name parsing
                    if (data[a] === " " &&
                        data[a - 1] === ":" &&
                        data[a - 2] === "e" &&
                        data[a - 3] === "g" &&
                        data[a - 4] === "a" &&
                        data[a - 5] === "k" &&
                        data[a - 6] === "c" &&
                        data[a - 7] === "a" &&
                        data[a - 8] === "P"
                    ) {
                        parseName();
                    }
                    // package description parsing
                    else if (
                        data[a] === " " &&
                        data[a - 1] === ":" &&
                        data[a - 2] === "n" &&
                        data[a - 3] === "o" &&
                        data[a - 4] === "i" &&
                        data[a - 5] === "t" &&
                        data[a - 6] === "p" &&
                        data[a - 7] === "i" &&
                        data[a - 8] === "r" &&
                        data[a - 9] === "c" &&
                        data[a - 10] === "s" &&
                        data[a - 11] === "e" &&
                        data[a - 12] === "D"
                    ) {
                        parseDescription();
                    }
                    // package dependancy parsing
                    else if (
                        data[a] === " " &&
                        data[a - 1] === ":" &&
                        data[a - 2] === "s" &&
                        data[a - 3] === "d" &&
                        data[a - 4] === "n" &&
                        data[a - 5] === "e" &&
                        data[a - 6] === "p" &&
                        data[a - 7] === "e" &&
                        data[a - 8] === "D" &&
                        data[a - 9] === "\n"
                    ) {
                        parseDependencies();
                    }
                }
            };
        parse();

        return { token: token, types: types };
    };

    const buildPackagesArray = (parserResult) => {
        const parserRes = parserResult;
        const packagesArray = [];
        let index = 0;
        let packageArrayIndex = -1;
        let packageJSON = {};

        parserRes.types.forEach(element => {
            if (element === packageName) {
                if (packageArrayIndex >= 0) {
                    packagesArray.push(packageJSON);
                }
                packageArrayIndex++;
                packageJSON = {
                    id:null,
                    name: "",
                    dependencies: [],
                    dependencyLinkIndex: [],
                    revDependencies: [],
                    revDependencyLinkIndex: [],
                    description: ""
                    
                };
                packageJSON.name = result.token[index];
                packageJSON.id = packageArrayIndex;
            } else if (element === packageDependency) {
                packageJSON.dependencies.push(result.token[index]);
                packageJSON.dependencyLinkIndex.push(null);
            } else if (element === packageDescription) {
                packageJSON.description = result.token[index];
            }

            index++;
        });
        return packagesArray;
    }

    const buildReverseDependencies = (packagesArray) => {
        let packagesArrayToIterate = packagesArray;
        const finalPackagesArray = [];

        packagesArrayToIterate.forEach(packageToIterate => {
            let pack = packageToIterate;
            let packageName = pack.name;

            packagesArray.forEach(packageToSearch => {
                let packNameToSearch = packageToSearch.name;
                packageToSearch.dependencies.forEach(dependencyName => {
                    if (packageName === dependencyName){
                        pack.revDependencies.push(packNameToSearch);
                        pack.revDependencyLinkIndex.push(null);
                    }
                });
            });
            finalPackagesArray.push(pack);
        });
        return finalPackagesArray;
    };

    const buildDependencyIndexLinks = (packagesArray) => {
        let packagesArrayToIterate = packagesArray;
        
        const removeAltVersions = (dependency) => {
            let dependencyName = [];
            let x = 0
                for (x = 0; x < dependency.length; x++){
                    if(dependency[x] === "|"){
                        console.log("Pipe char löydetty");
                        dependencyName.pop();
                        console.log("Typistetty package hakunimi:" + dependencyName);
                        break;
                    }else{
                        dependencyName = dependencyName.concat(dependency[x]);
                    }

                };
                dependencyName= dependencyName.join('');
                
                return dependencyName;
        };

        packagesArrayToIterate.forEach(packageToIterate => {
            let pack = packageToIterate;
            let dependencyIndex = 0;

            //check dependencies
            pack.dependencies.forEach(dependency => {
                let dependencyName = "";
                
                dependencyName = removeAltVersions(dependency);
                packagesArrayToIterate.forEach(packageToCompare => {
                    let packageName = packageToCompare.name;
                    if(packageName === dependencyName){
                        
                        packagesArrayToIterate[pack.id].dependencyLinkIndex[dependencyIndex] = packageToCompare.id;
                    };
                });
                dependencyIndex++;
            });
            dependencyIndex = 0;
            //check revDependencies
            pack.revDependencies.forEach(dependency => {
                
                let dependencyName = "";
                dependencyName = removeAltVersions(dependency);
                packagesArrayToIterate.forEach(packageToCompare => {
                    let packageName = packageToCompare.name;
                    if(packageName === dependencyName){
                        
                        packagesArrayToIterate[pack.id].revDependencyLinkIndex[dependencyIndex] = packageToCompare.id;
                    };
                });
                dependencyIndex++;
            });

        });
        return packagesArrayToIterate;
    }

    var result = textParser(content);
    var finalPackages = buildPackagesArray(result);
    var finalPackagesWithRevDependencies = buildReverseDependencies(finalPackages);
    var finalPackagesWithLinks = buildDependencyIndexLinks(finalPackagesWithRevDependencies);
    this.setState({ finalPackageList : finalPackagesWithLinks});
    console.log(this.state.finalPackageList);

};


handleFileChosen = (file) => {
    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.handleFileRead;
    this.fileReader.readAsText(file);
    this.setState({
        isFileLoaded: true
    });
};

drawUI(){
  if(this.state.isFileLoaded)
    return <UI packList={this.state.finalPackageList}></UI>
}

render() {
    return (
        <div className=''>
            <div>
                <input
                    type='file'
                    id='file'
                    className='input-file'
                    accept='.real'
                    onChange={e => this.handleFileChosen(e.target.files[0])}
                />
            </div>
            <div>
                {
                    this.drawUI()
                }

            </div>
        </div>
    );
    }
}

export default InputForm;