CREATE PROCEDURE newUser
    @tempUserName VARCHAR(255)
AS
    IF NOT EXISTS(SELECT userName FROM Users WHERE userName = @tempUserName) 
        INSERT INTO Users(userName) VALUES (@tempUserName)
GO