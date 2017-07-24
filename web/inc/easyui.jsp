<%@ page pageEncoding="UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
    application.setAttribute("basePath", basePath);
%>
<link rel="stylesheet" href="${basePath}jslib/jquery-easyui/themes/bootstrap/easyui.css" type="text/css"></link>
<link rel="stylesheet" href="${basePath}icons/prodouct/pdt-icons.css" type="text/css"></link>
<link rel="stylesheet" href="${basePath}jslib/buttons/font-awesome.min.css" type="text/css"></link>
<link rel="stylesheet" href="${basePath}jslib/buttons/button.css" type="text/css"></link>
<link rel="stylesheet" href="${basePath}icons/bootstrap-icon/bootstrap-icon.css" type="text/css"></link>
<link rel="stylesheet" href="${basePath}jslib/bootstrap/css/fuelux.min.css"></link>
<script type="text/javascript" src="${basePath}jslib/jquery.min.js"></script>
<script type="text/javascript" src="${basePath}jslib/jquery-easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${basePath}jslib/jquery-easyui/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="${basePath}jslib/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="${basePath}jslib/extEasyUI.js"></script>
<script type="text/javascript" src="${basePath}jslib/extJquery.js"></script>
<script type="text/javascript" src="${basePath}jslib/printArea.js"></script>
<script type="text/javascript" src="${basePath}jslib/CaseConversion.js"></script>
<script type="text/javascript" src="${basePath}jslib/date.ext.js"></script>
<script type="text/javascript" src="${basePath}jslib/bootstrap/lib/wizard.js"></script>
