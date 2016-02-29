<%@ page language="java" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>我提交的需求</title>
       
    <link rel="stylesheet" type="text/css" href="ext3.4/resources/css/ext-all.css"/>
    <link rel="stylesheet" type="text/css" href="ext3.4/resources/css/xtheme-gray.css"/>
    <link rel="stylesheet" type="text/css" href="ext3.4/resources/css/mycss.css"/>
    <link rel="stylesheet" type="text/css" href="ext3.4/expand/ffWordBug/ffwordbug.css"/>
	<link rel="stylesheet" type="text/css" href="ext3.4/expand/friendAlert/friendAlert.css"/>
	<script type="text/javascript">
		// 二次传递的参数
		var params=<%=request.getAttribute("params")%>;
		var queryBean='<%=request.getAttribute("params")%>';
		var columns = <%=request.getAttribute("columns")%>;
		var userQuery = <%=request.getAttribute("userQuery")%>;
	</script>
	<script type="text/javascript" src="ext3.4/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="ext3.4/ext-all.js"></script>
    <script type="text/javascript" src="ext3.4/expand/override/override.js"></script>
    <script type="text/javascript" src="ext3.4/expand/friendAlert/friendAlert.js"></script>
    <script type="text/javascript" src="web/common/form/ExtFormUtil.js">></script>
    <script type="text/javascript" src="web/query/pm/result.js"></script>
  </head>
  
  <body>
  	<iframe style="display: none;" name="exportIframe"></iframe> 
  </body>
</html>
