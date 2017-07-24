/**
 * 使panel和datagrid在加载时提示
 * 
 * 
 * @requires jQuery,EasyUI
 * 
 */
$.fn.panel.defaults.loadingMessage = '加载中....';
$.fn.datagrid.defaults.loadMsg = '加载中....';

/**
 * 
 * @requires jQuery,EasyUI
 * 
 * panel关闭时回收内存，主要用于layout使用iframe嵌入网页时的内存泄漏问题
 */
$.fn.panel.defaults.onBeforeDestroy = function() {
	var frame = $('iframe', this);
	try {
		if (frame.length > 0) {
			for ( var i = 0; i < frame.length; i++) {
				frame[i].src = '';
				frame[i].contentWindow.document.write('');
				frame[i].contentWindow.close();
			}
			frame.remove();
			if (navigator.userAgent.indexOf("MSIE") > 0) {// IE特有回收内存方法
				try {
					CollectGarbage();
				} catch (e) {
				}
			}
		}
	} catch (e) {
	}
};

/**
 * 
 * @requires jQuery,EasyUI
 * 
 * 防止panel/window/dialog组件超出浏览器边界
 * @param left
 * @param top
 */
var easyuiPanelOnMove = function(left, top) {
	var l = left;
	var t = top;
	if (l < 1) {
		l = 1;
	}
	if (t < 1) {
		t = 1;
	}
	var width = parseInt($(this).parent().css('width')) + 14;
	var height = parseInt($(this).parent().css('height')) + 14;
	var right = l + width;
	var buttom = t + height;
	var browserWidth = $(window).width();
	var browserHeight = $(window).height();
	if (right > browserWidth) {
		l = browserWidth - width;
	}
	if (buttom > browserHeight) {
		t = browserHeight - height;
	}
	$(this).parent().css({/* 修正面板位置 */
		left : l,
		top : t
	});
};
$.fn.dialog.defaults.onMove = easyuiPanelOnMove;
$.fn.window.defaults.onMove = easyuiPanelOnMove;
$.fn.panel.defaults.onMove = easyuiPanelOnMove;

/**
 * 
 * @requires jQuery,EasyUI
 * 
 * 通用错误提示
 * 
 * 用于datagrid/treegrid/tree/combogrid/combobox/form加载数据出错时的操作
 */
var easyuiErrorFunction = function(XMLHttpRequest) {
	$.messager.progress('close');
	$.messager.alert('错误', XMLHttpRequest.responseText);
};
$.fn.datagrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.treegrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.tree.defaults.onLoadError = easyuiErrorFunction;
$.fn.combogrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.combobox.defaults.onLoadError = easyuiErrorFunction;
$.fn.form.defaults.onLoadError = easyuiErrorFunction;

/**
 * 
 * @requires jQuery,EasyUI
 * 
 * 为datagrid、treegrid增加表头菜单，用于显示或隐藏列，注意：冻结列不在此菜单中
 */
var createGridHeaderContextMenu = function(e, field) {
	e.preventDefault();
	var grid = $(this);/* grid本身 */
	var headerContextMenu = this.headerContextMenu;/* grid上的列头菜单对象 */
	if (!headerContextMenu) {
		var tmenu = $('<div style="width:100px;"></div>').appendTo('body');
		var fields = grid.datagrid('getColumnFields');
		for ( var i = 0; i < fields.length; i++) {
			var fildOption = grid.datagrid('getColumnOption', fields[i]);
			if (!fildOption.hidden) {
				$('<div iconCls="tick" field="' + fields[i] + '"/>').html(fildOption.title).appendTo(tmenu);
			} else {
				$('<div iconCls="bullet_blue" field="' + fields[i] + '"/>').html(fildOption.title).appendTo(tmenu);
			}
		}
		headerContextMenu = this.headerContextMenu = tmenu.menu({
			onClick : function(item) {
				var field = $(item.target).attr('field');
				if (item.iconCls == 'tick') {
					grid.datagrid('hideColumn', field);
					$(this).menu('setIcon', {
						target : item.target,
						iconCls : 'bullet_blue'
					});
				} else {
					grid.datagrid('showColumn', field);
					$(this).menu('setIcon', {
						target : item.target,
						iconCls : 'tick'
					});
				}
			}
		});
	}
	headerContextMenu.menu('show', {
		left : e.pageX,
		top : e.pageY
	});
};
$.fn.datagrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;
$.fn.treegrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;

/**
 * grid tooltip参数
 * 
 */
