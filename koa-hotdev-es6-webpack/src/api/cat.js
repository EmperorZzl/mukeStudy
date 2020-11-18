

let getCatMessage = (ctx) => {
  ctx.body = {
    "message": 'hello from cat.js!!'
  };
}
module.exports = {
  getCatMessage
}

