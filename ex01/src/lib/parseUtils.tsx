/**
 * 檢驗`strNum`是否可轉換成整數且不為`undefined`或`null`，並回傳 true(成功) 或 false(失敗) 。
 * 
 * @param {string | number} strNum - 要轉換的字串或數字。
 * @returns {boolean}
 */
function tryParseInt(strNum: string | number): boolean{
    let isNum: boolean = true;
    if (typeof strNum === "string")
        isNum = (/^\d*$/).test(strNum) && typeof strNum !== "undefined" && strNum != null;
    return isNum;
}

/**
 * 將字串轉換為整數，若無法轉換則返回預設值。
 * 
 * @param {string | number} strNum - 要轉換的字串或數字。
 * @param {number} defaultNum - 當 `strNum` 無法轉換為整數時回傳的預設值。
 * @returns {number} - 轉換成功的整數，或 `defaultNum` 作為預設值。
 */
function defParseInt(strNum: string | number, defaultNum: number): number {
    let n: number = defaultNum;
    if (typeof strNum === "string" && tryParseInt(strNum))
        n = parseInt(strNum);

    return n;
}

export {tryParseInt, defParseInt}