<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <script type="text/javascript">
    	var basePath = '<%=basePath%>';
     	window["contextPath"] = "${pageContext.request.contextPath}";
		window["sessionId"] = "${pageContext.session.id}";
		window["sessionName"] = "jsessionId";
    </script>
    <title>交换机bug系统</title>
	<link rel="stylesheet" type="text/css" href="ext3.4/resources/css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="ext3.4/expand/ffWordBug/ffwordbug.css" />
	<link rel="stylesheet" type="text/css" href="ext3.4/expand/friendAlert/friendAlert.css"/>
	<link rel="stylesheet" type="text/css" href="resource/css/common.css" />
	<script type="text/javascript">
	  	var bugInfo = null;
	  	var userInfo = <%=request.getAttribute("userInfo")%>;
  	</script>
	<script type="text/javascript" src="ext3.4/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="ext3.4/ext-all-debug.js"></script>
	<script type="text/javascript" src="ext3.4/expand/friendAlert/friendAlert.js"></script>
	<script type="text/javascript" src="ext3.4/expand/override/override.js">></script>
	<script type="text/javascript" src="ext3.4/expand/htmlEditorImgUpload/htmlEditorImgUpload.js">></script>
	<script type="text/javascript" src="ext3.4/expand/swfupload/uploaderPanel.js">></script>
	<script type="text/javascript" src="ext3.4/expand/comboTree/ComboTree.js"></script>
	<script type="text/javascript" src="ext3.4/expand/swfupload/swfupload.js"></script>
	<script type="text/javascript" src="ext3.4/expand/hotKey/key.js"></script>
	
	<script type="text/javascript" src="web/common/form/ExtFormUtil.js">></script>
	<script type="text/javascript" src="web/bugInfo/formComponent/bugStore.js">></script>
	<script type="text/javascript" src="web/bugInfo/formComponent/bugCmp.js">></script>
	<script type="text/javascript" src="web/bugInfo/collect/addBugCmp.js">></script>
	<script type="text/javascript" src="web/bugInfo/collect/addBugInit.js">></script>
	<script type="text/javascript" src="web/bugInfo/collect/addBug.js">></script>
  </head>
  <body>
  		<img id="showImg"  src="servlet/downloadAccessory?type=imgFileOS&systemFileName" width="100%" height="100%" style="position:absolute;left:0;top:0;background: gray;"/>
  		<div id="addBug" align="center"></div>
  </body>
</html>
