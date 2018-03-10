import { observable, action, computed } from 'mobx';

class Store {
    @observable currentTag = null;
    @action changeTag(tag) {
        this.currentTag = tag;
    }
}


export default new Store();