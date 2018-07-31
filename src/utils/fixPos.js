/*
 *  图片位置初始化
 *  缩放初始化为1，且图片居中
 *  @params type 图片初始化类型 默认 cover
 */
export function _fixedDrawSize (type = 'cover') {
  // cover 显示剧中
  this.resPos.sw = this.resource().naturalWidth || this.resource().width
  this.resPos.sh = this.resource().naturalHeight || this.resource().height
  this.drawPos.dw = this.canvas.width
  this.drawPos.dh = this.canvas.height
  this.imageRatio = this.resPos.sw / this.resPos.sh
  this.containerRatio = this.drawPos.dw / this.drawPos.dh
  this.drawPos.dx = this.drawPos.dy = 0
  this.scale = 1
  if (type === 'cover') {
    // 当图片比较宽
    if (this.imageRatio > this.containerRatio) {
      this.drawPos.dw = this.drawPos.dh * this.imageRatio
      this.drawPos.dx = (this.canvas.width - this.drawPos.dw) >> 1
      // 最小缩放以小的高为准 （因为缩放比例图片和容器是1比1）
      // this.minScale = this.offset.height / this.drawHei
    } else {
      // 当图片比较高
      this.drawPos.dh = this.drawPos.dw / this.imageRatio
      this.drawPos.dy = (this.canvas.height - this.drawPos.dh) >> 1
      // 最小缩放以小的宽为准  （因为缩放比例图片和容器是1比1）
      // this.minScale = this.offset.width / this.drawWid
    }
  } else {
    // 当图片比较宽
    if (this.imageRatio > this.containerRatio) {
      this.drawPos.dh = this.drawPos.dw / this.imageRatio
      this.drawPos.dy = (this.canvas.height - this.drawPos.dh) >> 1
      // 最小缩放以小的高为准 （因为缩放比例图片和容器是1比1）
      // this.minScale = this.offset.height / this.drawHei
    } else {
      // 当图片比较高
      this.drawPos.dw = this.drawPos.dh * this.imageRatio
      this.drawPos.dx = (this.canvas.width - this.drawPos.dw) >> 1
      // 最小缩放以小的宽为准  （因为缩放比例图片和容器是1比1）
      // this.minScale = this.offset.width / this.drawWid
    }
  }
}

// 缩放值小于1时的位置矫正
export function _fixedCenterPic (type = 'cover') {
  let offset
  if (this.imageRatio > this.containerRatio) {
    offset = -this.drawPos.dh * (1 - this.scale) * 0.5
    this.minX = this.maxX = (this.canvas.width - this.drawPos.dw) * 0.5
    this.minY = this.canvas.height - this.drawPos.dh * this.scale + offset
    this.maxY = offset
  } else {
    offset = -this.drawPos.dw * (1 - this.scale) * 0.5
    this.minX = this.canvas.width - this.drawPos.dw * this.scale + offset
    this.maxX = offset
    this.minY = this.maxY = (this.canvas.height - this.drawPos.dh) * 0.5
  }
  if (type === 'contain') {
    this.minX = [this.maxX, this.maxX = this.minX][0]
    this.minY = [this.maxY, this.maxY = this.minY][0]
  }
  fixedDxAndDy.bind(this)(type)
}

// 缩放值大于1的位置矫正
export function _fixedEdgePic (type = 'cover') {
  this.minX = this.canvas.width - this.drawPos.dw * (1 + this.scale) * 0.5
  this.maxX = this.drawPos.dw * (this.scale - 1) * 0.5
  this.minY = this.canvas.height - this.drawPos.dh * (1 + this.scale) * 0.5
  this.maxY = this.drawPos.dh * (this.scale - 1) * 0.5
  if (type === 'contain') {
    this.minX = [this.maxX, this.maxX = this.minX][0]
    this.minY = [this.maxY, this.maxY = this.minY][0]
  }
  fixedDxAndDy.bind(this)(type)
}

function fixedDxAndDy (type = 'cover') {
  this.maxX += this.offset.left
  this.maxY += this.offset.top
  this.minY -= (parseFloat(window.getComputedStyle(this.canvas).height) - this.offset.top - this.offset.height)
  this.minX -= (parseFloat(window.getComputedStyle(this.canvas).width) - this.offset.left - this.offset.width)
  this.drawPos.dx = Math.min(Math.max(this.drawPos.dx, this.minX), this.maxX)
  this.drawPos.dy = Math.min(Math.max(this.drawPos.dy, this.minY), this.maxY)
}

// 取小数
export function _toFloatX (num) {
  return parseFloat(num.toFixed(4))
}
