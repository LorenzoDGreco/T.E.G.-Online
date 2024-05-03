-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.28-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para teg-online
CREATE DATABASE IF NOT EXISTS `teg-online` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `teg-online`;

-- Volcando estructura para tabla teg-online.cards
CREATE TABLE IF NOT EXISTS `cards` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `roomId` bigint(20) NOT NULL,
  `userId` bigint(20) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `code` int(11) NOT NULL,
  `lastUpdate` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueCard` (`roomId`,`code`) USING BTREE,
  KEY `status` (`status`),
  KEY `userId` (`userId`),
  KEY `gameId` (`roomId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla teg-online.cards: ~5 rows (aproximadamente)
REPLACE INTO `cards` (`id`, `roomId`, `userId`, `status`, `code`, `lastUpdate`) VALUES
	(1, 1, 0, 0, 1, 0),
	(2, 1, 0, 0, 2, 0),
	(3, 1, 0, 0, 3, 0),
	(4, 1, 0, 0, 4, 0),
	(5, 2, 0, 0, 1, 0);

-- Volcando estructura para tabla teg-online.countries
CREATE TABLE IF NOT EXISTS `countries` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `roomId` bigint(20) NOT NULL,
  `userId` bigint(20) NOT NULL,
  `code` tinyint(4) NOT NULL,
  `armies` smallint(6) NOT NULL,
  `lastUpdate` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `gameUnique` (`roomId`,`code`) USING BTREE,
  KEY `gameId` (`roomId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla teg-online.countries: ~0 rows (aproximadamente)

-- Volcando estructura para tabla teg-online.rooms
CREATE TABLE IF NOT EXISTS `rooms` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `leaderUserId` bigint(20) NOT NULL,
  `turn` smallint(6) NOT NULL,
  `phase` tinyint(4) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `config` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`config`)),
  `war` longtext DEFAULT NULL,
  `lastUpdate` bigint(20) NOT NULL,
  `globalUpdate` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla teg-online.rooms: ~1 rows (aproximadamente)
REPLACE INTO `rooms` (`id`, `leaderUserId`, `turn`, `phase`, `status`, `name`, `password`, `config`, `war`, `lastUpdate`, `globalUpdate`) VALUES
	(1, 0, 1, 0, 0, 'asd', '123', NULL, NULL, 0, 0);

-- Volcando estructura para tabla teg-online.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) DEFAULT NULL,
  `token` varchar(50) NOT NULL,
  `lastConnect` bigint(20) NOT NULL,
  `lastUpdate` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tokenUnique` (`token`),
  KEY `token` (`token`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla teg-online.users: ~10 rows (aproximadamente)
REPLACE INTO `users` (`id`, `name`, `token`, `lastConnect`, `lastUpdate`) VALUES
	(34, 'greco', '6Eyvob5LR8lCcNSJgkqvIIBBSDWN1UqbxA7VbTF5eThlVTXxMl', 0, 1714609710723),
	(35, 'greco', 'mNzwLPR6Bsi22wcr5miiW0yqw7wD0Zo5kpj0gdfULRodxRXFnh', 0, 1714609712624),
	(36, 'greco', '1BhT6tS4dOU1O4XxveSZnDk5DpUfN2BVoJ2SwhReOyM1zDq6UU', 0, 1714609713380),
	(37, 'greco', 'AzWbdI7JsQQruch3bw5FPFLn4QHaRg96yd4xoYRwNpCpGS4CP2', 0, 1714609715675),
	(38, 'greco', 's8Yw6q4k6hC5ffhropNSBOctnLbLL4TwOkTncdm9Yp6DsEN8mp', 0, 1714609740938),
	(39, 'taiel', 'jfFFl16slTGPCZ82TjEm5nxgjDSZg6AQ1cvXiLrKxXZsUy8w7B', 0, 1714609747738),
	(40, 'pedro', 'xWEooCcPwcyCdWT3PUJjxftTI01WlMo5zOWzMsUPccalSEYeA8', 0, 1714609751888),
	(41, 'juan', 'wD6mSoO6KJoLqFZPhXQJRQD3YOGJpPX2j4oPhxMiIcZhWUsBpX', 0, 1714609757370),
	(42, 'amanda', 'gE6YmvnWZpDFCExEP2oCuIOeLDVoKoSlxQrOs3X56m77KX1pBs', 0, 1714609762978),
	(48, 'amanda', 'yEljaxfR1jn4jSYW7PTq33GPTE2KtHM6LnSntvXxBkAv0TudMp', 0, 1714610768751);

-- Volcando estructura para tabla teg-online.usersrooms
CREATE TABLE IF NOT EXISTS `usersrooms` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `roomId` bigint(20) NOT NULL,
  `userId` bigint(20) NOT NULL,
  `color` tinyint(4) NOT NULL,
  `objetive` tinyint(4) DEFAULT NULL,
  `order` tinyint(4) DEFAULT NULL,
  `lastUpdate` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `game` (`roomId`,`userId`) USING BTREE,
  KEY `userId` (`userId`),
  KEY `gameId` (`roomId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla teg-online.usersrooms: ~1 rows (aproximadamente)
REPLACE INTO `usersrooms` (`id`, `roomId`, `userId`, `color`, `objetive`, `order`, `lastUpdate`) VALUES
	(1, 1, 2, 1, NULL, NULL, 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
