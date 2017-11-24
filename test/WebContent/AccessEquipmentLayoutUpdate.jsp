<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ page import="java.sql.*"%>
<%@ page import="org.json.simple.JSONObject"%>
<%@ page import="org.json.simple.JSONArray"%>

<%
	request.setCharacterEncoding("UTF-8");

	//String MeetingId = request.getParameter("MeetingId");
	String EquipmentId = request.getParameter("EquipmentId");
	String EquipmentLayout = request.getParameter("EquipmentLayout");
	System.out.println(EquipmentId);
	System.out.println(EquipmentLayout);

	Connection conn = null;
	Statement stmt = null;
	ResultSet rs = null;
	PreparedStatement pstmt = null;
	try {
		String url = "jdbc:mysql://localhost:3306/new_schema";
		String id = "root";
		String pw = "2420";
		Class.forName("com.mysql.jdbc.Driver");
		conn = DriverManager.getConnection(url, id, pw);

		String sql;

		pstmt = conn.prepareStatement("Update equipment set EquipmentLayout=? where EquipmentId=?");
		pstmt.setString(1, EquipmentLayout);
		pstmt.setString(2, EquipmentId);
		int result = pstmt.executeUpdate();

	} catch (Exception e) {

		e.printStackTrace();

	} finally {
		try {
			if (conn != null)
				conn.close();
			if (stmt != null)
				stmt.close();
			if (rs != null)
				rs.close();
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getMessage());
		}
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>db</title>
</head>
<body>
</body>
</html>