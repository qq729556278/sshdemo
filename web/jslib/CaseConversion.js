//转大写
function toUpperCase(obj) {
	$(obj).val($(obj).val().toUpperCase());
}
// 转小写
function toLowerCase(obj) {
	$(obj).val($(obj).val().toLowerCase());
}
// 获取basePath
function getBasePath() {
	var location = (window.location + '').split('/');
	var basePath = location[0] + '//' + location[2] + '/' + location[3];
	return basePath;
}
// 日期字符串后面加上分秒时
function stringToDateFormatter(str) {
	if (str && str != "" && str.length < 12)
		return str + " 00:00:00";
	else
		return str;
}
// 启用datagrid所有行编辑
function beginEditDatagrid(tabId) {
	var rows = $('#' + tabId).datagrid('getRows');
	if (rows && rows != null && rows.length > 0) {
		for ( var i = 0; i < rows.length; i++) {// 启用该datagrid每行的编辑
			$('#' + tabId).datagrid('beginEdit', i);
		}
	}
}
// 结束datagrid所有行编辑
function endEditDatagrid(tabId) {
	var rows = $('#' + tabId).datagrid('getRows');
	if (rows && rows != null && rows.length > 0)
		for ( var i = 0; i < rows.length; i++) {// 结束该datagrid每行的编辑
			$('#' + tabId).datagrid('endEdit', i);
		}
}
// 清空datagird中的数据
function clearDatagrid(tabId) {
	// 清空原有数据
	var item = $('#' + tabId).datagrid('getRows');
	if (item) {
		for ( var i = item.length - 1; i >= 0; i--) {
			var index = $('#' + tabId).datagrid('getRowIndex', item[i]);
			$('#' + tabId).datagrid('deleteRow', index);
		}
	}
	$('#' + tabId).datagrid('loadData', {
		total : 0,
		rows : []
	});
}
// 静态DATAGRID移动行
// dataGridId：字符串型——数据表格id；
// upORdown：布尔型——上移true、下移false;
function moveDataGridRow(dataGridId, upORdown) {
	var rows = $('#' + dataGridId).datagrid('getSelections');
	if (rows.length == 0) {
		$.messager.show({
			title : '提示',
			msg : '请先选中一行，再进行移动！'
		});
		return false;
	} else if (rows.length > 1) {
		$.messager.show({
			title : '提示',
			msg : '一次只能移动一行！'
		});
		return false;
	} else {
		var selectrow = $('#' + dataGridId).datagrid('getSelected');
		var rowIndex = $('#' + dataGridId).datagrid('getRowIndex', selectrow);
		var allRow = $('#' + dataGridId).datagrid('getRows');
		var firstInt;
		if (upORdown) {// 判断是否上移
			firstInt = rowIndex - 1;
		} else {
			firstInt = rowIndex + 1;
		}
		if (upORdown && rowIndex == 0) {
			$.messager.show({
				title : '提示',
				msg : '当前选择的航段已是最上级，不可再上移！'
			});
			return false;
		} else if (!upORdown && rowIndex == (allRow.length - 1)) {
			$.messager.show({
				title : '提示',
				msg : '当前选择的航段已是最下级，不可再下移！'
			});
			return false;
		} else {
			$('#' + dataGridId).datagrid('deleteRow', rowIndex);
			$('#' + dataGridId).datagrid('insertRow', {
				index : firstInt,
				row : selectrow
			});
		}
		$('#' + dataGridId).datagrid("selectRow", firstInt);
		return true;
	}
}
// datagrid移动行之前的判断
// dataGridId：字符串型——数据表格id；
// upORdown：布尔型——上移true、下移false;
// return：true，false
function moveDataGridRowCheck(dataGridId, upORdown) {
	var rows = $('#' + dataGridId).datagrid('getSelections');
	if (rows.length == 0) {
		$.messager.show({
			title : '提示',
			msg : '请先选中一行，再进行移动！'
		});
		return false;
	} else if (rows.length > 1) {
		$.messager.show({
			title : '提示',
			msg : '一次只能移动一行！'
		});
		return false;
	} else {
		var selectrow = $('#' + dataGridId).datagrid('getSelected');
		var rowIndex = $('#' + dataGridId).datagrid('getRowIndex', selectrow);
		var allRow = $('#' + dataGridId).datagrid('getRows');
		if (upORdown && rowIndex == 0) {
			$.messager.show({
				title : '提示',
				msg : '当前选择的航段已是最上级，不可再上移！'
			});
			return false;
		} else if (!upORdown && rowIndex == (allRow.length - 1)) {
			$.messager.show({
				title : '提示',
				msg : '当前选择的航段已是最下级，不可再下移！'
			});
			return false;
		} else {
			return true;
		}
	}
}
// 动态添加tr
// targetTableId:要插入的表格id
// sourceTableId：要拷贝的表格id
// index：每次添加要替换的增长id
//
function addHotelIncLine(targetTableId, sourceTableId, index) {
	var _hotelModelTable = $('#' + sourceTableId).html();// 获得模型中需要动态添加的元素
	_hotelModelTable = _hotelModelTable.replace(
			new RegExp("modelReplace", "gm"), index);// 替换模型中的标记值
	_hotelModelTable = _hotelModelTable.replace(new RegExp("hotelModel", "gm"),
			"hotelModel_del");// 替换模型中的的class
	_hotelModelTable = _hotelModelTable.substr(8, _hotelModelTable.length - 7);// 去掉首尾的<tbody></tbody>
	var a = $("#" + targetTableId + ">tbody").children("tr").length - 1;
	var currentRow = $("#" + targetTableId + ">tbody").children("tr").eq(a);
	currentRow.after(_hotelModelTable);
	$("#" + targetTableId).append(currentRow);// 将准备好的字符串插入目标table
}