var gridTooltipOptions = {
	tooltip : function(jq, fields) {
		return jq.each(function() {
			var panel = $(this).datagrid('getPanel');
			if (fields && typeof fields == 'object' && fields.sort) {
				$.each(fields, function() {
					var field = this;
					bindEvent($('.datagrid-body td[field=' + field + '] .datagrid-cell', panel));
				});
			} else {
				bindEvent($(".datagrid-body .datagrid-cell", panel));
			}
		});

		function bindEvent(jqs) {
			jqs.mouseover(function() {
				var content = $(this).text();
				if (content.replace(/(^\s*)|(\s*$)/g, '').length > 5) {
					$(this).tooltip({
						content : content,
						trackMouse : true,
						position : 'bottom',
						onHide : function() {
							$(this).tooltip('destroy');
						},
						onUpdate : function(p) {
							var tip = $(this).tooltip('tip');
							if (parseInt(tip.css('width')) > 500) {
								tip.css('width', 500);
							}
						}
					}).tooltip('show');
				}
			});
		}
	}
};
/**
 * Datagrid扩展方法tooltip 基于Easyui 1.3.3，可用于Easyui1.3.3+
 * 
 * 简单实现，如需高级功能，可以自由修改
 * 
 * 使用说明:
 * 
 * 在easyui.min.js之后导入本js
 * 
 * 代码案例:
 * 
 * $("#dg").datagrid('tooltip'); 所有列
 * 
 * $("#dg").datagrid('tooltip',['productid','listprice']); 指定列
 * 
 */
$.extend($.fn.datagrid.methods, gridTooltipOptions);

/**
 * Treegrid扩展方法tooltip 基于Easyui 1.3.3，可用于Easyui1.3.3+
 * 
 * 简单实现，如需高级功能，可以自由修改
 * 
 * 使用说明:
 * 
 * 在easyui.min.js之后导入本js
 * 
 * 代码案例:
 * 
 * $("#dg").treegrid('tooltip'); 所有列
 * 
 * $("#dg").treegrid('tooltip',['productid','listprice']); 指定列
 * 
 */
$.extend($.fn.treegrid.methods, gridTooltipOptions);

/**
 * 
 * @requires jQuery,EasyUI
 * 
 * 扩展validatebox，添加验证两次密码功能
 */
$.extend($.fn.validatebox.defaults.rules, {
	eqPwd : {
		validator : function(value, param) {
			return value == $(param[0]).val();
		},
		message : '密码不一致！'
	}
});

/**
 * 
 * @requires jQuery,EasyUI
 * 
 * 扩展tree，使其可以获取实心节点
 */
$.extend($.fn.tree.methods, {
	getCheckedExt : function(jq) {// 获取checked节点(包括实心)
		var checked = $(jq).tree("getChecked");
		var checkbox2 = $(jq).find("span.tree-checkbox2").parent();
		$.each(checkbox2, function() {
			var node = $.extend({}, $.data(this, "tree-node"), {
				target : this
			});
			checked.push(node);
		});
		return checked;
	},
	getSolidExt : function(jq) {// 获取实心节点
		var checked = [];
		var checkbox2 = $(jq).find("span.tree-checkbox2").parent();
		$.each(checkbox2, function() {
			var node = $.extend({}, $.data(this, "tree-node"), {
				target : this
			});
			checked.push(node);
		});
		return checked;
	}
});

/**
 * 
 * @requires jQuery,EasyUI
 * 
 * 扩展tree，使其支持平滑数据格式
 */
$.fn.tree.defaults.loadFilter = function(data, parent) {
	var opt = $(this).data().tree.options;
	var idFiled, textFiled, parentField;
	if (opt.parentField) {
		idFiled = opt.idFiled || 'id';
		textFiled = opt.textFiled || 'text';
		parentField = opt.parentField;
		var i, l, treeData = [], tmpMap = [];
		for (i = 0, l = data.length; i < l; i++) {
			tmpMap[data[i][idFiled]] = data[i];
		}
		for (i = 0, l = data.length; i < l; i++) {
			if (tmpMap[data[i][parentField]] && data[i][idFiled] != data[i][parentField]) {
				if (!tmpMap[data[i][parentField]]['children'])
					tmpMap[data[i][parentField]]['children'] = [];
				data[i]['text'] = data[i][textFiled];
				tmpMap[data[i][parentField]]['children'].push(data[i]);
			} else {
				data[i]['text'] = data[i][textFiled];
				treeData.push(data[i]);
			}
		}
		return treeData;
	}
	return data;
};

