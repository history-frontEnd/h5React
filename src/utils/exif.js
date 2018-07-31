// import common from './common'
/**
 * http://blog.csdn.net/libins/article/details/50973498
 * http://blog.csdn.net/han_jiang_xue/article/details/8266207
 * http://www.360doc.com/content/17/0219/18/37253146_630338662.shtml
 * 默认角度
 * 0° =1
 * 顺时针90° =6
 * 逆时针90° =8
 * 180° =3
 */
const defaultOrientation = 1
/**
 * https://github.com/exif-js/exif-js/blob/master/exif.js#L107
 */
const TiffTags = 0x0112
/**
 * https://github.com/exif-js/exif-js/blob/master/exif.js#L534
 * @param {*} dataView
 * @param {*} dirStart
 * @param {*} littleEndian
 */
const readTagValue = (dataView, dirStart, littleEndian) => {
  // 第一个  图像文件目录Image File Directory(IFD)
  var entries = dataView.getUint16(dirStart, littleEndian)
  var entryOffset
  var i
  for (i = 0; i < entries; i++) {
    // Directory Entry(DE)
    entryOffset = dirStart + i * 12 + 2
    if (TiffTags === dataView.getUint16(entryOffset, littleEndian)) {
      // short, 16 bit int
      return dataView.getUint16(entryOffset + 8, littleEndian)
    }
  }
  return defaultOrientation
}
/**
 * https://github.com/exif-js/exif-js/blob/master/exif.js#L394
 * https://github.com/exif-js/exif-js/blob/master/exif.js#L651
 * @param {*} arrayBuf  reader.readAsArrayBuffer(file)
 */
const readExif = (arrayBuf) => {
  var dataView = new DataView(arrayBuf)
  var offset = 2
  var length = dataView.byteLength
  while (offset < length) {
    // 判断是不是标记 0xFF+标记号(1个字节)+数据大小描述符(2个字节)+数据内容(n个字节)
    if (dataView.getUint8(offset) !== 0xFF) break
    // Exif 使用APP1(0xFFE1)
    if (dataView.getUint8(offset + 1) === 0xE1) {
      offset = offset + 4
      // Exif 数据开始于ASCII字符 "Exif" 和2个字节的0x00, 后面才是 Exif的数据
      // E = 0x45  |  x = 0x78 | i =0x69 | f =0x66
      if (dataView.getUint32(offset) !== (0x45000000 | 0x780000 | 0x6900 | 0x66)) {
        return defaultOrientation
      }
      var littleEndian
      offset = offset + 6

      // TIFF格式中前8个字节是 TIFF 头. 其中最开始的前2个字节定义了 TIFF 数据的字节序.
      // 如果这个值是 0x4949="II"的话, 就表示按照 "Intel" 的字节序(Little Endian) 来排列数据.
      // 如果是 0x4d4d="MM",则说明按照 "Motorola" 的字节序(Big Endian)来排列数据

      // 随后的两个字节是一个2字节长度的固定值 0x002A. ,
      // getUint16 第二个参数  如果为 false 或未定义，则应读取一个 big-endian 值，否则应读取一个 little-endian 值。
      // 如果数据使用 Intel 字节序, 则这两个 字节的数据排列为"0x2a,0x00".
      // 如果是 Motorola 的, 则是 "0x00,0x2a"
      if (dataView.getUint16(offset) === 0x4949 && dataView.getUint16(offset + 2, true) === 0x2A00) {
        littleEndian = true
      } else if (dataView.getUint16(offset) === 0x4D4D && dataView.getUint16(offset + 2) === 0x002A) {
        littleEndian = false
      } else {
        return defaultOrientation
      }
      var firstIFDOffset = dataView.getUint32(offset + 4, littleEndian)
      // TIFF头的最后的 4个字节是到第一个IFD 偏移量的值是 '0x00000008'.
      if (firstIFDOffset < 0x00000008) {
        return defaultOrientation
      }
      return readTagValue(dataView, offset + firstIFDOffset, littleEndian)
    } else {
      offset += 2 + dataView.getUint16(offset + 2)
    }
  }
  return defaultOrientation
}

/**
 * 获取角度 (仅存在于jpg)
 * @param {File} file 文件对象
 * @param {String} fileType 文件类型
 * @param {function} done 返回角度
 */
export const readOrientation = (file, fileType, done) => {
  // if (fileType !== 'jpg') return done(1)
  var reader = new FileReader()
  reader.onload = () => done(readExif(reader.result))
  reader.readAsArrayBuffer(file)
}

