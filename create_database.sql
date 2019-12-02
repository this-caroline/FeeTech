-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`amount_available`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`amount_available` (
  `id` INT NOT NULL,
  `amount_available` DECIMAL NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `id` VARCHAR(45) NOT NULL,
  `name` VARCHAR(60) NOT NULL,
  `cpf` VARCHAR(11) NULL,
  `birth_date` DATE NULL,
  `password` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `created_at` DATETIME NOT NULL,
  `removed` TINYINT NULL,
  `updated_at` DATETIME NULL,
  `removed_at` DATETIME NULL,
  `amount_available_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC),
  CONSTRAINT `fk_user_amount_available1`
    FOREIGN KEY (`amount_available_id`)
    REFERENCES `mydb`.`amount_available` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`card_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`card_type` (
  `id` INT NOT NULL,
  `card_type` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`card`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`card` (
  `id` INT NOT NULL,
  `amount` INT NULL,
  `tax` INT NULL,
  `card_name` VARCHAR(45) NULL,
  `card_type_id` INT NOT NULL,
  `removed` TINYINT NULL,
  `deleted_at` DATETIME NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `user_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_card_card_type1`
    FOREIGN KEY (`card_type_id`)
    REFERENCES `mydb`.`card_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_card_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`payment_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`payment_category` (
  `id` INT NOT NULL,
  `category` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`payment` (
  `id` INT NOT NULL,
  `automatic_payment` TINYINT NULL,
  `payment_name` VARCHAR(45) NULL,
  `payment_value` INT NULL,
  `payment_date` DATE NULL,
  `paid` TINYINT NULL,
  `removed` TINYINT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `payment_category_id` INT NULL,
  `amount_available_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_payment_payment_category1`
    FOREIGN KEY (`payment_category_id`)
    REFERENCES `mydb`.`payment_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_payment_amount_available1`
    FOREIGN KEY (`amount_available_id`)
    REFERENCES `mydb`.`amount_available` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`incoming_amount`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`incoming_amount` (
  `id` INT NOT NULL,
  `incoming_name` INT NULL,
  `incoming_amount` INT NULL,
  `incoming_date` DATETIME NULL,
  `amount_available_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_incoming_amount_amount_available1`
    FOREIGN KEY (`amount_available_id`)
    REFERENCES `mydb`.`amount_available` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`address` (
  `id` INT NOT NULL,
  `postcode` INT NULL,
  `state` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `street` VARCHAR(45) NULL,
  `user_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_address_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`access_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`access_log` (
  `id` INT NOT NULL,
  `access_date` DATE NULL,
  `access_location` VARCHAR(45) NULL,
  `access_browser` VARCHAR(45) NULL,
  `access_datetime` DATE NULL,
  `user_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_access_log_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`files`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`files` (
  `id` INT NOT NULL,
  `file_name` VARCHAR(45) NULL,
  `file_url` VARCHAR(45) NULL,
  `file_path` VARCHAR(45) NULL,
  `payment_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_files_payment1`
    FOREIGN KEY (`payment_id`)
    REFERENCES `mydb`.`payment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`card_quota`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`card_quota` (
  `id` INT NOT NULL,
  `automatic_debit` INT NULL,
  `quotas` INT NULL,
  `quota_values` DECIMAL NULL,
  `created_at` DATETIME NULL,
  `removed` TINYINT NULL,
  `payment_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_card_quota_payment1`
    FOREIGN KEY (`payment_id`)
    REFERENCES `mydb`.`payment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
