CREATE or ALTER PROCEDURE createOrder @itemList NVARCHAR(4000), @quantList VARCHAR(4000), @userName VARCHAR(255)
AS



DECLARE @quantTable TABLE (tempQuant INT, pos1 INT)
DECLARE @combTable TABLE (tempItem INT, tempQuant INT)
DECLARE @sumTable TABLE (tempPrice DECIMAL(10,2))

DECLARE @pricetotal DECIMAL(10,2)
DECLARE @userID INT
DECLARE @orderID INT

BEGIN
SET NOCOUNT ON

BEGIN TRANSACTION createOrderTrans

    SET @userID = (SELECT userID FROM Users WHERE Users.userName=@userName)

    DECLARE @itemTable TABLE (tempItem INT, pos2 INT)
    INSERT INTO @itemTable(tempItem, pos2)
    SELECT CONVERT(INT,[value]),ordinal FROM STRING_SPLIT(@itemList,',',1) WHERE RTRIM(value) <> ''
    
    INSERT INTO @quantTable
    SELECT CONVERT(INT,[value]),ordinal FROM STRING_SPLIT(@quantList,',',1) WHERE RTRIM(value) <> '' 

    INSERT INTO @combTable
    SELECT tempItem, tempQuant FROM @itemTable JOIN @quantTable on pos1=pos2

    INSERT INTO @sumTable
    SELECT Items.ItemPrice * tempQuant AS tempPrice
    FROM @combTable JOIN Items ON tempItem= Items.MenuItemID
     
    SET @pricetotal = (SELECT SUM(tempPrice) FROM @sumTable);

    INSERT INTO Orders(userID,TotalPrice) VALUES (@userID,@pricetotal)

    SET @orderID = (SELECT MAX(orderID) FROM Orders);
    
    INSERT INTO OrderDetails(orderID,ItemID,Quantity)
    SELECT @orderID,Items.MenuItemID, tempQuant
    FROM @combTable JOIN Items ON tempItem = Items.MenuItemID

    COMMIT TRANSACTION;
END;
GO