/**
 * 计算日期相差多少天
 * 
 * @t argsname datatype format
 * @f---------------------------------
 * @1 dateBegin string 1989-01-02
 * @2 dateEnd string 1989-01-11
 */
function distanceDay(dateBegin, dateEnd) {
	var sDate = new Date(dateBegin);
	var eDate = new Date(dateEnd);
	var fen = ((eDate.getTime() - sDate.getTime()) / 1000) / 60;
	var distance = parseInt(fen / (24 * 60)); // 相隔distance天
	return distance;
};

/**
 * 计算日期相差多少天
 * 
 * @t argsname datatype format
 * @f---------------------------------
 * @1 sDate date 1989-01-02
 * @2 eDate date 1989-01-11
 */
function distanceDayByDate(sDate, eDate) {
	var fen = ((eDate.getTime() - sDate.getTime()) / 1000) / 60;
	var distance = parseInt(fen / (24 * 60)); // 相隔distance天
	return distance;
};