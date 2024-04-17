Begin TRANSACTION initial;
    CREATE TABLE Users(
        userID INT IDENTITY(1,1) PRIMARY KEY,
        userName VARCHAR(255) UNIQUE,
        numRewards INT DEFAULT(0) 
    )
    
    CREATE TABLE Orders (
        OrderID INT IDENTITY(1,1) PRIMARY KEY,
        userID INT FOREIGN KEY REFERENCES Users(userID),
        TotalPrice DECIMAL(10,2) CHECK(TotalPrice>0.00)
    );

    CREATE TABLE Items(
        MenuItemID INT IDENTITY(1,1) PRIMARY KEY,
        ItemName VarChar(255),
        ItemDesc VarChar(1023),
        ItemPrice DECIMAL(10,2) CHECK(ItemPrice>0.00),
    );

    CREATE TABLE OrderDetails (
        OrderDetailID INT IDENTITY(1,1) PRIMARY KEY,
        OrderID INT NOT NULL FOREIGN KEY REFERENCES Orders(OrderID),
        ItemID INT NOT NULL FOREIGN KEY REFERENCES Items(MenuItemID),
        Quantity INT CHECK(Quantity>=1 and Quantity<100),
    );

    INSERT INTO Items (ItemName, ItemDesc, ItemPrice) VALUES
    ('Margherita Pizza','Original pizza with melted cheese and delicious robust tomato sauce', 10.00),
    ('Pepperoni Pizza', 'Cheese pizza topped with pepperonis',12.00),
    ('BBQ Chicken Pizza', 'Cheese pizza topped with chicken and a sweet and savoury BBQ sauce',14.00),
    ('Hawaiian Pizza', 'Cheese pizza topped with ham and pineapple',11.00),
    ('Veggie Pizza', 'Cheese pizza topped with peppers, onions, and olives.',10.00),
    ('Buffalo Wings', 'Spicy buffalo flavored chicken wings.',8.00),
    ('Caesar Salad', 'House salad served with Caesar dressing.',7.00),
    ('Garlic Bread', 'Side of delicious garlic bread (6 pieces).',5.00),
    ('Spaghetti Bolognese', 'Spaghetti dish with a delicious meat sauce.',12.00),
    ('Lasagna', 'Cheesy Pasta dish with robust tomato sauce.' ,13.00);

COMMIT;

GO
