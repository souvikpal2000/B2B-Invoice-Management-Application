package com.highradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/edit")
public class UpdateData extends HttpServlet {
	 private static final long serialVersionUID = 1L;
	    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	    {
	    	String id = request.getParameter("id");
	    	System.out.println(id);
	        try {
	            Connection con = connection.initializeDatabase();
	  
	            
	            PreparedStatement st = con.prepareStatement("update file1 set total_open_amount=?, bucket=? where invoice_id=?");
	            
	            float a = Float.parseFloat(request.getParameter("amtEdit"));
	            String b = request.getParameter("noteEdit");
	            st.setFloat(1, a);
	            st.setString(2, b);
	            st.setString(3, id);
	            
	            st.executeUpdate();

	            st.close();
	            con.close();

	            response.sendRedirect("./index.jsp");
	        }
	        catch (Exception e) {
	            e.printStackTrace();
	        }
	    }
}
