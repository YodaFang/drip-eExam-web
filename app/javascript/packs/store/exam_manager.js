import request from '@/utils/request'

const taskManager = {
  __isDebug: true,
  __sections: [
    { title: "单词列表", items: [
      { type: 1, content: [
          ["a ", "[ei]", "  art. 一 一个 件"],
          ["act ", "[ækt]", "  v. 行动 做动作 vt. 扮演 vi..."],
          ["and ", "[ænd]", "  conj. 和 与"],
          ["are ", "[ɑ:]", "  v. 是(be的第二人称单数现在时)"],
          ["bag ", "[bæɡ]", "  n. 书包; 提包; 袋子"],
        ]
      },
      { type: 1, content: [
          ["book ", "[buk]", "  vt. 登记入册; 预订(票等); 预约..."],
          ["close ", "[kləuz]", "  adj. 接近的; 亲近的; 亲密的 v..."],
          ["down ", "[daun]", "  adv. 向下; 在下面; 往南 pre..."],
          ["fine ", "[fain]", "  adj. 好的; 细微的; 细致的; 精..."],
          ["for ", "[fɔ:]", "  prep. [表示对象] 为; 供"],
        ]
      }
    ]},
    { title: "测试1", items: [
      { type: 2, description: "一; 一个;", options: ["a", "and", "an", "b"] },
      { type: 2, description: "为; 供", options: ["four", "at", "for", "to"] },
      { type: 2, description: "接近的; 亲近的; 亲密的", options: ["honey", "close", "open", "book"] },
    ]},
    { title: "测试2", items: [
      { type: 2, description: "一; 一个;", options: ["a", "and", "an", "b"] },
      { type: 2, description: "为; 供", options: ["four", "at", "for", "to"] },
      { type: 2, description: "接近的; 亲近的; 亲密的", options: ["honey", "close", "open", "book"] },
      { type: 2, description: "一; 一个;", options: ["a", "and", "an", "b"] },
      { type: 2, description: "为; 供", options: ["four", "at", "for", "to"] },
      { type: 2, description: "接近的; 亲近的; 亲密的", options: ["honey", "close", "open", "book"] },
    ]},
    { title: "测试3", items: [
      { type: 2, description: "一; 一个;", options: ["a", "and", "an", "b"] },
      { type: 2, description: "为; 供", options: ["four", "at", "for", "to"] },
      { type: 2, description: "接近的; 亲近的; 亲密的", options: ["honey", "close", "open", "book"] },
      { type: 2, description: "一; 一个;", options: ["a", "and", "an", "b"] },
      { type: 2, description: "为; 供", options: ["four", "at", "for", "to"] },
      { type: 2, description: "接近的; 亲近的; 亲密的", options: ["honey", "close", "open", "book"] },
    ]},
  ],
  __data: {},
  __currentSecIdx: 0,
  __currentItemIdx: 0,
  __endingSecIdx: 0,
  __endingItemIdx: 0,
  __indexArray: [],

  init() {
    console.log('init..............')
    this.loadExamDetail(1);
  },

  loadExamDetail(exam_id) {
    const _this = this
    console.log('loadExamDetail..............')
    request.get('/exam/detail', { id: exam_id }).then((resData) => {
      console.log(resData)
      let secLength = _this.__sections.length;
      _this.__indexArray = new Array(secLength);
      _this.__endingSecIdx = secLength - 1;
      _this.__endingItemIdx = _this.__sections[_this.__endingSecIdx].items.length - 1;
      for(let i=0; i < secLength; i++){
        let itemLen = _this.__sections[i].items.length;
        _this.__indexArray[i] = new Array(itemLen);
        for(let j=0; j < itemLen; j++){
          _this.__indexArray[i][j] = _this.generateIdx(i, j);
        }
      }
      _this.__currentSecIdx = 1;
      _this.__currentItemIdx = 1;
    }).catch(err => {
      console.log(err.response)
    })
  },

  getIndexArray() {
    return this.__indexArray;
  },

  getSection(secIdx) {
    return this.__sections[secIdx];
  },

  getCurrentSecIdx() {
    return this.__currentSecIdx;
  },

  getItem(secIdx, itemIdx){
    return this.__sections[secIdx].items[itemIdx];
  },

  getCurrentIdx() {
    return this.__indexArray[this.__currentSecIdx][this.__currentItemIdx];
  },

  getCurrentItem() {
    return this.__sections[this.__currentSecIdx].items[this.__currentItemIdx];
  },

  getBreadcrumbs() {
    if(this.__sections[this.__currentSecIdx].items.length < 2){
      return [
        {
          text: this.__sections[this.__currentSecIdx].title,
          disabled: true,
        },
      ];
    } else {
      return [
        {
          text: this.__sections[this.__currentSecIdx].title,
          disabled: true,
        },
        {
          text: this.__currentItemIdx + 1,
          disabled: true,
        },
      ];
    }
  },

  setCurrent(secIdx, itemIdx) {
    if(secIdx > this.__endingSecIdx || itemIdx > this.__endingItemIdx){
      return false;
    }
    this.__currentSecIdx = secIdx;
    this.__currentItemIdx = itemIdx;
    return true;
  },

  setCurrentIdx(idx) {
    let secIdx = (idx >> 11);
    let itemIdx = ((idx >> 1) & 1023);
    if(secIdx > this.__endingSecIdx || itemIdx > this.__endingItemIdx){
      return false;
    }
    this.__currentSecIdx = secIdx;
    this.__currentItemIdx = itemIdx;
    return true;
  },

  generateIdx(secIdx, itemIdx) {
    return (secIdx << 11) | (itemIdx << 1) | 1;
  },

  hasNext() {
    if(this.__currentSecIdx < this.__endingSecIdx){
      return true;
    } else if(this.__currentSecIdx == this.__endingSecIdx && this.__currentItemIdx < this.__endingItemIdx){
      return true;
    } else {
      return false;
    }
  },

  next() {
    if(this.__currentItemIdx < (this.__sections[this.__currentSecIdx].items.length - 1)){
      this.setCurrent(this.__currentSecIdx, this.__currentItemIdx + 1);
      return true;
    } else if (this.__currentSecIdx < (this.__sections.length - 1)){
      this.setCurrent(this.__currentSecIdx + 1, 0);
      return true;
    } else {
      return false;
    }
  },

  hasBack() {
    if(this.__currentSecIdx > 0){
      return true;
    } else if(this.__currentSecIdx == 0 && this.__currentItemIdx > 0){
      return true;
    } else {
      return false;
    }
  },

  back() {
    if(this.__currentItemIdx > 0){
      this.setCurrent(this.__currentSecIdx, this.__currentItemIdx - 1);
      return true;
    } else if (this.__currentSecIdx > 0){
      let secIdx = this.__currentSecIdx - 1;
      this.setCurrent(secIdx, (this.__sections[secIdx].items.length - 1));
      return true;
    } else {
      return false;
    }
  },

  reserve() {
  },

  submitAnswer(answer) {
  },

  submitTask() {
  },

  setValue(p, v) {
    if (this.__isDebug) console.log('set action triggered with', v)
    this.__data[p] = v
  },
  getValue(p) {
    return this.__data[p]
  }
}

export default taskManager
