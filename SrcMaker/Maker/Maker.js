const { writeFileSync, readFileSync, existsSync, mkdirSync} = require('fs')
const { join, dirname } = require('path')

class Maker {
    #dbName = `db.json`;
    #imports = [];
    #exports = [];

    #makeDefaultClassContent(exportsStrings, functionStrings, indexImportStrings, data, classNameAlias, isBg) {
        exportsStrings.push(`export const ${data?.functionName}=${classNameAlias}.${data?.functionName}`);
        functionStrings.push(`static ${data?.functionName}(input:any){if(arguments.length===0){input=""}return M.getDefaultOutput(input,${data?.index},${isBg})}`);
        indexImportStrings.push(data?.functionName);
    }
    async #makeDefaultClassFile(className, classNameAlias, isBg) {
        try {
            console.log(`\x1b[34mAttempting to write file \x1b[1m${className}.ts\x1b[0m`);
            let functionStrings = [];
            let exportsStrings = [];
            let indexImportStrings = [className];
            let classPath = join(__dirname, `..`, `..`, `src`, `DefaultColors`, `${className}.ts`);
            const colors = require(join(__dirname, this.#dbName));

            for (const colorNameKey in colors) {
                const colorObj = colors[colorNameKey];
                for (const colorIntensityKey in colorObj) {
                    let functionNamePrefix = ``;
                    let functionNamePostfix = colorNameKey.trim().toLowerCase();

                    const index = colorObj[colorIntensityKey];
                    if (colorIntensityKey != `default`) {

                        functionNamePrefix = colorIntensityKey.trim().toLowerCase();
                        functionNamePostfix = functionNamePostfix.charAt(0).toUpperCase() + functionNamePostfix.slice(1);
                    }
                    let functionName = `${functionNamePrefix}${functionNamePostfix}`;
                    if (isBg) {
                        functionName = `bg${functionName.charAt(0).toUpperCase()}${functionName.slice(1)}`;
                    }

                    this.#makeDefaultClassContent(exportsStrings, functionStrings, indexImportStrings, { functionName, index }, classNameAlias, isBg);
                }
            }

            const functionsContent = functionStrings.join(" ");
            let exportsContent = exportsStrings.join(";")
            const classString = `import {OutputManager} from "../OutputManager.js";const M=OutputManager;export class ${className}{${functionsContent}}const ${classNameAlias}=${className};${exportsContent}`;
            if(!existsSync(dirname(classPath))){
                console.log(`\x1b[33mCould not find directory \x1b[1m${dirname(classPath)}\x1b[0m`);
                console.log(`\x1b[33mAttempting to create directory \x1b[1m${dirname(classPath)}\x1b[0m`);
                try{
                    mkdirSync(dirname(classPath), {recursive: true});
                    console.log(`\x1b[32mSuccessfully created directory \x1b[1m${dirname(classPath)}\x1b[0m`);
                }catch(err){
                    console.log(`\x1b[32mFailed to create \x1b[1m${dirname(classPath)} directory\x1b[0m`);
                    return null;
                }
            }else{
                console.log(`\x1b[32mFound existing directory \x1b[1m${dirname(classPath)}\x1b[0m`)
            }

            try{
                writeFileSync(classPath, classString, `utf-8`);
                console.log(`\x1b[32mSuccessfully wrote file \x1b[1m${className}.ts\x1b[0m`);
                console.log(`\n`);
                return indexImportStrings;

            }catch(err){
                console.error(`\x1b[31mFailed to write file \x1b[1m${className}.ts\x1b[0m`, err, err.stack);
                return null;
            }
        } catch (err) {
            console.error("\x1b[31mError executing makeDefaultClassFile:\x1b[0m", err, err.stack);
            return null;
        }
    }

    async execute() {
        const defaultClasses = [
            { name: `DefaultFgColors`, alias: `F`, importStrings: [], isBg: false },
            { name: `DefaultBgColors`, alias: `B`, importStrings: [], isBg: true }
        ];

        for (let i = 0; i < defaultClasses.length; i++) {
            const cls = defaultClasses[i];
            cls.importStrings = await this.#makeDefaultClassFile(cls?.name, cls?.alias, cls?.isBg);
            if (!cls.importStrings || !cls.importStrings.length) {
                console.log(`\x1b[31mError creating ${cls.name} class\x1b[0m`);
                return;
            }
        }
        this.#makeIndexFile(defaultClasses);
    }

    async #makeIndexFile(defaultClasses) {
        const className = "index";
        console.log(`\x1b[34mAttempting to write file \x1b[1m${className}.ts\x1b[0m`);
        let classPath = join(__dirname, `..`, `..`, `src`, `${className}.ts`);

        this.#populateIndexImportExportFromDefaultClasses(defaultClasses);
        this.#populateIndexImportExportFromDynamicClass(`DynamicColors`);
        this.#populateIndexImportExportFromDynamicClass(`Modifiers`);

        this.#imports = this.#imports.join("\n");
        this.#exports = `export {` + this.#exports.join(",") + `}`;
        const content = this.#imports + "\n" + this.#exports;
        try{
            writeFileSync(classPath, content, `utf-8`);
            console.log(`\x1b[32mSuccessfully wrote file \x1b[1m${className}.ts\x1b[0m`);
            console.log(`\n`);
            return true;

        }catch(err){
            console.error(`\x1b[31mFailed to write file \x1b[1m${className} \x1b[0m`, err, err.stack);
            return null;
        }
    }

    #populateIndexImportExportFromDefaultClasses(defaultClasses) {
        for (let i = 0; i < defaultClasses.length; i++) {
            const cls = defaultClasses[i];
            const importStrings = cls.importStrings.join(",")
            this.#imports.push(`import {${cls.importStrings.join(",")}} from "./DefaultColors/${cls.name}.js";`);
            this.#exports.push(importStrings)
        }
    }

    #populateIndexImportExportFromDynamicClass(className) {
        let tsClassPath = join(__dirname, `..`, `..`, `src`, className, className + `.ts`);
        let content;
        try{
            content = readFileSync(tsClassPath, `utf-8`);
        }
        catch(err){
            console.error(`\x1b[31mFailed to read file \x1b[1m${tsClassPath}\x1b[0m`, err, err.stack);
            return null;
        }
        content = content.substring(content.indexOf(`${className};`) + className.length + 2);
        content = content.split(";")
        content = content.map((value, index, arr) => {
            return value.substring(value.indexOf(`.`) + 1);
        }).filter((value, index) => {
            return value.length;
        });
        content.unshift(className)
        this.#imports.push(`import {${content.join(`,`)}} from "./${className}/${className}.js"`);
        this.#exports.push(content);
    }
}

exports.Maker = Maker;

new Maker().execute();