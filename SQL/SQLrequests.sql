
--List Jewelry
select Item_name FROM Jewelry;

-- Get JewelryDetails
SELECT * from Jewelry where Item_ID = 1;

SELECT * FROM Cred;
SELECT * FROM Customers;
SELECT * FROM Orders;
SELECT * FROM Reviews;

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


SELECT * from Jewelry ORDER BY Item_ID OFFSET 0  ROWS FETCH NEXT 9 rows ONLY;

--test insert
/*

INSERT into Customers VALUES('Cj','buckhead atlanta'),('richard','Tampa Floraida'),
('kadin','123 main street'),
('a','a');


INSERT into Orders VALUES(1,'08/08/2022'),(2,'08/08/2022');

INSERT into Jewelry VALUES ('pearls',2000,'Seastone','Necklace','https://media.istockphoto.com/photos/pearls-picture-id121119216?k=6&m=121119216&s=170667a&w=0&h=2estH0sWxn2nQkzve-pvSeC2g6eQfAlAo8NouQtk35w='),('Diamond Ring',5000,'Diamond','Ring','https://4.bp.blogspot.com/_aBIjVXlJAe0/S69GvW0tAkI/AAAAAAAAAMk/A8wMOhM-Au0/s1600/Diamond+Ring+7.jpg');

INSERT into Jewelry VALUES ('cufflinks',200,'Metal','Accessory','https://upload.wikimedia.org/wikipedia/commons/b/bb/Cufflinks-old_hg.jpg'),('Pendant',500,'Amber','Necklace','https://upload.wikimedia.org/wikipedia/commons/4/41/Amber.pendants.800pix.050203.jpg');

INSERT into Jewelry VALUES ('Brooch',1500,'Silver','Accessory','https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Wing_Brooch_MET_DT108.jpg/330px-Wing_Brooch_MET_DT108.jpg'),('Gold Ring',935,'Gold','Ring','https://thejoue.com/wp-content/uploads/2021/04/Chopard-18kt-rose-gold-Ice-Cube-Pure-diamond-ring-min-800x497.jpg');

INSERT into Jewelry VALUES 
('Diamond Necklace',2500,'Diamond','necklace','https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F_Q5JWnk9IbJo%2FTOL6uDouKPI%2FAAAAAAAABRE%2Fwp7hIpV7B80%2Fs1600%2F00525%2BNK%2B103.60%2BCarat%2BDiamond%2BNecklace.jpg&f=1&nofb=1'),
('Emerald earing',1900,'Emerald','accessory','https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fww1.prweb.com%2Fprfiles%2F2019%2F04%2F29%2F16275483%2FERG0070.jpg&f=1&nofb=1');



INSERT INTO J_T VALUES(1,1,1),(1,1,2),(2,2,2);

INSERT into Reviews VALUES(1,1,'08/08/2022','cool stuff',5),(1,2,'08/08/2022','exspensive stuff',4),(2,2,'08/08/2022','thank you',5);

INSERT INTO Cred VALUES('user','passw',1),('user1','passw2',2),('a','a',4);

INSERT into Jewelry VALUES('Diamond Necklace',2500,'Diamond','Necklace','https://2.bp.blogspot.com/-a0SUaWbKdZc/WcuaC-RLXLI/AAAAAAAACWM/UYxb3ze_I9s6p9fhK9KqUfrheZFRtxjewCLcBGAs/s1600/necklace%2B12.jpg'),
('Emerald earing',900,'Emerald','Earing','https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fww1.prweb.com%2Fprfiles%2F2019%2F04%2F29%2F16275483%2FERG0070.jpg&f=1&nofb=1'),
('Turtle pendant',1200,'Diamond','Accessory','https://i5.walmartimages.com/asr/686e8068-c6cd-4dd4-bccb-272de8f9597b_1.743e55d949fd9783b100fda20d4df166.jpeg'),
('Emerald Necklace',1700,'Emerald','Necklace','https://stauer-cdn-bi1tspyakbh4frq6pd1dkakl9n7hjflhje.netdna-ssl.com/images/stauer/products/17887_800.jpg'),
('Emerald Ring',4500,'Emerald','Ring','https://i5.walmartimages.com/asr/7bdfc166-7383-430d-9d9b-1eb1e65e1254_1.f97e8d1a0e928a7da03eae61dd657ce1.jpeg'),
('Gold earing',400,'Gold','Earing','https://sc01.alicdn.com/kf/HTB1stlZqTtYBeNjy1Xdq6xXyVXaw/231651136/HTB1stlZqTtYBeNjy1Xdq6xXyVXaw.jpg'),
('Gold Necklace',300,'Gold','Necklace','https://i5.walmartimages.com/asr/e4f6bd16-8bca-47d7-9cd3-2c1f311f865b_1.08a977991b1c360675e1103d39318634.jpeg'),
('Italian Necklace',500,'Silver','Necklace','https://i.ebayimg.com/images/i/332075371587-0-1/s-l1000.jpg'),
('Compass pendant',250,'Silver','Accessory','https://cdn.shopify.com/s/files/1/0115/1474/0795/products/IMG_7083_2048x.jpeg?v=1553850260'),
('Siver Ring',2000,'Silver','Ring','https://cdn.shopify.com/s/files/1/0079/8162/9498/products/product-image-742117717_2000x.jpg?v=1571736057'),
('Amber Necklace',700,'Amber','Necklace','https://www.quietwest.com/wp-content/uploads/2017/06/DSC_0597-4.jpg'),
('Ruby Ring',3000,'Ruby','Ring','https://i1.wp.com/www.luxuriousmagazine.com/wp-content/uploads/2019/11/14.67-Carat-Natural-Burmese-Ruby-Diamond-Ring.jpg'),
('Ruby earing',700,'Ruby','Earing','https://i.etsystatic.com/6155585/r/il/c7e9ad/1653932253/il_fullxfull.1653932253_5de6.jpg'),
('Ruby Necklace',700,'Ruby','Necklace','https://i.ebayimg.com/images/i/371793439094-0-1/s-l1000.jpg'),
('Sapphire Ring',3000,'Sapphire','Ring','https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.atOrKyuvVC9pPvG2_dNpFAHaHa%26pid%3DApi&f=1'),
('Sapphire earing',770,'Sapphire','Earing','https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.bcKs532TO2cmO65tNjboywHaHa%26pid%3DApi&f=1'),
('Sapphire Necklace',800,'Sapphire','Necklace','https://a.1stdibscdn.com/archivesE/jewelry/1stdibs/051514/DiamondScene_CC_DM/10/X.jpg'),
('Amethyst Necklace',650,'Amethyst','Necklace','https://fd-gallery.com/wp-content/uploads/2018/10/NCK-563-1.jpg'),
('Amethyst earing',770,'Amethyst','Earing','https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.HNb7_kdrp3IjRMJiwWqPyQHaHa%26pid%3DApi&f=1'),
('Amethyst Ring',3500,'Amethyst','Ring','http://www.tracyandstacy.com/uploads/3/2/7/6/3276508/s751022952061511_p505_i1_w3024.jpeg?width=2560'),
('Beadded blessings',800,'Amber','Necklace','https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.gFRMg8kVTOi9TVm1ONbYxQHaGt%26pid%3DApi&f=1'),
('Sunshine Shimmer',600,'Amber','Necklace','https://ae01.alicdn.com/kf/HTB1.pe2b_nI8KJjSszgq6A8ApXaq/KJJEAXCMY-Fine-jewelry-925-Inlaid-Citrine-female-ring-necklace-set-in-Sterling-Silver.jpg'),
('Arian Envy',1900,'Emerald','Necklace','https://i5.walmartimages.com/asr/e9a36e86-1eb6-420c-9bf0-5be5a623342f_1.c57e2a56e0737f373d14994f4ef6426b.jpeg'),
('Golden Liberty',300,'Gold','Accessory','https://www.productphotography.com/wp-content/uploads/2018/02/Jewelry-Image-001-copy.jpg'),
('Amber Ring',3500,'Amber','Ring','https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.photigy.com%2Fwp-content%2Fuploads%2F2015%2F12%2Fdof-jewelry-test0032.jpg&f=1&nofb=1'),
('Star of the Sea',3300,'Sapphire','Ring','https://www.samuelsonsdiamonds.com/wp-content/uploads/2020/08/estate.jpg'),
('Serina Sights',500,'Silver','Earing','https://mir-s3-cdn-cf.behance.net/project_modules/1400/b7479764666299.5ad98abfed668.jpg'),
('Stated love',250,'Silver','Necklace','https://i5.walmartimages.com/asr/070c3c7b-0a29-4f6c-80f5-f6cafd54e135_1.189b5cf61e6f96d100d75fd69a9b4047.jpeg'),
('Panther Prince',330,'Gold','Necklace','https://img2.cgtrader.com/items/2680890/aff8f67cae/panther-pendant-jewelry-gold-3d-model-obj-3ds-fbx-stl-3dm.jpg'),
('Brazillian Brace',350,'Gold','Accessory','https://1.bp.blogspot.com/_ZEWcTye12M4/TD0JVweOM1I/AAAAAAAAACE/Xd2A2paE8OA/s320/179734043.jpg'),
('The little Rock',4000,'Diamond','Ring','https://2.bp.blogspot.com/_2YJ5t71DnSY/SR9PxErcELI/AAAAAAAAAlY/w0DbeJZx-Z8/s400/15-B0010VOB8A.jpg'),
('The Big Rock',7000,'Diamond','Ring','https://ae01.alicdn.com/kf/HTB18CYILFXXXXaHXXXXq6xXFXXXW/Large-Imitation-Super-Big-Crystal-Ring-Wedding-Decoration-Gift-80mm-Love-High-Quality-Stainless-Steel-Engagement.jpg'),
('The Sentinal',4500,'Gold','Ring','https://i.pinimg.com/originals/39/a7/e3/39a7e3bb805fe0fe249feb15f771b55c.jpg'),
('Kate Spade',300,'Seastone','Ring','https://images-na.ssl-images-amazon.com/images/I/71ZtBr%2BXFpL._AC_UY625_.jpg'),
('Silver Seahorse',250,'Seastone','Necklace','https://ae01.alicdn.com/kf/HTB1KkrkX0fvK1RjSszhq6AcGFXaQ/Vintage-Silver-Seahorse-Barefoot-Sea-Stone-Foot-Bride-Beach-Sandal-Ankle-Bracelet-Bangle-Beads-Anklet-Women.jpg'),
('Blue stone',150,'Seastone','Necklace','https://www.dailylook.com/images/product/accessories/74612_full-350.jpg'),
('Cocktail King',3000,'Amber','Ring','http://www.mgsignedjewelry.com/images/MTSJ11421-1.jpg'),
('Emerald Box Ring',4700,'Emerald','Ring','https://www.langantiques.com/media/catalog/product/l/a/large-emerald-cut-tourmaline-and-diamond-dinner-ring_1_30-1-10843.jpg'),
('Amethyst Box Ring',3700,'Amethyst','Ring','https://d17anp2eo56k6j.cloudfront.net/media/catalog/product/l/a/large-amethyst-and-diamond-platinum-cocktail-ring_1_30-1-10627.jpg'),
('Stone Fusion',3000,'Diamond','Ring','https://i5.walmartimages.com/asr/75ece499-8bd3-40ac-97ea-484da7ab3184_1.db675c54661850baaa98ea2f1c4684a9.jpeg');


*/

-- 10 jewls per type
--