const taskManager = {
  __isDebug: true,
  __sections: [
    {title: "单词列表", type: 1, items: [
      {type: 1, content: [
        ["a ", "[ei]", "  art. 一 一个 件"],
        ["act ", "[ækt]", "  v. 行动 做动作 vt. 扮演 vi..."],
        ["and ", "[ænd]", "  conj. 和 与"],
        ["are ", "[ɑ:]", "  v. 是(be的第二人称单数现在时)"],
        ["bag ", "[bæɡ]", "  n. 书包; 提包; 袋子"],
        ["book ", "[buk]", "  vt. 登记入册; 预订(票等); 预约..."],
        ["close ", "[kləuz]", "  adj. 接近的; 亲近的; 亲密的 v..."],
        ["down ", "[daun]", "  adv. 向下; 在下面; 往南 pre..."],
        ["fine ", "[fain]", "  adj. 好的; 细微的; 细致的; 精..."],
        ["for ", "[fɔ:]", "  prep. [表示对象] 为; 供"],
      ]}
    ]},
    {title: "测试", type: 2, items: [
      {type: 2, content: {title: "一; 一个;", options: ["a", "and", "an", "b"]}},
      {type: 2, content: {title: "为; 供", options: ["four", "at", "for", "to"]}},
      {type: 2, content: {title: "接近的; 亲近的; 亲密的", options: ["honey", "close", "open", "book"]}},
    ]},
  ],
  __data: {},
  __currentSecIdx: 1,
  __currentItemIdx: 1,
  __currentIdx: 0,
  __endingIdx: 0,

  init() {
    this.__currentIdx = this.generateIdx(this.__currentSecIdx, this.__currentItemIdx);
    let endSec = this.__sections.length - 1;
    this.__endingIdx = this.generateIdx(endSec, (this.__sections[endSec].items.length - 1));
  },

  getSections() {
    return this.__sections;
  },

  getCurrentIdx() {
    return this.__currentIdx;
  },

  getCurrentItem() {
    return this.__sections[this.__currentSecIdx].items[this.__currentItemIdx];
  },

  getBreadcrumbs() {
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
  },

  setCurrent(secIdx, itemIdx) {
    let idx = this.generateIdx(secIdx, itemIdx);
    if(idx > this.__endingIdx || this.__currentIdx == idx){
      return false;
    }
    this.__currentSecIdx = secIdx;
    this.__currentItemIdx = itemIdx;
    this.__currentIdx = idx;
    return true;
  },

  setCurrentIdx(idx) {
    if(idx > this.__endingIdx || this.__currentIdx == idx){
      return false;
    }
    this.__currentSecIdx = (idx >> 10);
    this.__currentItemIdx = (idx & 1023);
    this.__currentIdx = idx;
    return true;
  },

  generateIdx(secIdx, itemIdx) {
    console.log(",,,,,,,/////")
    return (secIdx << 10) | itemIdx;
  },

  hasNext() {
    if(this.__currentIdx < this.__endingIdx){
      return true;
    } else {
      return false;
    }
  },

  next() {
    if(this.__currentItemIdx < (this.__sections[this.__currentSecIdx].items.length - 1)){
      this.setCurrent(this.__currentSecIdx, this.__currentItemIdx + 1)
      return this.__currentIdx;
    } else if (this.__currentSecIdx < (this.__sections.length - 1)){
      this.setCurrent(this.__currentSecIdx + 1, 0)
      return this.__currentIdx;
    } else {
      return -1;
    }
  },

  hasBack() {
    if(this.__currentIdx > 0){
      return true;
    } else {
      return false;
    }
  },

  back() {
    if(this.__currentItemIdx > 0){
      this.setCurrent(this.__currentSecIdx, this.__currentItemIdx - 1)
      return this.__currentIdx;
    } else if (this.__currentSecIdx > 0){
      this.setCurrent(this.__currentSecIdx - 1, (this.__sections[this.__currentSecIdx].items.length - 1))
      return this.__currentIdx;
    } else {
      return -1;
    }
  },

  reserve() {
  },

  submitAnswer(p, v) {
  },

  submitTask(p, v) {
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