function Map() {
	this.elements = new Array();
	// 获取MAP元素个数
	this.size = function() {
		return this.elements.length;
	};
	// 判断MAP是否为空
	this.isEmpty = function() {
		return (this.elements.length < 1);
	};
	// 删除MAP所有元素
	this.clear = function() {
		this.elements = new Array();
	};
	// 向MAP中增加元素（key, value)
	this.put = function(_key, _value) {
		this.elements.push({
			key : _key,
			value : _value
		});
	};
	// 删除指定KEY的元素，成功返回True，失败返回False
	this.remove = function(_key) {
		var bln = false;
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					this.elements.splice(i, 1);
					return true;
				}
			}
		} catch (e) {
			bln = false;
		}
		return bln;
	};
	// 获取指定KEY的元素值VALUE，失败返回NULL
	this.get = function(_key) {
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					return this.elements[i].value;
				}
			}
		} catch (e) {
			return null;
		}
	};
	// 获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
	this.element = function(_index) {
		if (_index < 0 || _index >= this.elements.length) {
			return null;
		}
		return this.elements[_index];
	};
	// 判断MAP中是否含有指定KEY的元素
	this.containsKey = function(_key) {
		var bln = false;
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					bln = true;
				}
			}
		} catch (e) {
			bln = false;
		}
		return bln;
	};
	// 判断MAP中是否含有指定VALUE的元素
	this.containsValue = function(_value) {
		var bln = false;
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].value == _value) {
					bln = true;
				}
			}
		} catch (e) {
			bln = false;
		}
		return bln;
	};
	// 获取MAP中所有VALUE的数组（ARRAY）
	this.values = function() {
		var arr = new Array();
		for (i = 0; i < this.elements.length; i++) {
			arr.push(this.elements[i].value);
		}
		return arr;
	};
	// 获取MAP中所有KEY的数组（ARRAY）
	this.keys = function() {
		var arr = new Array();
		for (i = 0; i < this.elements.length; i++) {
			arr.push(this.elements[i].key);
		}
		return arr;
	};
}

// 检查form表单必填
function formValidate(id) {
	var isValid = $('#' + id).form('validate');
	return isValid;
}