/**
 * 
 * @requires jQuery,EasyUI
 * 
 * 扩展treegrid，使其支持平滑数据格式
 */
$.fn.treegrid.defaults.loadFilter = function(data, parentId) {
	var opt = $(this).data().treegrid.options;
	var idFiled, textFiled, parentField;
	if (opt.parentField) {
		idFiled = opt.idFiled || 'id';
		textFiled = opt.textFiled || 'text';
		parentField = opt.parentField;
		var i, l, treeData = [], tmpMap = [];
		for (i = 0, l = data.length; i < l; i++) {
			tmpMap[data[i][idFiled]] = data[i];
		}
		for (i = 0, l = data.length; i < l; i++) {
			if (tmpMap[data[i][parentField]] && data[i][idFiled] != data[i][parentField]) {
				if (!tmpMap[data[i][parentField]]['children'])
					tmpMap[data[i][parentField]]['children'] = [];
				data[i]['text'] = data[i][textFiled];
				tmpMap[data[i][parentField]]['children'].push(data[i]);
			} else {
				data[i]['text'] = data[i][textFiled];
				treeData.push(data[i]);
			}
		}
		return treeData;
	}
	return data;
};

/**
 * 
 * @requires jQuery,EasyUI
 * 
 * 扩展combotree，使其支持平滑数据格式
 */
$.fn.combotree.defaults.loadFilter = $.fn.tree.defaults.loadFilter;

/**
 * 
 * @requires jQuery,EasyUI
 * 
 * 创建一个模式化的dialog
 * 
 * @returns $.modalDialog.handler 这个handler代表弹出的dialog句柄
 * 
 * @returns $.modalDialog.xxx 这个xxx是可以自己定义名称，主要用在弹窗关闭时，刷新某些对象的操作，可以将xxx这个对象预定义好
 */
$.modalDialog = function(options) {
	if ($.modalDialog.handler == undefined) {// 避免重复弹出
		var opts = $.extend({
			title : '',
			width : 840,
			height : 680,
			modal : true,
			onClose : function() {
				$.modalDialog.handler = undefined;
				$(this).dialog('destroy');
			},
			onOpen : function() {
				parent.$.messager.progress({
					title : '提示',
					text : '数据处理中，请稍后....'
				});
			}
		}, options);
		opts.modal = true;// 强制此dialog为模式化，无视传递过来的modal参数
		return $.modalDialog.handler = $('<div/>').dialog(opts);
	}
};

/**
 * my97 日期选择扩展
 */
(function($) {
	$.fn.my97 = function(options, params) {
		if (typeof options == "string") {
			return $.fn.my97.methods[options](this, params);
		}
		options = options || {};
		if (!WdatePicker) {
			alert("未引入My97js包！");
			return;
		}
		return this.each(function() {
			var data = $.data(this, "my97");
			var newOptions;
			if (data) {
				newOptions = $.extend(data.options, options);
				data.opts = newOptions;
			} else {
				newOptions = $.extend({}, $.fn.my97.defaults, $.fn.my97.parseOptions(this), options);
				$.data(this, "my97", {
					options : newOptions
				});
			}
			$(this).addClass('Wdate').click(function() {
				WdatePicker(newOptions);
			});
		});
	};
	$.fn.my97.methods = {
		setValue : function(target, params) {
			target.val(params);
		},
		getValue : function(target) {
			return target.val();
		},
		clearValue : function(target) {
			target.val('');
		}
	};
	$.fn.my97.parseOptions = function(target) {
		return $.extend({}, $.parser.parseOptions(target, [ "el", "vel", "weekMethod", "lang", "skin", "dateFmt", "realDateFmt", "realTimeFmt", "realFullFmt", "minDate", "maxDate", "startDate", {
			doubleCalendar : "boolean",
			enableKeyboard : "boolean",
			enableInputMask : "boolean",
			autoUpdateOnChanged : "boolean",
			firstDayOfWeek : "number",
			isShowWeek : "boolean",
			highLineWeekDay : "boolean",
			isShowClear : "boolean",
			isShowToday : "boolean",
			isShowOthers : "boolean",
			readOnly : "boolean",
			errDealMode : "boolean",
			autoPickDate : "boolean",
			qsEnabled : "boolean",
			autoShowQS : "boolean",
			opposite : "boolean"
		} ]));
	};
	$.fn.my97.defaults = {
		dateFmt : 'yyyy-MM-dd',
		isShowOthers : true,
		errDealMode : 1,
		skin : 'twoer'
	};

	$.parser.plugins.push('my97');
})(jQuery);
/**
 * my97 datagrid日期选择扩展
 */
