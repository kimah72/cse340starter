-- Assignment 2 Tasks
-- 5.1
INSERT INTO account 
(account_firstname, account_lastname, account_email, account_password)
VALUES 
('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- 5.2
UPDATE account
SET account_type = 'Admin'
WHERE account_firstname = 'Tony';

-- 5.3
DELETE FROM account 
WHERE account_id = 1;

-- 5.4
UPDATE inventory 
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

--5.5
SELECT 
    i.inv_make,
    i.inv_model,
    c.classification_id
FROM 
    inventory i
INNER JOIN 
    classification c ON i.classification_id = c.classification_id
WHERE 
    c.classification_name = 'Sport';

--5.6
UPDATE inventory 
SET 
    inv_image = CONCAT(SUBSTRING(inv_image FROM 1 FOR POSITION('/' IN inv_image)), 'vehicles', SUBSTRING(inv_image FROM POSITION('/' IN inv_image))),
    inv_thumbnail = CONCAT(SUBSTRING(inv_thumbnail FROM 1 FOR POSITION('/' IN inv_thumbnail)), 'vehicles', SUBSTRING(inv_thumbnail FROM POSITION('/' IN inv_thumbnail)));