/**
 * 验证文件类型
 * @param {File} blob 文件对象
 * @param {function} done 返回格式
 */
export const vaildImgType = (blob, done) => {
  var reader = new FileReader()
  reader.onload = () => {
    var buf = new DataView(reader.result)
    done(buf.getUint16(0) && buf.byteLength > 1 ? ({
      'ffd8': 'jpg',
      '8950': 'png',
      '4749': 'gif',
      '424d': 'bmp'
    })[`${buf.getUint16(0).toString(16)}`] : undefined)
  }
  reader.readAsArrayBuffer(blob)
}

/**
 * 压缩并且摆正图片
 * @param {Img} img
 * @param {Int} orientation
 * @param {Int} maxWidth
 * @param {function} done
 */
export const compressImg = (img, orientation, maxWidth, done) => {
  // 1:0,3:180,6:90,8:270
  var canvas = document.createElement('canvas')
  var ctx = canvas.getContext('2d')
  var imgRotation = {
    '1': 0,
    '3': Math.PI,
    '6': Math.PI * 0.5,
    '8': Math.PI * 1.5
  }[orientation] || 0
  var dw
  var dh
  var ratio = 1
  if (~[6, 8].indexOf(orientation)) {
    canvas.width = Math.min(maxWidth, img.naturalHeight)
    ratio = canvas.width / img.naturalHeight
    canvas.height = img.naturalWidth * ratio
    dw = canvas.height
    dh = canvas.width
  } else {
    canvas.width = Math.min(maxWidth, img.naturalWidth)
    ratio = canvas.width / img.naturalWidth
    canvas.height = img.naturalHeight * ratio
    dw = canvas.width
    dh = canvas.height
  }
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate(imgRotation)
  let vertSquashRatio = 1
  // 当ios7 ／ ios6 的时候算压缩比
  // if (common.isIos && ~[7, 6].indexOf(parseInt(navigator.userAgent.toLowerCase().match(/os (\d+)_\d+/)[1]))) {
  //   vertSquashRatio = detectVerticalSquash(img)
  // }
  ctx.drawImage(img, 0, 0, img.naturalWidth * vertSquashRatio, img.naturalHeight * vertSquashRatio, -1 * dw / 2, -1 * dh / 2, dw, dh)
  done(canvas)
}

/**
 * 因为 iOS6 & iOS7 在canvas上绘制图片时，默认会垂直挤压图片，所以我们需要检测出图片的挤压比例
 * @param {Img} image
 */
export const detectVerticalSquash = image => {
  var ih = image.naturalHeight
  // 创建画布
  var cvs = document.createElement('canvas')
  // 设置宽度为1
  cvs.width = 1
  // 设置高度为图片高度
  cvs.height = ih
  // 获取描画对象
  var ctx = cvs.getContext('2d')
  // 绘制图片
  ctx.drawImage(image, 0, 0)
  // getImageData(int x,int y,int width,int height)：该方法获取canvas上从(x,y)点开始，宽为width、高为height的图片区域的数据，
  // 该方法返回的是一个CanvasPixelArray对象，该对象具有width、height、data等属性。
  // data属性为一个数组，该数组每4个元素对应一个像素点。
  var data = ctx.getImageData(0, 0, 1, ih).data
  // 有图像的像素点位置 检测图像边缘的情况下，此时它被垂直挤压像素的位置
  var sy = 0
  // 透明的像素点位置
  var ey = ih
  // 当前检索的像素点位置
  var py = ih

  while (py > sy) {
    // data属性为一个数组，该数组每4个元素对应一个像素点。py - 1：最后一个像素点；
    // 3：根据RGBA是代表Red（红色） Green（绿色） Blue（蓝色）和 Alpha的色彩空间，得出Alpha在第四个位置（索引是3）
    var alpha = data[(py - 1) * 4 + 3]
    // 透明
    if (alpha === 0) {
      ey = py
    } else {
      sy = py
    }
    // num >> 1 右移一位相当于除2，右移n位相当于除以2的n次方
    // 如果检测到了像素则扩大检索范围，如果没有检索到像素则会缩小范围，每次浮动值为检索到像素的点加没有检索到像素点的一半
    py = (ey + sy) >> 1
  }
  // 求出垂直压缩的比例
  var ratio = (py / ih)
  return (ratio === 0) ? 1 : ratio
}
