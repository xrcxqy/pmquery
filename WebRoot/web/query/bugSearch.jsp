<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>交换机bug系统</title>
	<link rel="stylesheet" type="text/css" href="ext3.4/resources/css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="ext3.4/expand/ffWordBug/ffwordbug.css" />
	<link rel="stylesheet" type="text/css" href="ext3.4/expand/lovecombo/lovcombo.css"/>
	<link rel="stylesheet" type="text/css" href="resource/css/common.css" />
	<link rel="stylesheet" type="text/css" href="resource/css/search.css" />
	<script type="text/javascript">
	  	var bugInfo = null;
  	</script>
	<script type="text/javascript" src="ext3.4/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="ext3.4/ext-all.js"></script>
	<script type="text/javascript" src="ext3.4/expand/override/override.js"></script>
	<script type="text/javascript" src="ext3.4/expand/lovecombo/lovcombo.js"></script>
	<script type="text/javascript" src="ext3.4/expand/friendAlert/friendAlert.js"></script>
	<script type="text/javascript" src="web/common/form/ExtFormUtil.js">></script>
	<script type="text/javascript" src="web/bugInfo/formComponent/bugStore.js">></script>
	<script type="text/javascript" src="ext3.4/expand/comboTree/ComboTree.js"></script>
	<script type="text/javascript" src="web/query/dnd_grid_to_grid.js"></script>
	<script type="text/javascript" src="web/query/bugSearchOP.js"></script>
	<script type="text/javascript" src="web/query/bugSearchCmp.js"></script>
	<script type="text/javascript" src="web/query/bugSearch.js"></script>
  </head>
  <body>
  	<div id="search"></div>
  </body>
</html>