$.extend($.fn.datagrid.defaults.editors, {
	my97 : {
		init : function(container, options) {
			var input = $('<input class="Wdate" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd\',readOnly:true});"  />').appendTo(container);
			return input;
		},
		getValue : function(target) {
			return $(target).val();
		},
		setValue : function(target, value) {
			$(target).val(value);
		},
		resize : function(target, width) {
			var input = $(target);
			if ($.boxModel == true) {
				input.width(width - (input.outerWidth() - input.width()));
			} else {
				input.width(width);
			}
		}
	}
});

// mask 遮罩
(function($) {
	function init(target, options) {
		var wrap = $(target);
		if ($("div.mask", wrap).length)
			wrap.mask("hide");

		wrap.attr("position", wrap.css("position"));
		wrap.attr("overflow", wrap.css("overflow"));
		wrap.css("position", "relative");
		wrap.css("overflow", "hidden");

		var maskCss = {
			position : "absolute",
			left : 0,
			top : 0,
			cursor : "wait",
			background : "#ccc",
			opacity : options.opacity,
			filter : "alpha(opacity=" + options.opacity * 100 + ")",
			display : "none"
		};

		var maskMsgCss = {
			position : "absolute",
			width : "auto",
			padding : "10px 20px",
			border : "2px solid #ccc",
			color : "white",
			cursor : "wait",
			display : "none",
			borderRadius : 5,
			background : "black",
			opacity : 0.6,
			filter : "alpha(opacity=60)"
		};
		var width, height, left, top;
		if (target == 'body') {
			width = Math.max(document.documentElement.clientWidth, document.body.clientWidth);
			height = Math.max(document.documentElement.clientHeight, document.body.clientHeight);
		} else {
			width = wrap.outerWidth() || "100%";
			height = wrap.outerHeight() || "100%";
		}
		$('<div class="mask"></div>').css($.extend({}, maskCss, {
			display : 'block',
			width : width,
			height : height,
			zIndex : options.zIndex
		})).appendTo(wrap);

		var maskm = $('<div class="mask-msg"></div>').html(options.maskMsg).appendTo(wrap).css(maskMsgCss);

		if (target == 'body') {
			left = (Math.max(document.documentElement.clientWidth, document.body.clientWidth) - $('div.mask-msg', wrap).outerWidth()) / 2;
			if (document.documentElement.clientHeight > document.body.clientHeight) {
				top = (Math.max(document.documentElement.clientHeight, document.body.clientHeight) - $('div.mask-msg', wrap).outerHeight()) / 2;
			} else {
				top = (Math.min(document.documentElement.clientHeight, document.body.clientHeight) - $('div.mask-msg', wrap).outerHeight()) / 2;
			}

		} else {
			left = (wrap.width() - $('div.mask-msg', wrap).outerWidth()) / 2;
			top = (wrap.height() - $('div.mask-msg', wrap).outerHeight()) / 2;
		}

		maskm.css({
			display : 'block',
			zIndex : options.zIndex + 1,
			left : left,
			top : top
		});

		setTimeout(function() {
			wrap.mask("hide");
		}, options.timeout);

		return wrap;
	}

	$.fn.mask = function(options) {
		if (typeof options == 'string') {
			return $.fn.mask.methods[options](this);
		}
		options = $.extend({}, $.fn.mask.defaults, options);
		return init(this, options);
	};
	$.mask = function(options) {
		if (typeof options == 'string') {
			return $.fn.mask.methods[options]("body");
		}
		options = $.extend({}, $.fn.mask.defaults, options);
		return init("body", options);
	};

	$.mask.hide = function() {
		$("body").mask("hide");
	};

	$.fn.mask.methods = {
		hide : function(jq) {
			return jq.each(function() {
				var wrap = $(this);
				$("div.mask", wrap).fadeOut(function() {
					$(this).remove();
				});
				$("div.mask-msg", wrap).fadeOut(function() {
					$(this).remove();
					wrap.css("position", wrap.attr("position"));
					wrap.css("overflow", wrap.attr("overflow"));
				});
			});
		}
	};

	$.fn.mask.defaults = {
		maskMsg : '\u52a0\u8f7d……',
		zIndex : 100000,
		timeout : 30000,
		opacity : 0.6
	};
})(jQuery);

/**
 * datagrid 没有数据自定义显示内容
 * 
 * @eg: $('#dg').datagrid({ view: myview, emptyMsg: 'no records found' });
 */
