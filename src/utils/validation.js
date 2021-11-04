function userIdValidation (options) {
  const { userId } = options
  if (isNaN(userId) === true) {
    throw new Error('400:0004')
  }
}
function userNameValidation (options) {
  const { userName } = options
  if (!userName) {
    throw new Error('400:0005')
  }
  if (userName.length > 30) {
    throw new Error('400:0006')
  }
}
function originIdValidation (options) {
  const { originContentId } = options
  if (isNaN(originContentId) === true) {
    throw new Error('400:0014')
  }
}
function originContentValidation (options) {
  const { originContent } = options
  if (!originContent) {
    throw new Error('400:0015')
  }
  if (originContent.length > 150) {
    throw new Error('400:0016')
  }
}
function translateIdValidation (options) {
  const { translateId } = options
  if (isNaN(translateId) === true) {
    throw new Error('400:0024')
  }
}
function translateContentValidation (options) {
  const { translateContent } = options
  if (translateContent.length > 150) {
    throw new Error('400:0026')
  }
}

function languageIdValidation (options) {
  const { langId } = options
  if (isNaN(langId) === true) {
    throw new Error('400:0030')
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
