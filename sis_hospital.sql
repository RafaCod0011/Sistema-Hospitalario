/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.7.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: sis_hospital
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `admisiones`
--

DROP TABLE IF EXISTS `admisiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `admisiones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identidad_medica_id` int(11) NOT NULL,
  `recepcionista_id` int(11) NOT NULL,
  `fecha_admision` datetime NOT NULL,
  `motivo_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `identidad_medica_id` (`identidad_medica_id`),
  KEY `recepcionista_id` (`recepcionista_id`),
  KEY `motivo_id` (`motivo_id`),
  CONSTRAINT `admisiones_ibfk_655` FOREIGN KEY (`identidad_medica_id`) REFERENCES `identidades_medicas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `admisiones_ibfk_656` FOREIGN KEY (`recepcionista_id`) REFERENCES `recepcionistas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `admisiones_ibfk_657` FOREIGN KEY (`motivo_id`) REFERENCES `admisiones_motivo` (`motivo_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admisiones`
--

LOCK TABLES `admisiones` WRITE;
/*!40000 ALTER TABLE `admisiones` DISABLE KEYS */;
/*!40000 ALTER TABLE `admisiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admisiones_motivo`
--

DROP TABLE IF EXISTS `admisiones_motivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `admisiones_motivo` (
  `motivo_id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`motivo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admisiones_motivo`
--

LOCK TABLES `admisiones_motivo` WRITE;
/*!40000 ALTER TABLE `admisiones_motivo` DISABLE KEYS */;
INSERT INTO `admisiones_motivo` VALUES
(1,'Cirugía electiva programada'),
(2,'Descompensación de enfermedad crónica'),
(3,'Infección grave/sepsis'),
(4,'Traumatismo grave/politraumatismo'),
(5,'Accidente cerebrovascular (ACV)'),
(6,'Infarto agudo de miocardio'),
(7,'Insuficiencia respiratoria aguda'),
(8,'Cuadro neurológico agudo (convulsiones, alteración de conciencia)'),
(9,'Complicaciones post-operatorias'),
(10,'Emergencia obstétrica (preeclampsia, hemorragia, trabajo de parto pretérmino)'),
(11,'Deshidratación/alteración hidroelectrolítica grave'),
(12,'Intoxicación/sobredosis medicamentosa'),
(13,'Enfermedad oncológica (quimioterapia/complicaciones)'),
(14,'Crisis hipertensiva'),
(15,'Pancreatitis aguda'),
(16,'Hemorragia digestiva'),
(17,'Insuficiencia renal aguda'),
(18,'Emergencia psiquiátrica (riesgo auto/hetero-lesivo)'),
(19,'Reingreso programado para tratamiento'),
(20,'Transferencia de otro centro asistencial'),
(21,'Cuidados paliativos en fase aguda'),
(22,'Monitorización intensiva (arritmias, inestabilidad hemodinámica)'),
(23,'Ingreso por emergencia critica');
/*!40000 ALTER TABLE `admisiones_motivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alergias`
--

DROP TABLE IF EXISTS `alergias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `alergias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `descripcion` (`descripcion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alergias`
--

LOCK TABLES `alergias` WRITE;
/*!40000 ALTER TABLE `alergias` DISABLE KEYS */;
/*!40000 ALTER TABLE `alergias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `altas_medicas`
--

DROP TABLE IF EXISTS `altas_medicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `altas_medicas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `internacion_id` int(11) NOT NULL,
  `profesional_id` int(11) NOT NULL,
  `fecha_alta` timestamp NOT NULL DEFAULT current_timestamp(),
  `recomendaciones` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `internacion_id` (`internacion_id`),
  KEY `profesional_id` (`profesional_id`),
  CONSTRAINT `altas_medicas_ibfk_1` FOREIGN KEY (`internacion_id`) REFERENCES `internaciones` (`id`),
  CONSTRAINT `altas_medicas_ibfk_2` FOREIGN KEY (`profesional_id`) REFERENCES `profesionales` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `altas_medicas`
--

LOCK TABLES `altas_medicas` WRITE;
/*!40000 ALTER TABLE `altas_medicas` DISABLE KEYS */;
/*!40000 ALTER TABLE `altas_medicas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `antecedentes_medicos`
--

DROP TABLE IF EXISTS `antecedentes_medicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `antecedentes_medicos` (
  `id` int(11) NOT NULL,
  `identidad_medica_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `identidad_medica_id` (`identidad_medica_id`),
  CONSTRAINT `antecedentes_medicos_ibfk_1` FOREIGN KEY (`identidad_medica_id`) REFERENCES `identidades_medicas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `antecedentes_medicos`
--

LOCK TABLES `antecedentes_medicos` WRITE;
/*!40000 ALTER TABLE `antecedentes_medicos` DISABLE KEYS */;
/*!40000 ALTER TABLE `antecedentes_medicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `camas`
--

DROP TABLE IF EXISTS `camas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `camas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `habitacion_id` int(11) NOT NULL,
  `numero_en_habitacion` int(11) DEFAULT NULL,
  `estado` enum('libre','ocupado') DEFAULT 'libre',
  `higienizada` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `habitacion_id` (`habitacion_id`,`numero_en_habitacion`),
  CONSTRAINT `camas_ibfk_1` FOREIGN KEY (`habitacion_id`) REFERENCES `habitaciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `camas`
--

LOCK TABLES `camas` WRITE;
/*!40000 ALTER TABLE `camas` DISABLE KEYS */;
INSERT INTO `camas` VALUES
(3,11,1,'libre',1),
(4,11,2,'libre',1),
(5,12,1,'libre',1),
(6,13,1,'libre',1),
(7,13,2,'libre',1),
(8,14,1,'libre',1),
(9,15,1,'libre',1),
(10,15,2,'libre',1),
(11,28,1,'libre',1),
(12,29,1,'libre',1),
(13,29,2,'libre',1),
(14,30,1,'libre',1),
(15,30,2,'libre',1),
(16,31,1,'libre',1),
(17,31,2,'libre',1),
(18,32,1,'libre',1),
(19,33,1,'libre',1),
(20,34,1,'libre',1),
(21,35,1,'libre',1),
(22,36,1,'libre',1),
(23,37,1,'libre',1),
(24,38,1,'libre',1),
(25,38,2,'libre',1),
(26,39,1,'libre',1),
(27,39,2,'libre',1),
(28,40,1,'libre',1),
(29,41,1,'libre',1),
(30,41,2,'libre',1),
(31,42,1,'libre',1),
(32,42,2,'libre',1),
(33,43,1,'libre',1),
(34,44,1,'libre',1),
(35,45,1,'libre',1),
(36,45,2,'libre',1),
(37,46,1,'libre',1),
(38,46,2,'libre',1),
(39,47,1,'libre',1),
(40,48,1,'libre',1),
(41,48,2,'libre',1),
(42,49,1,'libre',1),
(43,49,2,'libre',1),
(44,50,1,'libre',1),
(45,50,2,'libre',1),
(46,51,1,'libre',1),
(47,51,2,'libre',1),
(48,52,1,'libre',1),
(49,52,2,'libre',1);
/*!40000 ALTER TABLE `camas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cirugias`
--

DROP TABLE IF EXISTS `cirugias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cirugias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cirugias`
--

LOCK TABLES `cirugias` WRITE;
/*!40000 ALTER TABLE `cirugias` DISABLE KEYS */;
/*!40000 ALTER TABLE `cirugias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enfermedades`
--

DROP TABLE IF EXISTS `enfermedades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `enfermedades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enfermedades`
--

LOCK TABLES `enfermedades` WRITE;
/*!40000 ALTER TABLE `enfermedades` DISABLE KEYS */;
/*!40000 ALTER TABLE `enfermedades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialidad`
--

DROP TABLE IF EXISTS `especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialidad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `descripcion` (`descripcion`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidad`
--

LOCK TABLES `especialidad` WRITE;
/*!40000 ALTER TABLE `especialidad` DISABLE KEYS */;
INSERT INTO `especialidad` VALUES
(1,'Cardiología'),
(2,'Dermatología'),
(5,'Ginecología'),
(3,'Neurología'),
(6,'Oftalmología'),
(9,'Oncología'),
(7,'Ortopedia'),
(4,'Pediatría'),
(8,'Psiquiatría'),
(10,'Urología');
/*!40000 ALTER TABLE `especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudios`
--

DROP TABLE IF EXISTS `estudios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudios`
--

LOCK TABLES `estudios` WRITE;
/*!40000 ALTER TABLE `estudios` DISABLE KEYS */;
/*!40000 ALTER TABLE `estudios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evoluciones_enfermeria`
--

DROP TABLE IF EXISTS `evoluciones_enfermeria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `evoluciones_enfermeria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `internacion_id` int(11) NOT NULL,
  `profesional_id` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `presion_arterial` varchar(20) DEFAULT NULL,
  `frecuencia_cardiaca` varchar(20) DEFAULT NULL,
  `frecuencia_respiratoria` varchar(20) DEFAULT NULL,
  `temperatura` varchar(20) DEFAULT NULL,
  `saturacion_oxigeno` varchar(20) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `internacion_id` (`internacion_id`),
  KEY `profesional_id` (`profesional_id`),
  CONSTRAINT `evoluciones_enfermeria_ibfk_1` FOREIGN KEY (`internacion_id`) REFERENCES `internaciones` (`id`),
  CONSTRAINT `evoluciones_enfermeria_ibfk_2` FOREIGN KEY (`profesional_id`) REFERENCES `profesionales` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evoluciones_enfermeria`
--

LOCK TABLES `evoluciones_enfermeria` WRITE;
/*!40000 ALTER TABLE `evoluciones_enfermeria` DISABLE KEYS */;
/*!40000 ALTER TABLE `evoluciones_enfermeria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evoluciones_medicas`
--

DROP TABLE IF EXISTS `evoluciones_medicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `evoluciones_medicas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `internacion_id` int(11) NOT NULL,
  `profesional_id` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `diagnostico` text DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `indicaciones` text DEFAULT NULL,
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `internacion_id` (`internacion_id`),
  KEY `profesional_id` (`profesional_id`),
  CONSTRAINT `evoluciones_medicas_ibfk_1` FOREIGN KEY (`internacion_id`) REFERENCES `internaciones` (`id`),
  CONSTRAINT `evoluciones_medicas_ibfk_2` FOREIGN KEY (`profesional_id`) REFERENCES `profesionales` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evoluciones_medicas`
--

LOCK TABLES `evoluciones_medicas` WRITE;
/*!40000 ALTER TABLE `evoluciones_medicas` DISABLE KEYS */;
/*!40000 ALTER TABLE `evoluciones_medicas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habitaciones`
--

DROP TABLE IF EXISTS `habitaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `habitaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sala_id` int(11) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `capacidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sala_id` (`sala_id`),
  CONSTRAINT `habitaciones_ibfk_1` FOREIGN KEY (`sala_id`) REFERENCES `salas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitaciones`
--

LOCK TABLES `habitaciones` WRITE;
/*!40000 ALTER TABLE `habitaciones` DISABLE KEYS */;
INSERT INTO `habitaciones` VALUES
(11,1,'101',2),
(12,1,'102',1),
(13,1,'103',2),
(14,1,'104',1),
(15,1,'105',2),
(28,2,'Quirófano ',1),
(29,2,'Recuperaci',2),
(30,2,'Recuperaci',2),
(31,2,'Pre-operat',2),
(32,2,'Post-opera',1),
(33,3,'UCI-1',1),
(34,3,'UCI-2',1),
(35,3,'UCI-3',1),
(36,3,'UCI-4',1),
(37,3,'UCI-5',1),
(38,4,'P-101',2),
(39,4,'P-102',2),
(40,4,'P-103',1),
(41,4,'P-104',2),
(42,4,'P-105',2),
(43,5,'Trabajo Pa',1),
(44,5,'Trabajo Pa',1),
(45,5,'Postparto ',2),
(46,5,'Postparto ',2),
(47,5,'Acompañami',1),
(48,6,'E - 1',2),
(49,6,'E - 2',2),
(50,6,'E - 3',2),
(51,6,'E - 4',2),
(52,6,'E - 5',2);
/*!40000 ALTER TABLE `habitaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `identidades_medicas`
--

DROP TABLE IF EXISTS `identidades_medicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `identidades_medicas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `persona_id` int(11) DEFAULT NULL,
  `paciente_id` int(11) DEFAULT NULL,
  `es_temporal` tinyint(1) DEFAULT 1,
  `codigo_temp` varchar(255) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_temp` (`codigo_temp`),
  KEY `paciente_id` (`paciente_id`),
  KEY `persona_id` (`persona_id`),
  CONSTRAINT `identidades_medicas_ibfk_171` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `identidades_medicas_ibfk_172` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `identidades_medicas`
--

LOCK TABLES `identidades_medicas` WRITE;
/*!40000 ALTER TABLE `identidades_medicas` DISABLE KEYS */;
/*!40000 ALTER TABLE `identidades_medicas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `internacion_estudios`
--

DROP TABLE IF EXISTS `internacion_estudios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `internacion_estudios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `internacion_id` int(11) NOT NULL,
  `estudio_id` int(11) NOT NULL,
  `profesional_id` int(11) NOT NULL,
  `fecha_hora` datetime NOT NULL DEFAULT current_timestamp(),
  `resultados` text DEFAULT NULL,
  `estado` enum('solicitado','realizado','cancelado') NOT NULL DEFAULT 'solicitado',
  PRIMARY KEY (`id`),
  KEY `internacion_id` (`internacion_id`),
  KEY `estudio_id` (`estudio_id`),
  KEY `profesional_id` (`profesional_id`),
  CONSTRAINT `internacion_estudios_ibfk_1` FOREIGN KEY (`internacion_id`) REFERENCES `internaciones` (`id`),
  CONSTRAINT `internacion_estudios_ibfk_2` FOREIGN KEY (`estudio_id`) REFERENCES `estudios` (`id`),
  CONSTRAINT `internacion_estudios_ibfk_3` FOREIGN KEY (`profesional_id`) REFERENCES `profesionales` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internacion_estudios`
--

LOCK TABLES `internacion_estudios` WRITE;
/*!40000 ALTER TABLE `internacion_estudios` DISABLE KEYS */;
/*!40000 ALTER TABLE `internacion_estudios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `internacion_medicamentos`
--

DROP TABLE IF EXISTS `internacion_medicamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `internacion_medicamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `internacion_id` int(11) NOT NULL,
  `medicamento_id` int(11) NOT NULL,
  `profesional_id` int(11) NOT NULL,
  `fecha_hora` datetime NOT NULL DEFAULT current_timestamp(),
  `dosis` varchar(50) NOT NULL,
  `via_id` int(11) NOT NULL,
  `frecuencia` varchar(50) NOT NULL,
  `observaciones` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `via_id` (`via_id`),
  KEY `internacion_id` (`internacion_id`),
  KEY `medicamento_id` (`medicamento_id`),
  KEY `profesional_id` (`profesional_id`),
  CONSTRAINT `internacion_medicamentos_ibfk_1` FOREIGN KEY (`via_id`) REFERENCES `vias_administracion` (`id`),
  CONSTRAINT `internacion_medicamentos_ibfk_2` FOREIGN KEY (`internacion_id`) REFERENCES `internaciones` (`id`),
  CONSTRAINT `internacion_medicamentos_ibfk_3` FOREIGN KEY (`medicamento_id`) REFERENCES `medicamentos` (`id`),
  CONSTRAINT `internacion_medicamentos_ibfk_4` FOREIGN KEY (`profesional_id`) REFERENCES `profesionales` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internacion_medicamentos`
--

LOCK TABLES `internacion_medicamentos` WRITE;
/*!40000 ALTER TABLE `internacion_medicamentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `internacion_medicamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `internaciones`
--

DROP TABLE IF EXISTS `internaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `internaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admision_id` int(11) NOT NULL,
  `fecha_ingreso` datetime NOT NULL,
  `cama_id` int(11) DEFAULT NULL,
  `estado` enum('en curso','egresado') NOT NULL DEFAULT 'en curso',
  PRIMARY KEY (`id`),
  KEY `admision_id` (`admision_id`),
  KEY `cama_id` (`cama_id`),
  CONSTRAINT `internaciones_ibfk_375` FOREIGN KEY (`admision_id`) REFERENCES `admisiones` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `internaciones_ibfk_376` FOREIGN KEY (`cama_id`) REFERENCES `camas` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internaciones`
--

LOCK TABLES `internaciones` WRITE;
/*!40000 ALTER TABLE `internaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `internaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicamentos`
--

DROP TABLE IF EXISTS `medicamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `presentacion` varchar(100) DEFAULT NULL,
  `concentracion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicamentos`
--

LOCK TABLES `medicamentos` WRITE;
/*!40000 ALTER TABLE `medicamentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `medicamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `obras_sociales`
--

DROP TABLE IF EXISTS `obras_sociales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `obras_sociales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `codigo` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obras_sociales`
--

LOCK TABLES `obras_sociales` WRITE;
/*!40000 ALTER TABLE `obras_sociales` DISABLE KEYS */;
INSERT INTO `obras_sociales` VALUES
(1,'PAMI','001'),
(2,'OSDE','002'),
(3,'Swiss Medical','003'),
(4,'Galeno','004'),
(5,'Medifé','005'),
(6,'Omint','006'),
(7,'Unión Personal','007'),
(8,'Hospital Italiano','008'),
(9,'Sancor Salud','009'),
(10,'Acudir','010'),
(11,'OSPE','011'),
(12,'OSDIPP','012'),
(13,'Activa Salud','013'),
(14,'Obra Social de Petroleros','014'),
(15,'Obra Social Ferroviaria','015'),
(16,'Obra Social Bancaria','016'),
(17,'IOMA','017'),
(18,'Otro','999');
/*!40000 ALTER TABLE `obras_sociales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pacientes`
--

DROP TABLE IF EXISTS `pacientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `obra_social_id` int(11) DEFAULT NULL,
  `contacto_emergencia` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `obra_social_id` (`obra_social_id`),
  CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`obra_social_id`) REFERENCES `obras_sociales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pacientes`
--

LOCK TABLES `pacientes` WRITE;
/*!40000 ALTER TABLE `pacientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `pacientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personas`
--

DROP TABLE IF EXISTS `personas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `personas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `es_temporal` tinyint(1) DEFAULT 0,
  `observaciones` text DEFAULT NULL,
  `genero` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personas`
--

LOCK TABLES `personas` WRITE;
/*!40000 ALTER TABLE `personas` DISABLE KEYS */;
INSERT INTO `personas` VALUES
(1,'Juan Pérez','20345678','1985-03-15','Av. Corrientes 1234, CABA','1123456789','juan.perez@gmail.com',0,NULL,'M'),
(2,'María González','27890123','1990-07-22','Calle Florida 550, CABA','1198765432','maria.gonzalez@hotmail.com',0,NULL,'F'),
(3,'Carlos Ramírez','15432109','1978-12-05','Av. Santa Fe 2100, CABA','1111223344','carlos.ramirez@yahoo.com',0,NULL,'M'),
(4,'Lucía Fernández','30210456','1995-01-30','Calle Lavalle 780, CABA','1155667788','lucia.fernandez@gmail.com',0,NULL,'F'),
(5,'Matías López','18765432','1982-09-14','Av. Belgrano 1400, CABA','1166778899','matias.lopez@hotmail.com',0,NULL,'M'),
(6,'Sofía Martínez','23456789','1988-11-02','Calle Suipacha 300, CABA','1177889900','sofia.martinez@yahoo.com',0,NULL,'F'),
(7,'Diego Torres','12345678','1975-05-20','Av. Rivadavia 2500, CABA','1188990011','diego.torres@gmail.com',0,NULL,'M'),
(8,'Valentina Díaz','29876543','1992-04-10','Calle Perú 500, CABA','1199001122','valentina.diaz@hotmail.com',0,NULL,'F'),
(9,'Gonzalo Castro','16543210','1980-08-28','Av. Callao 1600, CABA','1110102020','gonzalo.castro@yahoo.com',0,NULL,'M'),
(10,'Florencia Ruiz','24321098','1993-02-17','Calle Tucumán 1200, CABA','1130304040','florencia.ruiz@gmail.com',0,NULL,'F'),
(11,'Federico Gómez','19012345','1986-06-05','Av. Independencia 800, CABA','1150506060','federico.gomez@hotmail.com',0,NULL,'M'),
(12,'Camila Sánchez','28901234','1991-10-25','Calle Alsina 900, CABA','1170708080','camila.sanchez@yahoo.com',0,NULL,'F'),
(13,'Martín Herrera','17234569','1979-03-11','Av. Mitre 1100, Quilmes, GBA','1190900101','martin.herrera@gmail.com',0,NULL,'M'),
(14,'Julieta Romero','22109876','1994-12-19','Calle Brown 1300, La Plata, BA','2212123434','julieta.romero@hotmail.com',0,NULL,'F'),
(15,'Santiago Medina','14567890','1983-07-07','Av. Hipólito Yrigoyen 500, Lomas','1114145656','santiago.medina@yahoo.com',0,NULL,'M'),
(16,'Agustina Oliva','26543210','1996-05-23','Calle Moreno 200, Rosario, SF','3416167878','agustina.oliva@gmail.com',0,NULL,'F'),
(17,'Nicolás Cabrera','21098765','1981-09-09','Av. Belgrano 700, Córdoba, CB','3518189090','nicolas.cabrera@hotmail.com',0,NULL,'M'),
(18,'Martina Vega','25678901','1997-11-30','Calle San Juan 400, Mendoza, MZA','2612020123','martina.vega@yahoo.com',0,NULL,'F'),
(19,'Andrés Blanco','13456789','1977-02-14','Av. España 250, San Luis, SLP','2662323343','andres.blanco@gmail.com',0,NULL,'M'),
(20,'Ana Ruiz','31234567','1998-08-03','Calle San Martín 600, Salta, SLP','3872525566','ana.ruiz@hotmail.com',0,NULL,'F'),
(21,'Rafael Nicolas Cuello','39396258','2025-04-01','Ana Maria Galetti 719','543544409860','nicolascuello12@gmail.com',0,NULL,'M');
/*!40000 ALTER TABLE `personas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesionales`
--

DROP TABLE IF EXISTS `profesionales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesionales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `persona_id` int(11) DEFAULT NULL,
  `profesional_salud` enum('Medico','Enfermero') DEFAULT NULL,
  `especialidad_id` int(11) DEFAULT NULL,
  `matricula` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `matricula` (`matricula`),
  KEY `persona_id` (`persona_id`),
  KEY `especialidad_id` (`especialidad_id`),
  CONSTRAINT `profesionales_ibfk_483` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `profesionales_ibfk_484` FOREIGN KEY (`especialidad_id`) REFERENCES `especialidad` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesionales`
--

LOCK TABLES `profesionales` WRITE;
/*!40000 ALTER TABLE `profesionales` DISABLE KEYS */;
INSERT INTO `profesionales` VALUES
(1,3,'Medico',1,'MED001','2025-06-06 09:00:00','2025-06-06 09:00:00'),
(2,11,'Medico',10,'MED002A','2025-06-06 09:00:00','2025-06-06 09:00:00'),
(3,4,'Enfermero',1,'ENF001','2025-06-06 09:00:00','2025-06-06 09:00:00'),
(4,6,'Enfermero',10,'ENF002B','2025-06-06 09:00:00','2025-06-06 09:00:00'),
(5,9,'Enfermero',5,'ENF003','2025-06-06 09:00:00','2025-06-06 09:00:00'),
(6,14,'Enfermero',3,'98658745','2025-06-07 19:38:32','2025-06-07 19:38:32');
/*!40000 ALTER TABLE `profesionales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recepcionistas`
--

DROP TABLE IF EXISTS `recepcionistas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `recepcionistas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `persona_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `persona_id` (`persona_id`),
  CONSTRAINT `recepcionistas_ibfk_1` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recepcionistas`
--

LOCK TABLES `recepcionistas` WRITE;
/*!40000 ALTER TABLE `recepcionistas` DISABLE KEYS */;
INSERT INTO `recepcionistas` VALUES
(1,16,'2025-06-06 09:00:00','2025-06-06 09:00:00');
/*!40000 ALTER TABLE `recepcionistas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receta_medicamentos`
--

DROP TABLE IF EXISTS `receta_medicamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `receta_medicamentos` (
  `receta_id` int(11) NOT NULL,
  `medicamento_id` int(11) NOT NULL,
  `dosis` varchar(50) NOT NULL,
  `frecuencia` varchar(50) NOT NULL,
  `duracion` varchar(50) NOT NULL,
  PRIMARY KEY (`receta_id`,`medicamento_id`),
  KEY `medicamento_id` (`medicamento_id`),
  CONSTRAINT `receta_medicamentos_ibfk_1` FOREIGN KEY (`receta_id`) REFERENCES `recetas_medicas` (`id`),
  CONSTRAINT `receta_medicamentos_ibfk_2` FOREIGN KEY (`medicamento_id`) REFERENCES `medicamentos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receta_medicamentos`
--

LOCK TABLES `receta_medicamentos` WRITE;
/*!40000 ALTER TABLE `receta_medicamentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `receta_medicamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recetas_medicas`
--

DROP TABLE IF EXISTS `recetas_medicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `recetas_medicas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alta_medica_id` int(11) NOT NULL,
  `fecha_prescripcion` date NOT NULL,
  `indicaciones` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `alta_medica_id` (`alta_medica_id`),
  CONSTRAINT `recetas_medicas_ibfk_1` FOREIGN KEY (`alta_medica_id`) REFERENCES `altas_medicas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recetas_medicas`
--

LOCK TABLES `recetas_medicas` WRITE;
/*!40000 ALTER TABLE `recetas_medicas` DISABLE KEYS */;
/*!40000 ALTER TABLE `recetas_medicas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registro_alergia`
--

DROP TABLE IF EXISTS `registro_alergia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `registro_alergia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `antecedente_id` int(11) NOT NULL,
  `alergia_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `antecedente_id` (`antecedente_id`),
  KEY `alergia_id` (`alergia_id`),
  CONSTRAINT `registro_alergia_ibfk_1` FOREIGN KEY (`antecedente_id`) REFERENCES `antecedentes_medicos` (`id`),
  CONSTRAINT `registro_alergia_ibfk_2` FOREIGN KEY (`alergia_id`) REFERENCES `alergias` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registro_alergia`
--

LOCK TABLES `registro_alergia` WRITE;
/*!40000 ALTER TABLE `registro_alergia` DISABLE KEYS */;
/*!40000 ALTER TABLE `registro_alergia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registro_cirugias`
--

DROP TABLE IF EXISTS `registro_cirugias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `registro_cirugias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `antecedente_id` int(11) NOT NULL,
  `cirugia_id` int(11) NOT NULL,
  `observaciones` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `antecedente_id` (`antecedente_id`),
  KEY `cirugia_id` (`cirugia_id`),
  CONSTRAINT `registro_cirugia_ibfk_1` FOREIGN KEY (`antecedente_id`) REFERENCES `antecedentes_medicos` (`id`),
  CONSTRAINT `registro_cirugia_ibfk_2` FOREIGN KEY (`cirugia_id`) REFERENCES `cirugias` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registro_cirugias`
--

LOCK TABLES `registro_cirugias` WRITE;
/*!40000 ALTER TABLE `registro_cirugias` DISABLE KEYS */;
/*!40000 ALTER TABLE `registro_cirugias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registro_enfermedades`
--

DROP TABLE IF EXISTS `registro_enfermedades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `registro_enfermedades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `antecedente_id` int(11) NOT NULL,
  `enfermedad_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `antecedente_id` (`antecedente_id`),
  KEY `enfermedad_id` (`enfermedad_id`),
  CONSTRAINT `registro_enfermedades_ibfk_1` FOREIGN KEY (`antecedente_id`) REFERENCES `antecedentes_medicos` (`id`),
  CONSTRAINT `registro_enfermedades_ibfk_2` FOREIGN KEY (`enfermedad_id`) REFERENCES `enfermedades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registro_enfermedades`
--

LOCK TABLES `registro_enfermedades` WRITE;
/*!40000 ALTER TABLE `registro_enfermedades` DISABLE KEYS */;
/*!40000 ALTER TABLE `registro_enfermedades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registro_medicamentos`
--

DROP TABLE IF EXISTS `registro_medicamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `registro_medicamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `antecedente_id` int(11) NOT NULL,
  `medicamento_id` int(11) NOT NULL,
  `dosis` varchar(100) DEFAULT NULL,
  `via_administracion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `antecedente_id` (`antecedente_id`),
  KEY `medicamento_id` (`medicamento_id`),
  CONSTRAINT `registro_medicamentos_ibfk_1` FOREIGN KEY (`antecedente_id`) REFERENCES `antecedentes_medicos` (`id`),
  CONSTRAINT `registro_medicamentos_ibfk_2` FOREIGN KEY (`medicamento_id`) REFERENCES `medicamentos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registro_medicamentos`
--

LOCK TABLES `registro_medicamentos` WRITE;
/*!40000 ALTER TABLE `registro_medicamentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `registro_medicamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registro_sintomas`
--

DROP TABLE IF EXISTS `registro_sintomas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `registro_sintomas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `antecedente_id` int(11) NOT NULL,
  `sintoma_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `antecedente_id` (`antecedente_id`),
  KEY `sintoma_id` (`sintoma_id`),
  CONSTRAINT `registro_sintoma_ibfk_1` FOREIGN KEY (`antecedente_id`) REFERENCES `antecedentes_medicos` (`id`),
  CONSTRAINT `registro_sintoma_ibfk_2` FOREIGN KEY (`sintoma_id`) REFERENCES `sintomas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registro_sintomas`
--

LOCK TABLES `registro_sintomas` WRITE;
/*!40000 ALTER TABLE `registro_sintomas` DISABLE KEYS */;
/*!40000 ALTER TABLE `registro_sintomas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES
(4,'Admin'),
(2,'Enfermero'),
(1,'Medico'),
(3,'Recepcionista');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salas`
--

DROP TABLE IF EXISTS `salas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `salas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salas`
--

LOCK TABLES `salas` WRITE;
/*!40000 ALTER TABLE `salas` DISABLE KEYS */;
INSERT INTO `salas` VALUES
(1,'Medicina Interna','Atención de pacientes adultos con patologías generales'),
(2,'Cirugía General','Pre y post operatorio de cirugías programadas'),
(3,'Cuidados Intensivos','Unidad de Terapia Intensiva para pacientes críticos'),
(4,'Pediatría','Atención para pacientes menores de 16 años'),
(5,'Maternidad','Atención para embarazos y partos'),
(6,'Emergencias','Atencion por riesgo de vida del paciente');
/*!40000 ALTER TABLE `salas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sintomas`
--

DROP TABLE IF EXISTS `sintomas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sintomas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `descripcion` (`descripcion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sintomas`
--

LOCK TABLES `sintomas` WRITE;
/*!40000 ALTER TABLE `sintomas` DISABLE KEYS */;
/*!40000 ALTER TABLE `sintomas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `creado_en` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_roles`
--

DROP TABLE IF EXISTS `usuarios_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_roles` (
  `usuario_id` int(11) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`usuario_id`,`rol_id`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `usuarios_roles_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `usuarios_roles_ibfk_2` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_roles`
--

LOCK TABLES `usuarios_roles` WRITE;
/*!40000 ALTER TABLE `usuarios_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vias_administracion`
--

DROP TABLE IF EXISTS `vias_administracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `vias_administracion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vias_administracion`
--

LOCK TABLES `vias_administracion` WRITE;
/*!40000 ALTER TABLE `vias_administracion` DISABLE KEYS */;
/*!40000 ALTER TABLE `vias_administracion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'sis_hospital'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-06-07 20:36:36