var myview = $.extend({}, $.fn.datagrid.defaults.view, {
	onAfterRender : function(target) {
		$.fn.datagrid.defaults.view.onAfterRender.call(this, target);
		var opts = $(target).datagrid('options');
		var vc = $(target).datagrid('getPanel').children('div.datagrid-view');
		vc.children('div.datagrid-empty').remove();
		if (!$(target).datagrid('getRows').length) {
			var d = $('<div class="datagrid-empty"></div>').html(opts.emptyMsg || 'no records').appendTo(vc);
			d.css({
				position : 'absolute',
				left : 0,
				top : 50,
				width : '100%',
				textAlign : 'center'
			});
		}
	}
});

/**
 * datagrid 上移下移
 * 
 * @index datagrid 列索引
 * @type 移动类型 up down
 * @gridname datagrid id
 * 
 * @return true更新过 false
 */

function datagridUpDown(index, type, gridname) {

	if ("up" == type) {

		if (index != 0) {

			var toup = $('#' + gridname).datagrid('getData').rows[index];

			var todown = $('#' + gridname).datagrid('getData').rows[index - 1];

			$('#' + gridname).datagrid('getData').rows[index] = todown;

			$('#' + gridname).datagrid('getData').rows[index - 1] = toup;

			$('#' + gridname).datagrid('refreshRow', index);

			$('#' + gridname).datagrid('refreshRow', index - 1);

			$('#' + gridname).datagrid('selectRow', index - 1);

		}

	} else if ("down" == type) {

		var rows = $('#' + gridname).datagrid('getRows').length;

		if (index != rows - 1) {

			var todown = $('#' + gridname).datagrid('getData').rows[index];

			var toup = $('#' + gridname).datagrid('getData').rows[index + 1];

			$('#' + gridname).datagrid('getData').rows[index + 1] = todown;

			$('#' + gridname).datagrid('getData').rows[index] = toup;

			$('#' + gridname).datagrid('refreshRow', index);

			$('#' + gridname).datagrid('refreshRow', index + 1);

			$('#' + gridname).datagrid('selectRow', index + 1);

		}

	}

}
/**
 * datagrid 支持外键查询结果显示
 * 
 */
$.extend($.fn.datagrid.defaults.view, {
	renderRow : function(target, fields, frozen, rowIndex, rowData) {
		var opts = $.data(target, 'datagrid').options;

		var cc = [];
		if (frozen && opts.rownumbers) {
			var rownumber = rowIndex + 1;
			if (opts.pagination) {
				rownumber += (opts.pageNumber - 1) * opts.pageSize;
			}
			cc.push('<td class="datagrid-td-rownumber"><div class="datagrid-cell-rownumber">' + rownumber + '</div></td>');
		}
		for ( var i = 0; i < fields.length; i++) {
			var field = fields[i];
			var col = $(target).datagrid('getColumnOption', field);
			if (col) {
				// start 处理多级数据
				var fieldSp = field.split(".");
				var dta = rowData[fieldSp[0]];
				for ( var j = 1; j < fieldSp.length; j++) {
					dta = dta[fieldSp[j]];
				}
				// end 处理多级数据
				// get the cell style attribute
				var styleValue = col.styler ? (col.styler(dta, rowData, rowIndex) || '') : '';
				var style = col.hidden ? 'style="display:none;' + styleValue + '"' : (styleValue ? 'style="' + styleValue + '"' : '');

				cc.push('<td field="' + field + '" ' + style + '>');

				if (col.checkbox) {
					var style = '';
				} else {
					var style = '';
					// var style = 'width:' + (col.boxWidth) + 'px;';
					style += 'text-align:' + (col.align || 'left') + ';';
					if (!opts.nowrap) {
						style += 'white-space:normal;height:auto;';
					} else if (opts.autoRowHeight) {
						style += 'height:auto;';
					}
				}

				cc.push('<div style="' + style + '" ');
				if (col.checkbox) {
					cc.push('class="datagrid-cell-check ');
				} else {
					cc.push('class="datagrid-cell ' + col.cellClass);
				}
				cc.push('">');

				if (col.checkbox) {
					cc.push('<input type="checkbox" name="' + field + '" value="' + (dta != undefined ? dta : '') + '"/>');
				} else if (col.formatter) {
					cc.push(col.formatter(dta, rowData, rowIndex));
				} else {
					cc.push(dta);
				}

				cc.push('</div>');
				cc.push('</td>');
			}
		}
		return cc.join('');
	}
});
