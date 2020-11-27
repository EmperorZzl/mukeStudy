

function getDogMessage(ctx) {
  ctx.body = {
    "message": 'hello from dog.js'
  };
}
module.exports = {
  getDogMessage
}

