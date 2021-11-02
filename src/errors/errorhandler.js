// Error Code
const error400 = {
  '0000': '잘못된 값을 입력하였습니다.',
  '0001': 'userId를 잘못 입력하였습니다.',
  '0002': 'userName을 잘못 입력하였습니다.',
  '0003': 'userName의 길이가 초과하였습니다.',
  '0004': 'originId를 잘못 입력하였습니다.',
  '0005': 'originName를 잘못 입력하였습니다.',
  '0006': 'originName의 길이가 초과하였습니다.',
  '0007': 'transId를 잘못 입력하였습니다.',
  '0008': 'transContent를 잘못입력하였습니다.',
  '0009': 'transContent의 길이가 초과하였습니다.',
  '0010': 'langId를 잘못 입력하였습니다.'
}
const error404 = {
  '0000': '잘못된 주소를 입력하였습니다.',
  '0001': 'userId가 존재하지 않습니다.',
  '0002': 'userName이 존재하지 않습니다.',
  '0003': 'originId이 존재하지 않습니다.',
  '0004': 'originName이 존재하지 않습니다.',
  '0005': 'transId가 존재하지 않습니다.',
  '0006': 'transContent이 존재하지 않습니다.',
  '0007': 'langId가 존재하지 않습니다.'
}

const error500 = {
  '0001': 'DB서버가 연결되지 않습니다.',
  '0002': 'DB Error'
}

const errorDB = {
  '22P02': 'invalid input syntax for type',
  42601: 'syntax error'
}
function errorHandler (err, req, res, next) {
  const mainErrorCode = err.message.split(':')[0]
  const minorErrorCode = err.message.split(':')[1]
  if (mainErrorCode === '400') {
    res.status(400)
    res.json({ errCode: mainErrorCode, message: error400[minorErrorCode] })
  } else if (mainErrorCode === '404') {
    res.status(404)
    res.json({ errCode: mainErrorCode, message: error404[minorErrorCode] })
  } else if (mainErrorCode === '500') {
    res.status(500)
    res.json({ errCode: mainErrorCode, message: error500[minorErrorCode] })
  }
}

module.exports = { errorHandler }
