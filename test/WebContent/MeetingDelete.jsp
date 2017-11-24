<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="EUC-KR"%>
<%@ page import="java.sql.*"%>
<%@ page import="org.json.simple.JSONObject"%>
<%@ page import="org.json.simple.JSONArray"%>

<%
	request.setCharacterEncoding("UTF-8");

	String MeetingId = request.getParameter("MeetingId");
	//String EquipmentId = request.getParameter("EquipmentId");
	System.out.println(MeetingId);
	//System.out.println(EquipmentId);
  	Statement stmt = null;
	ResultSet rs = null;
	Connection conn = null;
	PreparedStatement pstmt = null;
	 try {
		//String url = "jdbc:mysql://demo.riv-tech.co.kr:4406/test_jieun";
		//String id = "jieun";
		//String pw = "1q2w3e";
		
		String url = "jdbc:mysql://localhost:3306/new_schema";
		String id = "root";
		String pw = "2420";

		Class.forName("com.mysql.jdbc.Driver");
		conn = DriverManager.getConnection(url, id, pw);
		String sql;
		//sql = "Select * From meeting";
		stmt = conn.createStatement();
		//rs = stmt.executeQuery(sql);
		
		
		pstmt = conn.prepareStatement("Delete from meeting where MeetingId=?");
		pstmt.setString(1, MeetingId);

		int result = pstmt.executeUpdate();

	} catch (Exception e) {

		e.printStackTrace();

	} finally {
		try {
			if (conn != null)
				conn.close();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		} 
	}  
%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>

</body>
</html>