// 检查datagrid必填
function datagridValidate(id) {
	var b = true;
	var rows = $('#' + id).datagrid('getRows').length;
	for ( var i = 0; i < rows; i++) {
		var validate = $('#' + id).datagrid('validateRow', i);// 循环验证每一行
		if (!validate) {// 验证失败
			b = false;
			break;
		}
	}
	return b;
}

// 下拉框转大写
function toUpperCaseCombo(id) {
	$('#' + id).combobox().next('span').find('input').blur(function() {
		var text = $('#' + id).combobox("getText");
		var upText = text.toUpperCase();
		$('#' + id).combobox("setText", upText);
	});
}

function Arabia_to_Chinese(Num) {
	for (i = Num.length - 1; i >= 0; i--) {
		Num = Num.replace(",", "");// 替换tomoney()中的“,”
		Num = Num.replace(" ", "");// 替换tomoney()中的空格
	}
	Num = Num.replace("￥", "");// 替换掉可能出现的￥字符
	Num = Num.replace("¥", "");// 替换掉可能出现的¥字符
	if (isNaN(Num)) { // 验证输入的字符是否为数字
		// alert("请检查小写金额是否正确");
		return "";
	}
	// ---字符处理完毕，开始转换，转换采用前后两部分分别转换---//
	part = String(Num).split(".");
	newchar = "";
	// 小数点前进行转化
	for (i = part[0].length - 1; i >= 0; i--) {
		if (part[0].length > 10) {
			// alert("位数过大，无法计算");
			return "";
		}// 若数量超过拾亿单位，提示
		tmpnewchar = "";
		perchar = part[0].charAt(i);
		switch (perchar) {
		case "0":
			tmpnewchar = "零" + tmpnewchar;
			break;
		case "1":
			tmpnewchar = "壹" + tmpnewchar;
			break;
		case "2":
			tmpnewchar = "贰" + tmpnewchar;
			break;
		case "3":
			tmpnewchar = "叁" + tmpnewchar;
			break;
		case "4":
			tmpnewchar = "肆" + tmpnewchar;
			break;
		case "5":
			tmpnewchar = "伍" + tmpnewchar;
			break;
		case "6":
			tmpnewchar = "陆" + tmpnewchar;
			break;
		case "7":
			tmpnewchar = "柒" + tmpnewchar;
			break;
		case "8":
			tmpnewchar = "捌" + tmpnewchar;
			break;
		case "9":
			tmpnewchar = "玖" + tmpnewchar;
			break;
		}
		switch (part[0].length - i - 1) {
		case 0:
			tmpnewchar = tmpnewchar + "元";
			break;
		case 1:
			if (perchar != 0)
				tmpnewchar = tmpnewchar + "拾";
			break;
		case 2:
			if (perchar != 0)
				tmpnewchar = tmpnewchar + "佰";
			break;
		case 3:
			if (perchar != 0)
				tmpnewchar = tmpnewchar + "仟";
			break;
		case 4:
			tmpnewchar = tmpnewchar + "万";
			break;
		case 5:
			if (perchar != 0)
				tmpnewchar = tmpnewchar + "拾";
			break;
		case 6:
			if (perchar != 0)
				tmpnewchar = tmpnewchar + "佰";
			break;
		case 7:
			if (perchar != 0)
				tmpnewchar = tmpnewchar + "仟";
			break;
		case 8:
			tmpnewchar = tmpnewchar + "亿";
			break;
		case 9:
			tmpnewchar = tmpnewchar + "拾";
			break;
		}
		newchar = tmpnewchar + newchar;
	}
	// 小数点之后进行转化
	if (Num.indexOf(".") != -1) {
		if (part[1].length > 2) {
			// alert("小数点之后只能保留两位,系统将自动截段");
			part[1] = part[1].substr(0, 2);
		}
		for (i = 0; i < part[1].length; i++) {
			tmpnewchar = "";
			perchar = part[1].charAt(i);
			switch (perchar) {
			case "0":
				tmpnewchar = "零" + tmpnewchar;
				break;
			case "1":
				tmpnewchar = "壹" + tmpnewchar;
				break;
			case "2":
				tmpnewchar = "贰" + tmpnewchar;
				break;
			case "3":
				tmpnewchar = "叁" + tmpnewchar;
				break;
			case "4":
				tmpnewchar = "肆" + tmpnewchar;
				break;
			case "5":
				tmpnewchar = "伍" + tmpnewchar;
				break;
			case "6":
				tmpnewchar = "陆" + tmpnewchar;
				break;
			case "7":
				tmpnewchar = "柒" + tmpnewchar;
				break;
			case "8":
				tmpnewchar = "捌" + tmpnewchar;
				break;
			case "9":
				tmpnewchar = "玖" + tmpnewchar;
				break;
			}
			if (i == 0)
				tmpnewchar = tmpnewchar + "角";
			if (i == 1)
				tmpnewchar = tmpnewchar + "分";
			newchar = newchar + tmpnewchar;
		}
	}
	// 替换所有无用汉字
	// while(newchar.search("零零") != -1)
	{
		newchar = newchar.replace("零零", "零");
		newchar = newchar.replace("零亿", "亿");
		newchar = newchar.replace("亿万", "亿");
		newchar = newchar.replace("零万", "万");
		newchar = newchar.replace("零元", "元");
		newchar = newchar.replace("零角", "");
		newchar = newchar.replace("零分", "");
	}
	if (newchar.charAt(newchar.length - 1) == "元"
			|| newchar.charAt(newchar.length - 1) == "角")
		newchar = newchar + "整";
	if (newchar == "元整")
		newchar = "零" + newchar;
	return newchar;
}

