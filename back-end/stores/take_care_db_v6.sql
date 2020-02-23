-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: take_care_db
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Adress`
--

DROP TABLE IF EXISTS `Adress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Adress` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `zip_code` varchar(10) NOT NULL,
  `adress` varchar(255) NOT NULL,
  `city` varchar(70) NOT NULL,
  `street_number` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Adress`
--

LOCK TABLES `Adress` WRITE;
/*!40000 ALTER TABLE `Adress` DISABLE KEYS */;
INSERT INTO `Adress` VALUES (1,'1000','Rue du Cornet','Bruxelles',335),(2,'1000','Orchideeenlaan','Bruxelles',471),(3,'1000','Rue de Fromelenne','Bruxelles',187),(4,'1000','Drève des Bouleaux','Bruxelles',40),(5,'1000','Rue des Laderies','Bruxelles',147),(6,'1000','Rue du Bienne','Bruxelles',364),(7,'1000','Excelsiorlaan','Bruxelles',244),(8,'1000','Ringlaan','Bruxelles',165),(9,'1000','Chaussée de Wavre','Bruxelles',394),(10,'1000','Rue de Fromelenne','Bruxelles',384),(11,'1000','Mandemakersstraat','Bruxelles',147),(12,'1000','Rue de la Tannerie','Bruxelles',5),(13,'1000','Boulevard General Wahis','Bruxelles',30),(14,'1000','Pierre Delannoyplaats','Bruxelles',190),(15,'1000','Rue du Monument ','Bruxelles',101),(16,'1000','Rue Basse','Bruxelles',38),(17,'1000','Netelaan','Bruxelles',201),(18,'1000','Rue du Manoir','Bruxelles',237),(19,'1000','Rue de Vonêche','Bruxelles',497),(20,'1000','Rue du Moulin','Bruxelles',336),(21,'1000','Hooivelden','Bruxelles',134),(22,'1000','Rue de Piétrain','Bruxelles',233),(23,'1000','Rue de Boneffe','Bruxelles',242),(24,'1000','Rue de la Sarthe','Bruxelles',319),(25,'1000','Rue de Vonêche ','Bruxelles',275),(26,'1000','Industriestraat','Bruxelles',220),(27,'1000','Lange Elzenstraat','Bruxelles',240),(28,'1000','Strepestraat','Bruxelles',372),(29,'1000','Rue des Buissons ','Bruxelles',376),(30,'1000','Rue Bois des Fosses','Bruxelles',256),(31,'1000','Industrieweg','Bruxelles',236),(32,'1000','Rue de Baras ','Bruxelles',229),(33,'1000','Rue de la Poste ','Bruxelles',129),(34,'1000','Heuvenstraat','Bruxelles',378),(35,'1000','Pierre Delannoyplaats','Bruxelles',325),(36,'1000','Rue de Bouillon ','Bruxelles',149),(37,'1000','Mandemakersstraat','Bruxelles',380),(38,'1000','Rue de la Montagne','Bruxelles',25),(39,'0000','Admin adress','Admin city',0);
/*!40000 ALTER TABLE `Adress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Orders` (
  `order_number` varchar(255) NOT NULL,
  `pharmacist_comment` text,
  `delivery_comment` text,
  `client_id` int(10) unsigned NOT NULL,
  `pharmacist_id` int(10) unsigned NOT NULL,
  `receipt` varchar(255) NOT NULL,
  `prescription_photo` varchar(255) DEFAULT NULL,
  `prescription` tinyint(1) NOT NULL DEFAULT '1',
  `paid` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`order_number`),
  KEY `fk_Orders_Users1_idx` (`client_id`),
  KEY `fk_Orders_Users2_idx` (`pharmacist_id`),
  CONSTRAINT `fk_Orders_Users1` FOREIGN KEY (`client_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Orders_Users2` FOREIGN KEY (`pharmacist_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
INSERT INTO `Orders` VALUES ('20220095932b9',NULL,NULL,23,38,'path or url of picture of receipt',NULL,1,1),('2022010569c9r5',NULL,NULL,17,38,'path or url of picture of receipt',NULL,1,0),('202201132a2c',NULL,NULL,31,38,'path or url of picture of receipt',NULL,1,0),('20220114439fa',NULL,NULL,20,38,'path or url of picture of receipt',NULL,1,1),('202201149a2c3',NULL,NULL,18,38,'path or url of picture of receipt',NULL,0,1),('2022015239ac4',NULL,NULL,5,38,'path or url of picture of receipt',NULL,0,0);
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders_has_Pharmaceuticals`
--

DROP TABLE IF EXISTS `Orders_has_Pharmaceuticals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Orders_has_Pharmaceuticals` (
  `orders_order_number` varchar(255) NOT NULL,
  `pharmaceuticals_id_medicament` varchar(255) NOT NULL,
  `quantity` smallint(5) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`orders_order_number`,`pharmaceuticals_id_medicament`),
  KEY `fk_Orders_has_Pharmaceuticals_Pharmaceuticals1_idx` (`pharmaceuticals_id_medicament`),
  KEY `fk_Orders_has_Pharmaceuticals_Orders1_idx` (`orders_order_number`),
  CONSTRAINT `fk_Orders_has_Pharmaceuticals_Orders1` FOREIGN KEY (`orders_order_number`) REFERENCES `Orders` (`order_number`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Orders_has_Pharmaceuticals_Pharmaceuticals1` FOREIGN KEY (`pharmaceuticals_id_medicament`) REFERENCES `Pharmaceuticals` (`id_medicament`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders_has_Pharmaceuticals`
--

LOCK TABLES `Orders_has_Pharmaceuticals` WRITE;
/*!40000 ALTER TABLE `Orders_has_Pharmaceuticals` DISABLE KEYS */;
INSERT INTO `Orders_has_Pharmaceuticals` VALUES ('20220095932b9','852RTY654',3),('2022010569c9r5','147AZE963',1),('2022010569c9r5','6516541FR',4),('202201132a2c','147AZE963',4),('202201132a2c','6516541FR',5),('202201132a2c','852RTY654',3),('202201132a2c','9876Z654',10),('202201132a2c','987AZ9874',3),('20220114439fa','852RTY654',4),('202201149a2c3','147AZE963',5),('202201149a2c3','9876Z654',10),('2022015239ac4','9876Z654',5);
/*!40000 ALTER TABLE `Orders_has_Pharmaceuticals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders_has_Status`
--

DROP TABLE IF EXISTS `Orders_has_Status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Orders_has_Status` (
  `orders_order_number` varchar(255) NOT NULL,
  `status_id` tinyint(3) unsigned NOT NULL,
  `date_status` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`orders_order_number`,`status_id`),
  KEY `fk_Orders_has_Status_Status1_idx` (`status_id`),
  KEY `fk_Orders_has_Status_Orders1_idx` (`orders_order_number`),
  CONSTRAINT `fk_Orders_has_Status_Orders1` FOREIGN KEY (`orders_order_number`) REFERENCES `Orders` (`order_number`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Orders_has_Status_Status1` FOREIGN KEY (`status_id`) REFERENCES `Status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders_has_Status`
--

LOCK TABLES `Orders_has_Status` WRITE;
/*!40000 ALTER TABLE `Orders_has_Status` DISABLE KEYS */;
INSERT INTO `Orders_has_Status` VALUES ('20220095932b9',1,'2020-01-04 09:05:00'),('20220095932b9',2,'2020-01-04 10:17:00'),('2022010569c9r5',1,'2020-01-02 05:00:00'),('202201132a2c',1,'2020-01-27 07:35:00'),('202201132a2c',2,'2020-01-27 09:50:00'),('202201132a2c',3,'2020-01-27 10:30:00'),('202201132a2c',4,'2020-01-27 11:45:21'),('202201132a2c',5,'2020-01-27 12:17:00'),('20220114439fa',1,'2020-01-12 09:21:00'),('20220114439fa',2,'2020-01-12 10:13:00'),('20220114439fa',3,'2020-01-12 11:03:00'),('202201149a2c3',1,'2020-02-04 13:17:00'),('202201149a2c3',2,'2020-02-04 13:50:00'),('202201149a2c3',3,'2020-02-04 14:21:00'),('202201149a2c3',4,'2020-02-04 15:41:00'),('2022015239ac4',1,'2020-02-04 15:41:00');
/*!40000 ALTER TABLE `Orders_has_Status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pharmaceuticals`
--

DROP TABLE IF EXISTS `Pharmaceuticals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Pharmaceuticals` (
  `id_medicament` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `category` char(4) NOT NULL,
  `price` decimal(7,2) DEFAULT NULL,
  PRIMARY KEY (`id_medicament`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pharmaceuticals`
--

LOCK TABLES `Pharmaceuticals` WRITE;
/*!40000 ALTER TABLE `Pharmaceuticals` DISABLE KEYS */;
INSERT INTO `Pharmaceuticals` VALUES ('147AZE963','Doliprane',NULL,'OTC',2.00),('6516541FR','Smecta',NULL,'RX',17.00),('852RTY654','Morphine',NULL,'RX',20.00),('9876Z654','Cotons Tiges',NULL,'PARA',1.00),('987AZ9874','Ibuprophène',NULL,'RX',9.00);
/*!40000 ALTER TABLE `Pharmaceuticals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Roles`
--

DROP TABLE IF EXISTS `Roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Roles` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Roles`
--

LOCK TABLES `Roles` WRITE;
/*!40000 ALTER TABLE `Roles` DISABLE KEYS */;
INSERT INTO `Roles` VALUES (1,'Client'),(2,'Pharmacist'),(3,'Admin');
/*!40000 ALTER TABLE `Roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Status`
--

DROP TABLE IF EXISTS `Status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Status` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Status`
--

LOCK TABLES `Status` WRITE;
/*!40000 ALTER TABLE `Status` DISABLE KEYS */;
INSERT INTO `Status` VALUES (1,'New_order'),(2,'Paid'),(3,'Order_prepared'),(4,'Order_picked_up_by_Couriier'),(5,'Delivered'),(6,'Returned_prescription'),(7,'Delivered_without_prescription');
/*!40000 ALTER TABLE `Status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `lastname` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `GSM` varchar(12) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `date_inscription` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `roles_id` tinyint(3) unsigned NOT NULL,
  `primary_adress_id` int(10) unsigned NOT NULL,
  `pharmacy_name` varchar(255) DEFAULT NULL,
  `secondary_adress_id` int(10) unsigned DEFAULT NULL,
  `national_registration_number` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Utilisateurs_Roles_idx` (`roles_id`),
  KEY `fk_Users_Adress1_idx` (`primary_adress_id`),
  KEY `fk_Users_Adress2_idx` (`secondary_adress_id`),
  CONSTRAINT `fk_Users_Adress1` FOREIGN KEY (`primary_adress_id`) REFERENCES `Adress` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Users_Adress2` FOREIGN KEY (`secondary_adress_id`) REFERENCES `Adress` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `fk_Utilisateurs_Roles` FOREIGN KEY (`roles_id`) REFERENCES `Roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Gingras','Pascaline','PascalineGingras@teleworm.us ','0484950494','password','2020-01-01 00:00:00',1,1,NULL,NULL,'85020100200'),(2,'Chaussée','Tilly','TillyChaussee@rhyta.com ','0476920259','password	','2020-01-01 00:00:00',1,2,NULL,NULL,'85020100200'),(3,'Lamontagne','Fanette','FanetteLamontagne@armyspy.com','0479205811','password','2020-01-01 00:00:00',1,3,NULL,NULL,'85020100200'),(4,'Lejeune','Tristan','TristanLejeune@jourrapide.com','0496494410','password','2020-01-01 00:00:00',1,4,NULL,NULL,'85020100200'),(5,'Grandbois','Perrin','PerrinGrandbois@armyspy.com ','0475370779','password','2020-01-01 00:00:00',1,5,NULL,NULL,'85020100200'),(6,'Deblois','Sydney','SydneyDeblois@rhyta.com ','0482968992','password','2020-01-01 00:00:00',1,6,NULL,NULL,'85020100200'),(7,'Lacasse','Benoît','BenoitLacasse@armyspy.com','0471522836','password','2020-01-01 00:00:00',1,7,NULL,NULL,'85020100200'),(8,'Beauchemin','Mariette','MarietteBeauchemin@rhyta.com ','0495692779','password','2020-01-01 00:00:00',1,8,NULL,NULL,'85020100200'),(9,'Belisle','Peppin','PeppinBelisle@dayrep.com ','0499678836 ','password','2020-01-01 00:00:00',1,9,NULL,NULL,'85020100200'),(10,'Sirois','Avenall','AvenallSirois@jourrapide.com ','0494837452','password','2020-01-01 00:00:00',1,10,NULL,NULL,'85020100200'),(11,'Émond','Arber','ArberEmond@dayrep.com ','0483373675','password','2020-01-01 00:00:00',1,11,NULL,NULL,'85020100200'),(12,'Mainville','Anaïs','AnaisMainville@teleworm.us ','0473209234','password','2020-01-01 00:00:00',1,12,NULL,NULL,'85020100200'),(13,'Potvin','Isabelle','IsabellePotvin@armyspy.com ','0491640072','password','2020-01-01 00:00:00',1,13,NULL,NULL,'85020100200'),(14,'Michaud','Raoul','RaoulMichaud@dayrep.com ','0488104379','password','2020-01-01 00:00:00',1,14,NULL,NULL,'85020100200'),(15,'Nadeau','Raymond','RaymondNadeau@teleworm.us ','0488636273','password','2020-01-01 00:00:00',1,15,NULL,NULL,'85020100200'),(16,'Morneau','Campbell','CampbellMorneau@armyspy.com ','0474526560','password','2020-01-01 00:00:00',1,16,NULL,NULL,'85020100200'),(17,'Thivierge','Fanette','FanetteThivierge@armyspy.com ','0478123108','password','2020-01-01 00:00:00',1,17,NULL,NULL,'85020100200'),(18,'Gaulin','Alice','AliceGaulin@dayrep.com ','0482740985','password','2020-01-01 00:00:00',1,18,NULL,NULL,'85020100200'),(19,'Courcelle','Royden','RoydenCourcelle@dayrep.com ','0486291640','password','2020-01-01 00:00:00',1,19,NULL,NULL,'85020100200'),(20,'Bernard','Leroy','LeroyBernard@armyspy.com','0495653263','password','2020-01-01 00:00:00',1,20,NULL,NULL,'85020100200'),(21,'Primeau','Paulette','PaulettePrimeau@armyspy.com ','0492629993','password','2020-01-01 00:00:00',1,21,NULL,NULL,'85020100200'),(22,'Marquis','Leone','LeoneMarquis@rhyta.com ','0483431509','password','2020-01-01 00:00:00',1,22,NULL,NULL,'85020100200'),(23,'Guay','Mayhew','MayhewGuay@dayrep.com ','0488690214','password','2020-01-01 00:00:00',1,23,NULL,NULL,'85020100200'),(24,'Quinn','Estelle','EstelleQuinn@rhyta.com ','0479754829','password','2020-01-01 00:00:00',1,24,NULL,NULL,'85020100200'),(25,'Royer','Fayme','FaymeRoyer@dayrep.com','0470104746','password','2020-01-01 00:00:00',1,25,NULL,NULL,'85020100200'),(26,'Thivierge','Jay','JayThivierge@armyspy.com','0483443834','password','2020-01-01 00:00:00',1,26,NULL,NULL,'85020100200'),(27,'Lacasse','Inès','InesLacasse@jourrapide.com ','0488669559','password','2020-01-01 00:00:00',1,27,NULL,NULL,'85020100200'),(28,'Trudeau','Curtis','CurtisTrudeau@dayrep.com','0490999555','password','2020-01-01 00:00:00',1,28,NULL,NULL,'85020100200'),(29,'St-Jacques','Zoé','ZoeSt-Jacques@dayrep.com ','0487889538','password','2020-01-01 00:00:00',1,29,NULL,NULL,'85020100200'),(30,'Bussière','Charlotte','CharlotteBussiere@teleworm.us ','0486192623','password','2020-01-01 00:00:00',1,30,NULL,NULL,'85020100200'),(31,'Barrière','Fitz','FitzBarriere@teleworm.us','0474440821','password','2020-01-01 00:00:00',1,31,NULL,NULL,'85020100200'),(32,'Bonenfant','Merlin','MerlinBonenfant@teleworm.us ','0494264467','password','2020-01-01 00:00:00',1,32,NULL,NULL,'85020100200'),(33,'Dupont','Étienne','EtienneDupont@rhyta.com ','0477198731','password','2020-01-01 00:00:00',1,33,NULL,NULL,'85020100200'),(34,'Gauthier','Lucille','LucilleGauthier@dayrep.com ','0493492672','password','2020-01-01 00:00:00',1,34,NULL,NULL,'85020100200'),(35,'Caouette','Marsilius','MarsiliusCaouette@jourrapide.com','0490774731','password','2020-01-01 00:00:00',1,35,NULL,NULL,'85020100200'),(36,'Beauchemin','Jeoffroi','JeoffroiBeauchemin@jourrapide.com','0497258177','password','2020-01-01 00:00:00',1,36,NULL,NULL,'85020100200'),(37,'Tessier','Delmare','DelmareTessier@dayrep.com ','0472322715','password','2020-01-01 00:00:00',1,37,NULL,NULL,'85020100200'),(38,'Dupuy','Georges','GeorgesDupuy@armyspy.com','025118381','password','2020-01-01 00:00:00',2,38,'Reine Pharma Bvba-Sprl',NULL,'85020100200'),(39,'Admin','Admin','admin@admin.admin','0000000000','password','2020-01-01 00:00:00',3,39,NULL,NULL,'85020100200');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-23 17:33:57
