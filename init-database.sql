CREATE DATABASE IF NOT EXISTS bulbshare_tech_challenge;
USE bulbshare_tech_challenge;
CREATE USER 'bulbshare_user'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON bulbshare_tech_challenge.* TO 'bulbshare_user'@'%';
ALTER USER 'bulbshare_user'@'%' IDENTIFIED WITH 'mysql_native_password' BY 'password';
FLUSH PRIVILEGES;
