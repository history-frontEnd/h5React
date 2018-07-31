/**
 * 设置canvas大小
 * @param {canvas} canvas
 * @param {Number} width 不存在取样式宽度
 * @param {Number} height 不存在取样式高度
 */
export function setSize (canvas, width, height) {
  let style = window.getComputedStyle(canvas)
  canvas.width = width || parseFloat(style.width)
  canvas.height = height || parseFloat(style.height)
}

/**
 * 画圆角矩形
 * @param {Context} ctx Canvas的Context上下文
 * @param {Number} x 左上角的X轴
 * @param {Number} y 左上角的Y轴
 * @param {Number} w 宽度
 * @param {Number} h 高度
 * @param {Number} r 圆角的半径
 */
export function drawRoundRect (ctx, x, y, w, h, r) {
  if (w < 2 * r) r = w / 2
  if (h < 2 * r) r = h / 2
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

/**
 * 画圆角矩形图片
 * @param {Context} ctx Canvas的Context上下文
 * @param {Image} img 图片素材
 * @param {Number} x 左上角的X轴
 * @param {Number} y 左上角的Y轴
 * @param {Number} w 宽度
 * @param {Number} h 高度
 * @param {Number} r 圆角的半径
 */
export function drawRoundRectImage (ctx, img, x, y, w, h, r) {
  ctx.save()
  drawRoundRect(ctx, x, y, w, h, r)
  ctx.clip()
  ctx.drawImage(img,
    0, 0, img.naturalWidth || img.width, img.naturalHeight || img.height,
    x, y, w, h)
  ctx.restore()
}

/**
 * 下载图片
 * @param {String} url  图片地址
 */
export function downloadImage (url) {
  return new Promise((resolve, reject) => {
    var img = new Image()
    let anchor = document.createElement('a')
    anchor.href = url
    // cross domain (除了base64 和 当前域名)
    if (/^data:image/.test(url) || location.host === anchor.host) {} else {
      img.crossOrigin = ''
    }
    img.onload = () => resolve(img)
    img.onerror = () => reject(img)
    img.src = url.replace(/^https?:/, location.protocol)
  })
}
