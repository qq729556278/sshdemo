$.extend($.fn.validatebox.defaults.rules, {
	Decimal : {
		validator : function(value) {
			return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
		},
		message : '只能输入数字！'
	},
	Nonegative : {
		validator : function(value) {
			if (value >= 0) {
				return true;
			} else {
				return false;
			}
		},
		message : '只能为正数.'
	},
	Remote : {
		validator : function(value, param) {
			var data = {};
			if (param.length > 2) {
				data = param[2];
			}
			data[$('#' + param[1]).attr("name")] = value;
			var isValidate = $.ajax( {
				url : param[0], //url  
				dataType : "json",
				data : data,
				async : false,
				cache : false,
				type : "post"
			}).responseText;
			return isValidate == "true";
		},
		message : '不符合条件'
	},
	YearMonth : {
		validator : function(value, param) {
			return /[0-9][0-9]\/[0-9][0-9]/.test(value);
		},
		message : '请输入正确的月/年 格式：MM/YY'
	},
	YearMonthDate : {
		validator : function(value, param) {
			return /[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]/.test(value);
		},
		message : '请输入正确的日/月/年 格式：DD/MM/YYYY'
	},
	CreditCard : {
		validator : function(value, param) {
			if (value.length == 18)
				return /\d{16}/.test(value);//return /[A-Z]{2}\d{16}/.test(value);
			else
				return false
		},
		message : '请输入正确的信用卡 格式：1234567890123456'
	},CheckAjax : {
		validator : function(value, url) {
			var isValidate = $.ajax( {
				url : url, //url  
				dataType : "json",
				data : value,
				async : false,
				cache : false,
				type : "post"
			}).responseText;
			if(isValidate=="1"){
				return isValidate == "true";
			}else{
				return isValidate == "false";
			}
		},
		message : '该证件号已存在'
	}
});