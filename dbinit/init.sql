CREATE DATABASE IF NOT EXISTS dev_test;
USE dev_test;

CREATE TABLE Roles (
    id INT NOT NULL AUTO_INCREMENT,
    roleName VARCHAR(10) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO Roles (id, roleName)
VALUES (1, 'User'),
        (2, 'Admin');

CREATE TABLE Accounts (
    id INT NOT NULL AUTO_INCREMENT,
    roleId INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    deletedAt TIMESTAMP NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT FK_AccountRole FOREIGN KEY (roleId) REFERENCES Roles(id)
);

CREATE TABLE Users (
    id INT NOT NULL AUTO_INCREMENT,
    accountId INT NOT NULL,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    avatar VARCHAR(255) NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_AccountUser FOREIGN KEY (accountId) REFERENCES Accounts(id)
);

CREATE TABLE Addresses (
    id INT NOT NULL AUTO_INCREMENT,
    country VARCHAR(20) NOT NULL,
    city VARCHAR(20) NOT NULL,
    street VARCHAR(20) NOT NULL,
    building VARCHAR(20) NOT NULL,
    details VARCHAR(50) NOT NULL,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE UserAddresses (
    userId INT NOT NULL,
    addressId INT NOT NULL,
    PRIMARY KEY (userId, addressId),
    CONSTRAINT FK_UserAddressUser FOREIGN KEY (userId) REFERENCES Users(id),
    CONSTRAINT FK_UserAddressAddress FOREIGN KEY (addressId) REFERENCES Addresses(id)
);

CREATE TABLE Categories (
    id INT NOT NULL,
    categoryName VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE INDEX  (categoryName)
);

CREATE TABLE Products (
    id INT NOT NULL AUTO_INCREMENT,
    categoryId INT NOT NULL,
    productName VARCHAR(20) NOT NULL,
    description VARCHAR(255) NOT NULL,
    unitPrice DECIMAL(10,2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT FK_ProductCategory FOREIGN KEY (categoryId) REFERENCES Categories(id)
);

CREATE TABLE CartItems (
    userId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT NOT NULL,
    isChecked BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (userId, productId),
    CONSTRAINT FK_UserCart FOREIGN KEY (userId) REFERENCES Users(id),
    CONSTRAINT FK_ProductCart FOREIGN KEY (productId) REFERENCES Products(id)
);

CREATE TABLE Shippers (
    id INT NOT NULL AUTO_INCREMENT,
    companyName VARCHAR(20) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Orders (
    id INT NOT NULL AUTO_INCREMENT,
    shipVia INT NOT NULL,
    userId INT NOT NULL,
    addressId INT NOT NULL,
    shippedDate DATE,
    orderDate DATE,
    shipFee DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_ShipVia FOREIGN KEY (shipVia) REFERENCES Shippers(id),
    CONSTRAINT FK_OrderUser FOREIGN KEY (userId) REFERENCES Users(id),
    CONSTRAINT FK_OrderAddress FOREIGN KEY (addressId) REFERENCES Addresses(id)
);

CREATE TABLE OrderDetails (
    orderId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT NOT NULL,
    unitPrice DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (orderId, productId),
    CONSTRAINT FK_OrderId FOREIGN KEY (orderId) REFERENCES Orders(id),
    CONSTRAINT FK_ProductId FOREIGN KEY (productId) REFERENCES Products(id)
);

CREATE TABLE CreditCards (
    id INT NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    cardNumber VARCHAR(16) NOT NULL,
    holderName VARCHAR(20) NOT NULL,
    cardType VARCHAR(20) NOT NULL,
    cardExpDate DATE NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_CreditCardUser FOREIGN KEY (userId) REFERENCES Users(id)
);