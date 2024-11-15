/**
 * 檢驗`strNum`是否可轉換成整數且不為`undefined`或`null`，並回傳 true(成功) 或 false(失敗) 。
 * 
 * @param {string | number} strNum - 要轉換的字串或數字。
 * @returns {boolean}
 */
function tryParseInt(strNum){
    let isNum = (/^\d*$/).test(strNum) && strNum;
    return isNum;
}

/**
 * 將字串轉換為整數，若無法轉換則返回預設值。
 * 
 * @param {string | number} strNum - 要轉換的字串或數字。
 * @param {number} defaultNum - 當 `strNum` 無法轉換為整數時回傳的預設值。
 * @returns {number} - 轉換成功的整數，或 `defaultNum` 作為預設值。
 */
function defParseInt(strNum, defaultNum) {
    return tryParseInt(strNum) ? parseInt(strNum) : defaultNum;
}

export {tryParseInt, defParseInt}