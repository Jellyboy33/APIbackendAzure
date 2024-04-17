Begin TRANSACTION inserting

INSERT INTO Items (ItemName, ItemPrice) VALUES
('Margherita Pizza', 10.00),
('Pepperoni Pizza', 12.00),
('BBQ Chicken Pizza', 14.00),
('Hawaiian Pizza', 11.00),
('Veggie Pizza', 10.00),
('Buffalo Wings', 8.00),
('Caesar Salad', 7.00),
('Garlic Bread', 5.00),
('Spaghetti Bolognese', 12.00),
('Lasagna', 13.00);
		
INSERT INTO USERS (userName,numRewards) VALUES
('Ricardo',1),
('Alex',1),
('Jose',1),
('Annete',1),
('Chris',1),
('user643',1),
('user873',1),
('james',1),
('johnathon',1),
('alejandro',1),
('mezzi',1);

EXEC createOrder @itemList='2,4', @quantList='1,1',@userName='jimmy';
EXEC createOrder @itemList='6,2', @quantList='2,1',@userName='alejandro';
EXEC createOrder @itemList='2,4', @quantList='1,1',@userName='mezzi';
EXEC createOrder @itemList='1,3', @quantList='1,3',@userName='james';
EXEC createOrder @itemList='1,8', @quantList='1,1',@userName='jimmy';
EXEC createOrder @itemList='2,4', @quantList='4,1',@userName='jose';
EXEC createOrder @itemList='1,3', @quantList='1,1',@userName='Chris';
EXEC createOrder @itemList='2,3', @quantList='1,2',@userName='jimmy';
EXEC createOrder @itemList='1,4', @quantList='1,1',@userName='Annete';
EXEC createOrder @itemList='4,3', @quantList='2,2',@userName='jimmy';
EXEC createOrder @itemList='6,8', @quantList='1,1',@userName='mezzi';

COMMIT

GO