import request from '@/utils/request'

const taskManager = {
  __isDebug: false,
  summaryLoaded: false,
  detailsLoaded: false,
  __started: false,
  __examId: null,
  __title: '',
  __description: '',
  __sections: [],
  __currentSecIdx: 0,
  __currentItemIdx: 0,
  __endingSecIdx: 0,
  __endingItemIdx: 0,
  __indexArray: [],

  init() {
    this.__examId = Drip.exam_id
  },

  loadExamSummary() {
    const _this = this
    request.get('/exam/summary', { id: this.__examId }).then((resData) => {
      _this.__title = resData.exam_summary.title;
      _this.__description = resData.exam_summary.description;
      _this.__started = resData.started;
      _this.summaryLoaded = true;
    })
  },

  loadExamDetail() {
    const _this = this
    request.get('/exam/startOrContinue', { id: this.__examId }).then((resData) => {
      _this.__title = resData.exam_task.exam.title;
      _this.__description = resData.exam_task.exam.description;
      let current = resData.exam_task.current;
      _this.__sections = resData.exam_task.sections;
      let secLength = _this.__sections.length;
      _this.__indexArray = new Array(secLength);
      _this.__endingSecIdx = secLength - 1;
      _this.__endingItemIdx = _this.__sections[_this.__endingSecIdx].items.length - 1;
      for(let i=0; i < secLength; i++){
        let itemLen = _this.__sections[i].items.length;
        _this.__indexArray[i] = new Array(itemLen);
        for(let j=0; j < itemLen; j++){
          _this.__indexArray[i][j] = _this.generateIdx(i, j);
          if(_this.__sections[i].items[j].id == current){
            _this.__currentSecIdx = i;
            _this.__currentItemIdx = j;
          }
        }
      }
      _this.detailsLoaded = true;
    })
  },

  submitAnswer(answer) {
    let currentItem = this.getCurrentItem();
    if(answer == null || currentItem.user_answer == answer) return;
    currentItem.user_answer = answer;
    request.post('exam/submitAnswer', { item_id: currentItem.id, user_answer: answer }).then((resData) => {
      console.log(resData)
    })
  },

  submitExam() {
  },

  isStarted() {
    this.__started;
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

  setDebug(v) {
    this.__isDebug = v
  },
}

export default taskManager
