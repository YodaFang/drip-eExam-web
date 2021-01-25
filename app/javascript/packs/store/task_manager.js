const taskManager = {
  __isDebug: true,
  wrods: [
    ["a ", "[ei]", "  art. 一 一个 件"],
    ["act ", "[ækt]", "  v. 行动 做动作 vt. 扮演 vi..."],
    ["and ", "[ænd]", "  conj. 和 与"],
    ["are ", "[ɑ:]", "  v. 是(be的第二人称单数现在时)"],
    ["bag ", "[bæɡ]", "  n. 书包; 提包; 袋子"],
    ["book ", "[buk]", "  vt. 登记入册; 预订(票等); 预约..."],
    ["close ", "[kləuz]", "  adj. 接近的; 亲近的; 亲密的 v..."],
    ["down ", "[daun]", "  adv. 向下; 在下面; 往南 pre..."],
    ["fine ", "[fain]", "  adj. 好的; 细微的; 细致的; 精..."],
    ["for ", "[fɔ:]", "  prep. ", "[表示对象]", "为; 供"],
  ],
  exam: [
    {title: "一; 一个;", options: ["a", "and", "an", "b"]},
    {title: "为; 供", options: ["four", "at", "for", "to"]},
    {title: "接近的; 亲近的; 亲密的", options: ["honey", "close", "open", "book"]},
  ],
  sections: [
    {title: "单词列表", type: 1, items: [
      {title: "单词列表", content: [
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
      {title: "一; 一个;", options: ["a", "and", "an", "b"]},
      {title: "为; 供", options: ["four", "at", "for", "to"]},
      {title: "接近的; 亲近的; 亲密的", options: ["honey", "close", "open", "book"]},
    ]},
  ],
  __data: {},
  __current_sec: 0,
  __current_idx: 0,

  init(p, v) {
  },

  setCurrent(p, v) {
  },

  next(p, v) {
  },

  reserve(p, v) {
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