// 获取主单下得子单数量
function countProductOrder(idMainOrder) {
	var reVal = $.ajax({
		url : getBasePath() + "/productOrderAction!countProductOrder.action",
		dataType : "json",
		data : {
			"mainOrder.idMainOrder" : idMainOrder
		},
		async : false,
		cache : false,
		type : "post"
	});
	var json = reVal.responseJSON;
	var pl = json.obj;
	if (pl != null) {
		var code = pl.codeProdouctOrder.split("-")[1];
		tab_count = parseInt(code.substr(1, code.length));
		return tab_count;
	} else {
		return 0;
	}
}

// 转移航段新增子单
function createTransferTab(title, idMainOrder, proTypeProdouctOrder,
		codeMainOrder) {
	var reVal = $.ajax({
		url : getBasePath() + "/productOrderAction!add.action",
		dataType : "json",
		data : {
			"mainOrder.idMainOrder" : idMainOrder,
			"codeProdouctOrder" : codeMainOrder + "-" + title
					+ (parseInt(countProductOrder(idMainOrder)) + 1),
			"proTypeProdouctOrder" : proTypeProdouctOrder,
			"proAirlineProdouctOrder" : "",
			"supIdProdouctOrder" : 0,
			"supNameProdouctOrder" : "",
			"supCodeProdouctOrder" : "",
			"ysProdouctOrder" : "0",
			"yfProdouctOrder" : "0",
			"lrProdouctOrder" : "0",
			"paymentProdouctOrder" : 0,
			"statusProdouctOrder" : 0,
			"quotationCreateStatusProdouctOrder" : 0,
			"exchangeCreateStatusProductOrder" : 0,
			"invoiceCreateStatusProductOrder" : 0,
			"purchaseCreateStatusProductOrder" : 0
		},
		async : false,
		cache : false,
		type : "post"
	});
	var json = reVal.responseJSON;
	if (json.success) {
		return json.obj;
	}
}

