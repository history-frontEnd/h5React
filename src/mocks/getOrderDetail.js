let order = {
  'code': 10000,
  'result': 'success',
  'message': '成功',
  'data': {
    'project_code': '4',
    'project_name': '5项疾病筛查',
    'mother_name': '邱123',
    'order_no': '180720164807327',
    'request_no': null,
    'order_state': 14,
    'order_datetime': '2018-07-20 16:48:07',
    'pay_datetime': '2018-01-01 16:48:07',
    'hospital_name': '黄冈市妇幼保健院采血点',
    'report_id': null,
    'pay_price': 1.01,
    'can_refund': 0,
    'is_free': 0,
    'is_scan': 0,
    'report_progress': [
      {
        'id': '9a54677ecab543debac65d4f9b6f7f62',
        'orderId': 'b408805d0d16498798b6df200a5ce30d',
        'userId': '5e016a8a183c420993762c8cf70c149a',
        'orderNo': '180720164807327',
        'orderState': 14,
        'orderDatetime': '2018-07-20 16:54:19',
        'payDatetime': '2018-06-25 12:47:33'
      }
    ]
  }
}

module.exports = {
  'GET /khaos/getOrderDetail': order
}
