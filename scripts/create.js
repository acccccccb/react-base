const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');
const _ = require('lodash');
const args = process.argv.splice(2);

const lineBreak = process.os === 'Windows_NT' ? '\r\n' : '\n';
if( args[0] === 'page') {
    const dir = path.resolve(__dirname, '..');
    const input = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    input.question('Input page name：', (pageName) => {
        if(pageName) {
            pageName = _.upperFirst(pageName);
            let file = fs.readFileSync(`${dir}/template/page.txt`, 'utf8');
            file = file.replace(RegExp('NEW_PAGE', 'g'), pageName);
            const newPageFile = `${dir}\\src\\pages\\App\\${pageName}\\${pageName}.tsx`;
            fs.pathExists(newPageFile).then((exists) => {
                if(!exists) {
                    fs.ensureFileSync(newPageFile);
                    fs.writeFileSync(newPageFile, file, 'utf8');
                    console.log(`Create success: ${newPageFile}`);

                    // 写入路由
                    const routerPath = `${dir}/src/router/index.ts`;
                    const router = fs.readFileSync(routerPath, 'utf8');
                    let data = router.split(lineBreak);
                    data.splice(0, 0, `import ${pageName} from '../pages/App/${pageName}/${pageName}'`);
                    data.splice(data.length - 3, 0, `` +
                        `    ${pageName}: {${lineBreak}` +
                        `        name: '${pageName}',${lineBreak}` +
                        `        path: '/${pageName}',${lineBreak}` +
                        `        exact: true,${lineBreak}` +
                        `        component: ${pageName}${lineBreak}` +
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