function formatterDate(datetime){
	var date = datetime.split(" ")[0].split("-");
	var year = date[0].substr(2,date[0].length);
	var monthNum = date[1];
	var month = "";
	if(monthNum == "01"){
		month = "JAN";
	}else if(monthNum == "02"){
		month = "FEB";
	}else if(monthNum == "03"){
		month = "MAR";
	}else if(monthNum == "04"){
		month = "APR";
	}else if(monthNum == "05"){
		month = "MAY";
	}else if(monthNum == "06"){
		month = "JUN";
	}else if(monthNum == "07"){
		month = "JUL";
	}else if(monthNum == "08"){
		month = "AUG";
	}else if(monthNum == "09"){
		month = "SEP";
	}else if(monthNum == "10"){
		month = "OCT";
	}else if(monthNum == "11"){
		month = "NOV";
	}else if(monthNum == "12"){
		month = "DEC";
	}
	var day = date[2];
	
	return day + month + year;
}

function controlLine(id){
	var count = $("#"+id).datagrid("getRows").length;
	if(count >= 1){
		$.messager.alert('提示', '该产品只能添加一条航段，多条航段请分产品单录入！', 'info');
		return true;
	}else{
		return false;
	}
}

function trim(string) {
	var newString = "";
	for ( var i = 0; i < string.length; i++) {
		if (string[i] != " ") {
			newString += string[i];
		}
	}
	return newString;
}

/**
 * 读取关联旅客
 * 
 * @param datagrid
 *            应收列表ID
 * @param proType
 *            产品类型
 */
function loadRelPassenger(datagrid,idProductOrder,proType){
	var flag = false;
	var reVal = $.ajax({
		url : getBasePath() + "/productOrderAction!loadRelPassenger.action",
		dataType : "json",
		data : {
			"idProdouctOrder" : idProductOrder,
		},
		async : false,
		cache : false,
		type : "post"
	});
	var json = reVal.responseJSON;
	if (json.success) {
		flag = true; 
		var passengers = json.obj;
		$("#"+datagrid).datagrid("showColumn","namePassenger");
		var allRow = $("#"+datagrid).datagrid("getRows");
		if(proType == 3){// 酒店
			for(var i = 0; i < allRow.length; i++){
				for(var j = 0; j < passengers.length; j++){
					if(allRow[i].idHotelPriceLine == passengers[j].idPriceLine){
						$("#"+datagrid).datagrid("updateRow",{
							index: i,
							row: {
								namePassenger: passengers[j].namePassenger,
							}
						});
						break;
					}
				}
			}
		}else if(proType == 4){// 自驾
			for(var i = 0; i < allRow.length; i++){
				for(var j = 0; j < passengers.length; j++){
					if(allRow[i].idCarPriceLine == passengers[j].idPriceLine){
						$("#"+datagrid).datagrid("updateRow",{
							index: i,
							row: {
								namePassenger: passengers[j].namePassenger,
							}
						});
						break;
					}
				}
			}
		}else if(proType == 5){// 旅游
			for(var i = 0; i < allRow.length; i++){
				for(var j = 0; j < passengers.length; j++){
					if(allRow[i].idBusPriceLine == passengers[j].idPriceLine){
						$("#"+datagrid).datagrid("updateRow",{
							index: i,
							row: {
								namePassenger: passengers[j].namePassenger,
							}
						});
						break;
					}
				}
			}
		}else if(proType == 6){// 接送
			for(var i = 0; i < allRow.length; i++){
				for(var j = 0; j < passengers.length; j++){
					if(allRow[i].idLegoPriceLine == passengers[j].idPriceLine){
						$("#"+datagrid).datagrid("updateRow",{
							index: i,
							row: {
								namePassenger: passengers[j].namePassenger,
							}
						});
						break;
					}
				}
			}
		}
	}
	return flag;
}

function trim(string){
	var newString = "";
	for(var i = 0; i < string.length; i++){
		if(string[i] != " "){
			newString += string[i];
		}
	}
	return newString;
}


/**
 * HTML5存储
 * 
 */
function saveSessionStorage(key,value) {// session存储
	sessionStorage.setItem(key, value);
}
function loadSessionStorage(key) {// session读取
	return sessionStorage.getItem(key);
}
function saveLocalStorage(key,value) {// local存储
	localStorage.setItem(key, value);
}
function loadLocalStorage(key) {// local读取
	return localStorage.getItem(key);
}
/**
 * HTML5存储
 * 
 */