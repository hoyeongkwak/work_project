function userIdValidation (options) {
  const { userId } = options
  if (isNaN(userId) === true) {
    console.log('user')
    throw new Error('400:0001')
  }
}
function userNameValidation (options) {
  const { userName } = options
  if (!userName) {
    throw new Error('400:0000')
  }
  if (userName.length > 30) {
    throw new Error('400:0003')
  }
}
function originIdValidation (options) {
  const { originContentId } = options
  if (isNaN(originContentId) === true) {
    throw new Error('400:0004')
  }
}
function originContentValidation (options) {
  const { originContent } = options
  if (!originContent) {
    throw new Error('400:0000')
  }
  if (originContent.length > 150) {
    throw new Error('400:0006')
  }
}
function translateIdValidation (options) {
  const { translateId } = options
  if (isNaN(translateId) === true) {
    throw new Error('400:0007')
  }
}
function translateContentValidation (options) {
  const { translateContent } = options
  if (translateContent.length > 150) {
    throw new Error('400:0009')
  }
}

function languageIdValidation (options) {
  const { langId } = options
  if (isNaN(langId) === true) {
    throw new Error('400:0010')
  }
}

module.exports = {
  userIdValidation,
  userNameValidation,
  originIdValidation,
  originContentValidation,
  translateIdValidation,
  translateContentValidation,
  languageIdValidation
}
