CREATE PROCEDURE userOrderHistory 
    @user VARCHAR(255)
AS
    SELECT Items.ItemName, Items.ItemPrice, OrderDetails.Quantity
    FROM Items JOIN OrderDetails ON Items.MenuItemID=OrderDetails.ItemID
    WHERE OrderID IN (SELECT OrderID
                    From Orders
                    Where Orders.userID = (SELECT Users.userID
                                FROM Users
                                WHERE Users.userName=@user));
GO