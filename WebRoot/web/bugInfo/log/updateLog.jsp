<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <style>
		.aMark{
			font-size: 15;
			text-decoration:none;
			color: #ADADAD;
		}
	</style>
  </head>
  <body>
  	<div >
  		<div  style="margin-top: 10px;">
  			<font size="4" color="#81C0C0">1. 新增防覆盖机制</font><br/>
  		</div>
  		
  		<div style="margin-left: 20px;">
  			<div style="margin-top: 10px;">
  				<a class="aMark" target="_Blank" href="help/html/info/show.jsp#infoShowLastUpdatedate">新增防止多人修改同一个BUG信息时候数据覆盖</a>
  			</div>
  		</div>
  		
  		<div  style="margin-top: 10px;">
  			<font size="4" color="#81C0C0">2. 优化附件功能</font><br/>
  		</div>
  		
  		<div style="margin-left: 20px;">
  			<div style="margin-top: 10px;">
  				<a class="aMark" target="_Blank" href="help/html/shared/controlsUse.jsp#sharedControlsUselookOnLine">①支持文本附件在线查看功能</a>
  			</div>
  			<div style="margin-top: 10px;">
  				<a class="aMark" target="_Blank" href="help/html/shared/controlsUse.jsp#sharedControlsUselookOnLineImg">②支持图片附件可缩放查看功能</a>
  			</div>
  			<div style="margin-top: 10px;">
  				<a class="aMark" target="_Blank" href="servlet/viewBugInfo?type=showBugInfo&bugId=222299">体验Demo</a>
  			</div>
  		</div>
  	</div>
  </body>
</html>
