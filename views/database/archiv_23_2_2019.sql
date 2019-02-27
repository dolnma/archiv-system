-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Sob 23. úno 2019, 01:51
-- Verze serveru: 10.1.33-MariaDB
-- Verze PHP: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `archiv`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `logs`
--

CREATE TABLE `logs` (
  `id` int(5) NOT NULL,
  `server_id` int(5) NOT NULL,
  `message` varchar(255) COLLATE utf8_bin NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Struktura tabulky `permissions`
--

CREATE TABLE `permissions` (
  `id` int(5) NOT NULL,
  `a` tinyint(1) NOT NULL,
  `b` tinyint(1) NOT NULL,
  `c` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Struktura tabulky `servers`
--

CREATE TABLE `servers` (
  `id` int(5) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `description` varchar(255) COLLATE utf8_bin NOT NULL,
  `ip` int(20) NOT NULL,
  `port` int(5) NOT NULL,
  `type_id` int(11) NOT NULL,
  `platform` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Struktura tabulky `type`
--

CREATE TABLE `type` (
  `id` int(5) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Struktura tabulky `users`
--

CREATE TABLE `users` (
  `id` int(5) NOT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL,
  `username` varchar(255) COLLATE utf8_bin NOT NULL,
  `password` varchar(200) COLLATE utf8_bin NOT NULL,
  `reg_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `permission_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Klíče pro exportované tabulky
--

--
-- Klíče pro tabulku `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `server_id` (`server_id`);

--
-- Klíče pro tabulku `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `servers`
--
ALTER TABLE `servers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`);

--
-- Klíče pro tabulku `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `permission_id` (`permission_id`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `servers`
--
ALTER TABLE `servers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `type`
--
ALTER TABLE `type`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `users`
--
ALTER TABLE `users`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `servers`
--
ALTER TABLE `servers`
  ADD CONSTRAINT `servers_ibfk_1` FOREIGN KEY (`id`) REFERENCES `logs` (`server_id`);

--
-- Omezení pro tabulku `type`
--
ALTER TABLE `type`
  ADD CONSTRAINT `type_ibfk_1` FOREIGN KEY (`id`) REFERENCES `servers` (`type_id`);

--
-- Omezení pro tabulku `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
