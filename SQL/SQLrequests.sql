
--List Jewelry
select Item_name FROM Jewelry;

-- Get JewelryDetails
SELECT * from Jewelry where Item_ID = 1;

--List Jewelry Reviews 
select Customer_ID,Review_date,content,rating from Reviews where Item_ID = 1;

--List Customer’s Reviews
select Review_date,content,rating, Item_ID from Reviews where Customer_ID = 1;

-- Make/Add Review
/*
INSERT into Reviews VALUES
(@Reviews_ID,@Customer_ID,@Item_ID,@Review_date,@content,@rating);
*/

--Get User Profile
SELECT CName, Shipping_address FROM Customers WHERE Customer_ID = 1; 

--Modify User Profile

update Customers
set
Shipping_address = '@Shipping_address'
where Customer_ID = 1;


--INSERT into Customers VALUES(@Customer_ID,@CName,@Shipping_address);

--INSERT into Orders VALUES(@Order_ID,@Customer_ID,@Order_Date );

--INSERT into Jewelry VALUES (@Item_ID,@Item_name,@Price,@Material,@item_Type,@Img_url);

--INSERT INTO J_T VALUES(@Jewelry_ID,Customers_ID,@Order_ID,@Item_ID);

--Change a review

update Reviews
set
content = '@newContent',
rating = '@newRating'
where Reviews_ID = 1;


--Orders for customer X
SELECT Orders.Order_ID, Orders.Order_Date, J_T.Jewelry_ID, Jewelry.Item_name, Jewelry.Price 
FROM Orders join J_T ON Orders.Order_ID = J_T.Order_ID join Jewelry on Jewelry.Item_ID = J_T.Item_ID WHERE Customer_ID = 1;


--Reviews for item X
select Customer_ID, Review_date,content,rating from Reviews where Item_ID = 2;


select Customer_ID from cred WHERE userN = 'user' and Pass= 'passw';


--test insert
/*

INSERT into Customers VALUES('Cj','buckhead atlanta'),('richard','Tampa Floraida')


INSERT into Orders VALUES(1,'08/08/2022'),(2,'08/08/2022');

INSERT into Jewelry VALUES ('pearls',2000,'seastione','neckalace','Img_url'),('Diamond Ring',5000,'Diamond','ring','Img_url2');

INSERT INTO J_T VALUES(1,1,1),(1,1,2),(2,2,2);

INSERT into Reviews VALUES(1,1,'08/08/2022','cool stuff',5),(1,2,'08/08/2022','exspensive stuff',4),(2,2,'08/08/2022','thank you',5);

INSERT INTO Cred VALUES('user','passw',1),('user1','passw2',2);

*/


