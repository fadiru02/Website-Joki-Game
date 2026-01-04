/*
  Warnings:

  - You are about to alter the column `base_price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- DropIndex
DROP INDEX `Product_slug_key` ON `product`;

-- AlterTable
ALTER TABLE `product` MODIFY `description` VARCHAR(191) NOT NULL,
    MODIFY `base_price` DECIMAL(10, 2) NOT NULL;
