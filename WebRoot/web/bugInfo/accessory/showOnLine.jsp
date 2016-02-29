<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
  	<link rel="shortcut icon" href="resource/img/main/BUGIcon.ico">
    <base href="<%=basePath%>">
    <title><s:property value="#request.fileName" /></title>
    <script type="text/javascript" src="ext3.4/expand/syntaxhighlighter/src/shCore.js"></script>
    <script type="text/javascript" src="ext3.4/expand/syntaxhighlighter/scripts/shBrushBash.js"></script>
	<script type="text/javascript" src="ext3.4/expand/syntaxhighlighter/scripts/shBrushCpp.js"></script>
	<script type="text/javascript" src="ext3.4/expand/syntaxhighlighter/scripts/shBrushCSharp.js"></script>
	<script type="text/javascript" src="ext3.4/expand/syntaxhighlighter/scripts/shBrushCss.js"></script>
	<script type="text/javascript" src="ext3.4/expand/syntaxhighlighter/scripts/shBrushDelphi.js"></script>
	<script type="text/javascript" src="ext3.4/expand/syntaxhighlighter/scripts/shBrushDiff.js"></script>
	<script type="text/javascript" src="ext3.4/expand/syntaxhighlighter/scripts/shBrushGroovy.js"></script>
	<script type="text/javascript" src="ext3.4/expand/syntaxhighlighter/scripts/shBrushJava.js"></script>
	<script type="text/javascript" src="ext3.4/expand/syntaxhighlighter/scripts/shBrushJScript.js"></script>
	<script type="text/javascript" src="ext3.4/expand/syntaxhighlighter/scripts/shBrushPhp.js"></script>
	<script type="text/javascript" src="ext3.4/expand/syntaxhighlighter/scripts/shBrushPlain.js"></script>
	<script type="text/javascript" src="ext3.4/expand/syntaxhighlighter/scripts/shBrushPython.js"></script>
	<script type="text/javascript" src="ext3.4/expand/syntaxhighlighter/scripts/shBrushRuby.js"></script>
	<script type="text/javascript" src="ext3.4/expand/syntaxhighlighter/scripts/shBrushScala.js"></script>
	<script type="text/javascript" src="ext3.4/expand/syntaxhighlighter/scripts/shBrushSql.js"></script>
	<script type="text/javascript" src="ext3.4/expand/syntaxhighlighter/scripts/shBrushVb.js"></script>
	<script type="text/javascript" src="ext3.4/expand/syntaxhighlighter/scripts/shBrushXml.js"></script>
	<link type="text/css" rel="stylesheet" href="ext3.4/expand/syntaxhighlighter/styles/shCore.css"/>
	<link type="text/css" rel="stylesheet" href="ext3.4/expand/syntaxhighlighter/styles/shThemeDefault.css"/>
	<script type="text/javascript">
		SyntaxHighlighter.config.clipboardSwf = 'ext3.4/expand/syntaxhighlighter/scripts/clipboard.swf';
		SyntaxHighlighter.all();
		function reloadByEncode(code){
			var sFile = document.getElementById("systemFileName").value;
			location.href = "servlet/downloadAccessory?type=showOnLine&systemFileName=" + sFile + "&encode="+code;
		}
	</script>
  </head>
  <body>
  		<div>
  			<font style="size: 30px;color: gray;margin-left: 50px;">文件名称:</font>
  			<input type="hidden" value='<s:property value="#request.systemFileName"/>' id="systemFileName">
  			<a href='servlet/downloadAccessory?systemFileName=<s:property value="#request.systemFileName"/>' target='_blank'><s:property value="#request.fileName" /></a>
  			
  			<font style="size: 30px;color: gray;margin-left: 50px;">当前解码方式:</font>
  			<font style="size: 30px;color: blue;"><s:property value="#request.encode"/></font>
  			<font style="size: 30px;color: gray;margin-left: 50px;">如有乱码,请点击对应文本编码方式查看</font>
  			<button onclick="reloadByEncode('UTF-8')">UTF-8</button>
  			<button onclick="reloadByEncode('GBK')">GBK</button>
  			<button onclick="reloadByEncode('GB2312')">GB2312</button>
  		</div>
  		<s:property value="#request.preMark" escape="false"/> 
  		<s:if test="#request.escape">
  			<s:property value="#request.TxtInfo" escape="true"/> 
		</s:if>
		<s:else>
			<s:property value="#request.TxtInfo" escape="false"/> 
		</s:else>
  		<s:property value="#request.preMarkEnd" escape="false"/> 
  </body>
</html>
