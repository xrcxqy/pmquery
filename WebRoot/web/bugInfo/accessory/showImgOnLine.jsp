<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String fileName = request.getParameter("systemFileName");
String imgSrc = "servlet/downloadAccessory?type=imgFileOS&systemFileName=" + fileName;
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title><s:property value="#request.fileName" /></title>
  </head>
  <body>
  		<img src="<%=imgSrc%>">
  </body>
</html>
