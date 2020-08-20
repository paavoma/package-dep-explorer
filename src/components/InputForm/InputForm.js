import React from 'react';


const InputForm = () => {
    let fileReader;

    const handleFileRead = (e) => {

        const content = fileReader.result;


        var textParser = function (options) {
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
                            types.push("package-name");

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
                            types.push("package-description");

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
                            types.push("package-dependancy");
                            if (data[b + 1] === ",") {
                                //skip ", " and rerun for each dependancy
                                a = b + 2;
                                parseDependencies();
                            }

                        }
                        // parser triggers
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
        var result = textParser(content);
        
        var index = 0;
        result.types.forEach(element => {
            console.log(element);
            console.log(result.token[index]);
            index++;
        });




    };

    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    };

    return <div className=''>
        <input
            type='file'
            id='file'
            className='input-file'
            accept='.real'
            onChange={e => handleFileChosen(e.target.files[0])}
        />
    </div>;
};

export default InputForm;