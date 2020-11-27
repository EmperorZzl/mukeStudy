import svgCaptcha from 'svg-captcha';
class PublicController {
  constructor() {

  }
  async getCaptcha(ctx) {
    const newCaptcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0oil1',
      color: true,
      noise: Math.floor(Math.random() * 5),
      width:150,
      height:50,
    });
    console.log('newCaptcha', newCaptcha);
    ctx.body = {
      data: newCaptcha.data,
      code: 200,
    }
  }

}
export default new PublicController();