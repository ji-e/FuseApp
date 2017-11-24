<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="EUC-KR"%>
<%@ page import="java.sql.*"%>
<%@ page import="org.json.simple.JSONObject"%>
<%@ page import="org.json.simple.JSONArray"%>

<%
	request.setCharacterEncoding("UTF-8");

	String MeetingName = request.getParameter("MeetingName");
	String MeetingURI = request.getParameter("MeetingURI");
	String CallID = request.getParameter("CallID");
	int MeetingId=0;
	//System.out.println(MeetingName);

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
		sql = "Select * From meeting";
		stmt = conn.createStatement();
		rs = stmt.executeQuery(sql);
		while (rs.next()) {
			MeetingId=rs.getInt("MeetingId");
		}
		MeetingId++;
		System.out.println(MeetingId);
		
		pstmt = conn.prepareStatement("Insert into meeting values(?,?,?,?)");
		pstmt.setInt(1, MeetingId);
		pstmt.setString(2, MeetingName);
		pstmt.setString(3, MeetingURI);
		pstmt.setString(4, CallID);
		int result = pstmt.executeUpdate();
		
		sql = "Select * From meeting";
		stmt = conn.createStatement();
		rs = stmt.executeQuery(sql);

		JSONArray jsonArray = new JSONArray();
		while (rs.next()) {
			//System.out.println("select name : " + rs.getString("Name"));
			JSONObject jsonMain = new JSONObject();
			jsonMain.put("MeetingId", rs.getString("MeetingId"));
			jsonMain.put("MeetingName", rs.getString("MeetingName"));
			jsonMain.put("MeetingURI", rs.getString("MeetingURI"));
			jsonMain.put("CallID", rs.getString("CallID"));

			jsonArray.add(jsonMain);

		}

		response.setContentType("text/json");
		response.getWriter().println(jsonArray);
		response.getWriter().close();

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