import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';

// 웹팩 설정
const requireModule = require.context('.', true, /Contents\.vue$/, 'lazy');
const modules = {};

requireModule.keys().forEach(filename => {
    const moduleName = upperFirst(camelCase(filename.replace(/(\.\/|\.vue)/g, '')));
    modules[moduleName] = () => requireModule(filename);
});

console.log('module', modules);

export default modules;