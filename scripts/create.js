const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');
const _ = require('lodash');
const args = process.argv.splice(2);

const dir = path.resolve(__dirname, '..');
const lineBreak = process.os === 'Windows_NT' ? '\r\n' : '\n';
// 创建页面
if( args[0] === 'page') {
    const input = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    input.question('Input page name：', (fileName) => {
        if(fileName) {
            fileName = _.upperFirst(fileName);
            let file = fs.readFileSync(`${dir}/template/page.tpl`, 'utf8');
            file = file.replace(RegExp('NEW_PAGE', 'g'), fileName);
            const newFile = `${dir}\\src\\pages\\App\\${fileName}\\${fileName}.tsx`;
            fs.pathExists(newFile).then((exists) => {
                if(!exists) {
                    fs.ensureFileSync(newFile);
                    fs.writeFileSync(newFile, file, 'utf8');
                    console.log(`Create success: ${newFile}`);

                    // 写入路由
                    const routerPath = `${dir}/src/router/index.ts`;
                    const router = fs.readFileSync(routerPath, 'utf8');
                    let data = router.split(lineBreak);
                    data.splice(0, 0, `import ${fileName} from '../pages/App/${fileName}/${fileName}'`);
                    data.splice(data.length - 3, 0, `` +
                        `    ${fileName}: {${lineBreak}` +
                        `        name: '${fileName}',${lineBreak}` +
                        `        path: '/${fileName}',${lineBreak}` +
                        `        exact: true,${lineBreak}` +
                        `        component: ${fileName}${lineBreak}` +
                        `    },`
                    );
                    fs.writeFileSync(routerPath, data.join(`${lineBreak}`), 'utf8');
                    input.close();
                } else {
                    console.log('The page was exists, nothing to change');
                    input.close();
                }
            });
        } else {
            console.log('Cancel');
        }
    });
    input.on('close', () => {
        process.exit(0);
    });
}
// 创建组件
if(args[0] === 'comp') {
    const input = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    input.question('Input component name：', (fileName) => {
        if(fileName) {
            fileName = _.upperFirst(fileName);
            let file = fs.readFileSync(`${dir}/template/component.tpl`, 'utf8');
            file = file.replace(RegExp('NEW_COMP', 'g'), fileName);
            const newFile = `${dir}\\src\\components\\${fileName}.tsx`;
            fs.pathExists(newFile).then((exists) => {
                if(!exists) {
                    fs.ensureFileSync(newFile);
                    fs.writeFileSync(newFile, file, 'utf8');
                    console.log(`Create success: ${newFile}`);
                    input.close();
                } else {
                    console.log('The component was exists, nothing to change');
                    input.close();
                }
            });
        } else {
            console.log('Cancel');
        }
    });
    input.on('close', () => {
        process.exit(0);
    });
}
