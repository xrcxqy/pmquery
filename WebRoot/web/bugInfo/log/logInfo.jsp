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
    <link rel="stylesheet" type="text/css" href="resource/css/buginfo.css" />
    <script type="text/javascript" src="ext3.4/expand/hotKey/key.js"></script>
    <script type="text/javascript" src="web/bugInfo/log/logInfo.js">></script>
  </head>
  <body>
   	<div id="logInfo" align="center" >
  		<div align="left" id="lookLastLog" ></div>
		<table class="loginfoTable">
		    <!-- 显示最新数据 -->
			<s:if test="#request.showLatest">
				<tr class="loginfoTableLogTitle">
					<td >
						处理人:
					</td>
					<td>
						<s:property value="#request.latestLog.submiter.userName" /> 
					</td>
					<td>
						处理时间: 
					</td>
					<td >
						<s:date name="#request.latestLog.submitDate" format="yyyy-MM-dd HH:mm:ss" />
					</td>
				</tr>
				<tr class="loginfoTableLogTitle">
					<td>
						日志: 
					</td>
					<td colspan="3">
						<s:property value="@com.ruijie.util.StringUtil@textToHtml(#request.latestLog.logInfo)" escape="false" /> 
					</td>
				</tr>
			</s:if>
		
			
			<tr class="loginfoTableUserInfo">
				<td width="110">
					处理人:
				</td>
				<td>
					<s:property value="bugInfo.submiter" /> 
				</td>
				<td width="100">
					处理时间: 
				</td>
				<td>
					<s:date name="bugInfo.submitDate" format="yyyy-MM-dd HH:mm:ss" />
				</td>
			</tr>
			<tr class="loginfoTableLogMsg">
				<td>
					测试拓扑:
				</td>
				<td colspan="3">
					<s:property value="@com.ruijie.util.StringUtil@textToHtml(bugInfo.testTopology)" escape="false" /> 
				</td>
			</tr>
			<tr class="loginfoTableLogMsg">
				<td>
					拓扑描述:
				</td>
				<td colspan="3">
					<s:property value="@com.ruijie.util.StringUtil@textToHtml(bugInfo.topologyDescription)" escape="false" /> 
				</td>
			</tr>
			<tr class="loginfoTableLogMsg">
				<td>
					描述信息:
				</td>
				<td colspan="3">
					<s:property value="@com.ruijie.util.StringUtil@textToHtml(bugInfo.bugDescription)" escape="false" /> 
				</td>
			</tr>
			
			<tr class="loginfoTableLogMsg">
				<td>
					Debug信息:
				</td>
				<td colspan="3">
					<s:property value="@com.ruijie.util.StringUtil@textToHtml(bugInfo.bugDebugMessage)" escape="false" /> 
				</td>
			</tr>
			<tr class="loginfoTableLogMsg">
				<td>
					版本信息:
				</td>
				<td colspan="3">
					<s:property value="@com.ruijie.util.StringUtil@textToHtml(bugInfo.bugVersionMessage)" escape="false" /> 
				</td>
			</tr>
			<tr class="loginfoTableLogMsg">
				<td>
					测试程序:
				</td>
				<td colspan="3">
					<s:property value="@com.ruijie.util.StringUtil@textToHtml(bugInfo.testProgram)" escape="false" />
				</td>
			</tr>
			
			<tr class="loginfoTableLogMsg">
				<td>
					被测设备配置:
				</td>
				<td colspan="3">
					<s:property value="@com.ruijie.util.StringUtil@textToHtml(bugInfo.deviceUnderTestConfig)" escape="false" />
				</td>
			</tr>
			<tr class="loginfoTableLogMsg">
				<td>
					定位信息:
				</td>
				<td colspan="3">
					<s:property value="@com.ruijie.util.StringUtil@textToHtml(bugInfo.locate)" escape="false" />
				</td>
			</tr>
			<tr class="loginfoTableLogMsg">
				<td>
					资源耗时:
				</td>
				<td colspan="3">
					<s:property value="bugInfo.resumtime" escape="false" /> 分钟
				</td>
			</tr>
			<tr class="loginfoTableLogMsg">
				<td>
					附注：
				</td>
				<td colspan="3">
					<s:property value="@com.ruijie.util.StringUtil@textToHtml(bugInfo.suggestionsAndViews)" escape="false" />
				</td>
			</tr>
			<!-- 遍历其他日志信息 -->
			<s:iterator value="#request.logList" id="item">
				<tr class="loginfoTableUserInfo">
					<td >
						处理人:
					</td>
					<td>
						<s:property value="submiter.userName" /> 
					</td>
					<td>
						处理时间: 
					</td>
					<td>
						<s:date name="submitDate" format="yyyy-MM-dd HH:mm:ss" />
					</td>
				</tr>
				<tr class="loginfoTableLogMsg">
					<td>
						日志: 
					</td>
					<td colspan="3">
						<s:property value="@com.ruijie.util.StringUtil@textToHtml(logInfo)" escape="false" /> 
					</td>
				</tr>
			</s:iterator> 
		</table>
	</div>
  </body>
</html>
