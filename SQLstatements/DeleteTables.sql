BEGIN TRANSACTION Deletion;
    DROP TABLE Users;
    DROP TABLE Orders;
    DROP TABLE Items;
    DROP TABLE OrderDetails;
COMMIT;
GO