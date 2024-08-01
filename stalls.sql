-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 14, 2024 at 11:33 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foodfinder`
--

-- --------------------------------------------------------

--
-- Table structure for table `stalls`
--

CREATE TABLE `stalls` (
  `stallId` int(11) NOT NULL,
  `stallName` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `price` double(10,2) NOT NULL,
  `cuisine` varchar(100) NOT NULL,
  `halal` varchar(3) NOT NULL,
  `picture` varchar(1000) DEFAULT NULL,
  `currenttime` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stalls`
--

INSERT INTO `stalls` (`stallId`, `stallName`, `location`, `price`, `cuisine`, `halal`, `picture`, `currenttime`) VALUES
(1, 'Chicken Rice', 'Bedok', 5.00, 'Chinese', 'No', 'chicken-rice-desktop.png', '06/26/2024 15:55:20'),
(2, 'Roti Prata', 'Bedok', 5.00, 'Indian', 'Yes', 'roti-prata-desktop.png', '06/26/2024 15:55:20'),
(3, 'Chilli Crab', 'Bugis', 5.00, 'Chinese', 'No', 'chilli-crab-desktop.png', '06/26/2024 15:55:20'),
(4, 'Nasi Lemak', 'Tampines', 5.00, 'Malay ', 'Yes', 'nasi-lemak-desktop.png', '06/26/2024 15:55:20'),
(7, 'Ramen', 'Bedok', 7.00, 'Japanese', 'No', '1720949487157.jpg', '07/14/2024 17:31:05'),
(8, 'Duck Rice', 'Bedok', 5.00, 'Chinese', 'No', '1720949514525.jpg', '07/14/2024 17:31:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `stalls`
--
ALTER TABLE `stalls`
  ADD PRIMARY KEY (`stallId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `stalls`
--
ALTER TABLE `stalls`
  MODIFY `stallId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
