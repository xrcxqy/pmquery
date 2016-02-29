<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String user = (String)request.getAttribute("user");
String bugId = request.getParameter("bugId");
String title = "手机维保查询";
if(bugId != null){
	title += " [" + bugId+ "]";
}
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title><%=title%></title>
    <!-- 360浏览器使用极速模式 -->
    <meta name="renderer" content="webkit">
    
	<link rel="stylesheet" type="text/css" href="ext3.4/resources/css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="ext3.4/expand/ffWordBug/ffwordbug.css" />
	<link rel="stylesheet" type="text/css" href="resource/css/index.css" />
	<link rel="shortcut icon" href="resource/img/main/BUGIcon.ico">
	<script type="text/javascript">
		var user='<%=user%>';
    	var bugId = '<%=bugId%>';
    	var setting = <%=request.getAttribute("userSetting")%>;
    	var helpLink = '<%=request.getAttribute("helpLink")%>';
  	</script>
  	
	<script type="text/javascript" src="ext3.4/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="ext3.4/ext-all.js"></script>
	<script type="text/javascript" src="ext3.4/expand/tip/FieldTip.js"></script>
	<script type="text/javascript" src="web/main/index.js"></script>
  </head>
  <body>
  </body>
</html>
