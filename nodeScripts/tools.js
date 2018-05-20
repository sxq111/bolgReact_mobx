const fs = require("fs");
const generateFileMap = (base, maxDepth = 2) => {
    return (function getMap(depth, path) {
        if (depth > maxDepth) {
            return true;
        }
        console.log(path);
        let map = {};
        let files = fs.readdirSync(path);
        files.length > 0 && files.filter(dir=>{
            let dir_str = dir.toLocaleLowerCase();//过滤mac的临时文件
            return dir_str.indexOf('ds_store') < 0;
        }).forEach(dir => {
            map[dir] = getMap(depth + 1, path + '/' + dir);
        });
        return map;
    })(1, base);
}

module.exports = {
    generateFileMap
}