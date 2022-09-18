<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>

<%
	String driverName = "com.mysql.cj.jdbc.Driver";
	String connectionUrl = "jdbc:mysql://localhost:3306/";
	String dbName = "internship";
	String userId = "root";
	String password = "";
	
	try {
		Class.forName(driverName);
	} 
	catch (ClassNotFoundException e) {
		e.printStackTrace();
	}
	
	/*Connection connection = null;
	Statement statement = null;
	ResultSet resultSet = null;*/
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Home</title>
<script src="https://kit.fontawesome.com/68b0726c11.js" crossorigin="anonymous"></script>
<link rel="stylesheet" href="./css/styles.css">
</head>
<body>
	<div class="logos">
        <div class="abcProduct"></div>
        <div class="highRadius"></div>
    </div>
    <div class="heading">Invoice List</div>
    <div class="table-container">
        <div class="buttons">
            <button class="add"><i class="fas fa-plus">&nbsp;&nbsp;</i><span>  Add</span></button>
            <button class="edit disable" disabled><i class="fas fa-pencil-alt">&nbsp;&nbsp;</i><span> Edit</span></button>
            <button class="delete disable" disabled><i class="fas fa-minus">&nbsp;&nbsp;</i><span>  Delete</span></button>
            <i class="fas fa-search searchIcon"></i>
            <input class="search" placeholder="Search by Invoice Number" type="search" onkeyup="hideSearch()">
        </div>
        <div class="table">
            <table class="wholeTable">
                <thead>
                    <tr class='rowclass'>
                        <th>
                            <label class="check-container">
                                <input type="checkbox">
                                <span class="checkmark"></span>
                            </label>
                        </th>
                        <th class="customerName">Customer Name</th>
                        <th class="customer">Customer #</th>
                        <th class="invoice">Invoice #</th>
                        <th class="invoiceAmount">Invoice Amount</th>
                        <th class="dueDate">Due Date</th>
                        <th class="pred">Predicted Payment Date</th>
                        <th class="note">Notes</th>
                    </tr>  
                </thead>
                <tbody class="tableData" id="thisdiv">
                	<%
                	int k = 0;
					try{ 
						
					   	Cookie cookies[] = request.getCookies();
					   	for(Cookie c : cookies){
					   		if(c.getName().equals("offset")){
					   			k = Integer.parseInt(c.getValue());
					   		}
					   	}
					   	Connection connection = DriverManager.getConnection(connectionUrl+dbName, userId, password);
					   	Statement statement=connection.createStatement();
						String sql ="SELECT * FROM file1 limit 7 offset "+k;
			
						ResultSet resultSet = statement.executeQuery(sql);
						while(resultSet.next()){
					%>
					
					<tr class='id<%= resultSet.getLong("invoice_id") %>'  onclick="rowSelect(this)">
                        <td>
                            <label class="check-container">
                                <input type="checkbox">
                                <span class="checkmark"></span>
                            </label>
                        </td>
                        <td class="customerNameValue"><%=resultSet.getString("name_customer") %></td>
                        <td class="customerValue"><%=resultSet.getString("cust_number") %></td>
                        <td class="invoiceValue"><%=resultSet.getLong("invoice_id")%></td>
                        <td class="invoiceAmountValue"><%=resultSet.getFloat("total_open_amount") %></td>
                        <td class="dueDateValue"><%=resultSet.getString("due_in_date") %></td>
                        <td class="predDate"><%=resultSet.getString("clear_date") %></td>
                        <td class="noteValue"><%=resultSet.getString("bucket") %></td>
                    </tr>
					
					<% 
						}
						statement.close();
						connection.close();
					} 
                	catch (Exception e) {
						e.printStackTrace();
					}
					%>
                </tbody>
            </table>
        </div>
    </div>
    <div class="leftArrow"><i class="fas fa-chevron-left"></i></div>
    <div class="rightArrow"><i class="fas fa-chevron-right"></i></div>
    <div id="myModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <div class="header">
                <p>Delete record(s)?</p>
            </div>
            <div class="body">
                You'll lose your record(s) after this action. We can't recover them once you delete.<br><br><br>
                Are you sure you want to <span class="perDlt">permanently delete</span> them?
            </div>
            <div class="footer">
                <button class="cancel">Cancel</button>
                <button class="deleteModal">Delete</button>
            </div>
        </div>
    </div>
    <div id="editModal" class="editModal">
        <div class="edit-modal-content">
            <span class="close">&times;</span>
            <div class="edit-header">
                <p>Edit Invoice</p>
            </div>
            <form class="editForm" action="" method="post">
	            <div class="edit-body">
	                <span>Invoice Amount</span>
	                <input type="text" class="invoiceAmt" name="amtEdit"><br><br>
	                <span class="notesSpan">Notes</span>
	                <textarea class="notesAmt" rows="4" cols="50" name="noteEdit"></textarea>
	            </div>
	            <button class="editBtn">Save</button>
            </form>
            <div class="edit-footer">
                <button class="cancelModal">Cancel</button>
                <button class="reset">Reset</button>   
            </div>
        </div>
    </div>
    <div id="addModal" class="addModal">
        <div class="add-modal-content">
            <span class="close">&times;</span>
            <div class="add-header">
                <p>Add Invoice</p>
            </div>
            <form class="addForm" action="./insertdata" method="post">
                <div class="add-body">
                    <div class="customerNames">
                        <span>Customer Names<span style="color:#ff0000"> *</span></span>
                        <input type="text" class="customer-Name" name="customerName" required>
                    </div><br>
                    <div class="customerNo">
                        <span>Customer No<span style="color:#ff0000"> *</span></span>
                        <input type="text" class="customer-No" name="customerNo" required>
                    </div><br>
                    <div class="invoiceNo">
                        <span>Invoice No<span style="color:#ff0000"> *</span></span>
                        <input type="text" class="invoice-No" name="invoiceNo" required>
                    </div><br>  
                    <div class="invoiceAmounts">
                        <span>Invoice Amount<span style="color:#ff0000"> *</span></span>
                        <input type="text" class="invoice-Amount" name="amount" required>
                    </div><br>
                    <div class="dueDates">
                        <span>Due Date<span style="color:#ff0000"> *</span></span>
                        <input type="date" class="due-Date" id="due-Date" name="dueDate" required>
                    </div>
                    <div class="notes">
                        <span class="note-s">Notes</span>
                        <textarea class="notes-Amt" rows="4" cols="50" name="notes"></textarea>
                    </div>
                </div>
                <button class="addBtn">Add</button>
            </form>

            <div class="add-footer">
                <button class="cancelAddModal">Cancel</button>
                <button class="clear">Clear</button>
            </div>
        </div>
    </div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="./js/script.js"></script>
</html>