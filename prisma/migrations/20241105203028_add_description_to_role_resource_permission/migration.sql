-- AlterTable
ALTER TABLE `permissions` ADD COLUMN `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `resources` ADD COLUMN `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `roles` ADD COLUMN `description` VARCHAR(191) NULL;
