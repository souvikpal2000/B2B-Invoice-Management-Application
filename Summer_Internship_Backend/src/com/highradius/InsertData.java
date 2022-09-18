package com.highradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
  
import com.highradius.connection;
  
@WebServlet("/insertdata")
public class InsertData extends HttpServlet {
    private static final long serialVersionUID = 1L;
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        try {
            Connection con = connection.initializeDatabase();
  
            
            PreparedStatement st = con.prepareStatement("insert into file1(name_customer,cust_number,invoice_id,total_open_amount,due_in_date,bucket) values(?,?,?,?,?,?)");

            st.setString(1, request.getParameter("customerName"));
            st.setString(2, request.getParameter("customerNo"));
            st.setFloat(3, Float.parseFloat(request.getParameter("invoiceNo")));
            st.setFloat(4, Float.parseFloat(request.getParameter("amount")));
            st.setString(5, request.getParameter("dueDate"));
            st.setString(6, request.getParameter("notes"));
            
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
