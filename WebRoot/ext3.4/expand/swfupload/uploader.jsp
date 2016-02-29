<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="org.json.JSONObject"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

String bugInfo = null;
if(((JSONObject)request.getAttribute("bugInfo")) != null){
		bugInfo = ((JSONObject)request.getAttribute("bugInfo")).toString();
}


%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">  
    <title>upload test</title>
	<link rel="stylesheet" type="text/css" href="ext3.4/resources/css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="ext3.4/expand/ffWordBug/ffwordbug.css" />
	<link rel="stylesheet" type="text/css" href="resource/css/common.css" />
	<link rel="stylesheet" type="text/css" href="ext3.4/expand/friendAlert/friendAlert.css"/>
	<link rel="stylesheet" type="text/css" href="resource/css/buginfo.css" />
	
	<script type="text/javascript" src="ext3.4/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="ext3.4/ext-all.js"></script>
	<script type="text/javascript" src="ext3.4/expand/friendAlert/friendAlert.js"></script>
	<script type="text/javascript" src="ext3.4/expand/override/override.js">></script>

	<script type="text/javascript" src="ext3.4/expand/swfupload/swfupload.js"></script>
	<script type="text/javascript" src="ext3.4/expand/swfupload/uploaderPanel.js"></script>
  </head>
  
  <body>
  </body>
</html>
