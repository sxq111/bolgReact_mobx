import { observable, action, computed, useStrict } from 'mobx';
import FileMap from './articlesHelper/fileMap.json';
// useStrict(true);
let allPaths = getAllpath(FileMap);
// console.log(import(allPaths[0]+'/index.js').then(rst=>{console.log(rst)}));
const FILE_MAP = observable(FileMap);
class Store {
    @observable currentTag = null;
    @observable displayMode = 'normal';
    @computed get FileMap() {
        return FILE_MAP;
    }
    @computed get FileMapCount() {
        console.log('get count');
        return Object.keys(FILE_MAP).reduce(((prev, current) => {
            prev[current] = Object.keys(FILE_MAP[current]).length;
            return prev;
        }), {});
    }
    @computed get TimeLineFile() {
        console.log('computed');
        let rst = [];
        allPaths.forEach(p=>{
            let helper=require(p+'/index.js');
            rst.push({
                title : p.split('/')[1],
                ...helper.getBasicInfo(),
                path:p
            });
        });
        return rst;
    }
    @action.bound changeTag(tag) {
        this.currentTag = tag;
    }
    @action.bound triggerDisplayModeTimekline() {
        this.displayMode = 'timeline';
    }
    @action.bound triggerDisplayModeNormal() {
        this.displayMode = 'normal';
    }
}
function getAllpath(fmap) {
    let paths = [];
    function getPath(obj, currentpath) {
        if (typeof obj !== 'object') {
            paths.push(currentpath);
            return;
        }
        Object.keys(obj).map(key => {
            getPath(obj[key], currentpath + '/' + key);
        });
    }
    getPath(fmap,'./articles');
    return paths;
}

// console.log(new Store());
export default new Store();