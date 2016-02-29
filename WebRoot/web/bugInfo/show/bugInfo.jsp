<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="org.json.JSONObject"%>
<%@page import="com.ruijie.util.DevelopConfig"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

String bugInfo = null;
if(((JSONObject)request.getAttribute("bugInfo")) != null){
		bugInfo = ((JSONObject)request.getAttribute("bugInfo")).toString();
}

String user = ((JSONObject)request.getAttribute("user")).toString();
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <!-- 360浏览器使用极速模式 -->
    <meta name="renderer" content="webkit">
    
    <link rel="shortcut icon" href="resource/img/main/BUGIcon.ico">
    <script type="text/javascript">
    	var basePath = '<%=basePath%>';
     	window["contextPath"] = "${pageContext.request.contextPath}";
		window["sessionId"] = "${pageContext.session.id}";
		window["sessionName"] = "jsessionId";
    </script>
    <title>BUGID:<s:property value="bugId" /></title>
	<link rel="stylesheet" type="text/css" href="ext3.4/resources/css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="ext3.4/expand/ffWordBug/ffwordbug.css" />
	<link rel="stylesheet" type="text/css" href="ext3.4/expand/lovecombo/lovcombo.css"/>
	<link rel="stylesheet" type="text/css" href="resource/css/common.css" />
	<link rel="stylesheet" type="text/css" href="ext3.4/expand/friendAlert/friendAlert.css"/>
	<link rel="stylesheet" type="text/css" href="resource/css/buginfo.css" />
	
	
	<script type="text/javascript">
	  	var bugInfo = <%=bugInfo%>;
	  	var user = <%=user%>;
	  	var oldBugSystemUrl = '<%=DevelopConfig.old_bugSystem_url%>';
	  	var setting = <%=request.getAttribute("userSetting")%>;
  	</script>
	
	<script type="text/javascript" src="ext3.4/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="ext3.4/ext-all.js"></script>
	<script type="text/javascript" src="ext3.4/expand/friendAlert/friendAlert.js"></script>
	<script type="text/javascript" src="ext3.4/expand/override/override.js">></script>
	<script type="text/javascript" src="ext3.4/expand/htmlEditorImgUpload/htmlEditorImgUpload.js">></script>
	<script type="text/javascript" src="ext3.4/expand/lovecombo/lovcombo.js"></script>
	<script type="text/javascript" src="ext3.4/expand/hotKey/key.js"></script>
	<script type="text/javascript" src="ext3.4/expand/tip/FieldAjaxTip.js"></script>
	
	<script type="text/javascript" src="ext3.4/expand/swfupload/uploaderPanel.js"></script>
	<script type="text/javascript" src="ext3.4/expand/swfupload/swfupload.js"></script>
	<script type="text/javascript" src="ext3.4/expand/comboTree/ComboTree.js"></script>
	<script type="text/javascript" src="ext3.4/expand/zeroClipboard/ZeroClipboard.js"></script>
	<script type="text/javascript" src="web/common/form/ExtFormUtil.js">></script>
	<script type="text/javascript" src="web/bugInfo/formComponent/bugStore.js">></script>
	<script type="text/javascript" src="web/bugInfo/formComponent/bugCmp.js">></script>
	<script type="text/javascript" src="web/bugInfo/show/bugInfoCmp.js">></script>
	<script type="text/javascript" src="web/bugInfo/show/bugInfo.js">></script>
	<script type="text/javascript" src="web/bugInfo/show/bugInfoInit.js">></script>
	<script type="text/javascript" src="web/bugInfo/show/bugInfoToolBar.js">></script>
	<script type="text/javascript" src="web/bugInfo/show/floatButton.js">></script>
  </head>
  <body>
  		<img id="showImg"  src="resource/img/buginfo/transparent.png"  style="position:absolute;left:0;top:0;background: white;"/>
	  	<div id="floatDiv" align="center" style="position: absolute; buttom: 0px; right: 15px;">
	  		<div><img src="resource/img/buginfo/scrollTop.PNG"  style="cursor: pointer;" title="返回顶部" onclick="goTop()" /></div>
			<div><img src="resource/img/buginfo/scrollDown.PNG" style="cursor: pointer;" title="到底部,查看最新纪录" onclick="goBottom()" /></div>
		</div>
  </body>
</html>
