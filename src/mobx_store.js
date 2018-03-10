import { observable, action, computed, useStrict } from 'mobx';
import FileMap from './articlesHelper/fileMap.json';
// useStrict(true);

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
            prev[current] = Object.keys(FILE_MAP[current]).length ;
            return prev;
        }), {});
    }
    @action.bound changeTag(tag) {
        this.currentTag = tag;
    }
    @action.bound triggerDisplayModeTimekline() {
        this.displayMode = 'timeline';
    }
}

export default new Store();