-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `book_authorId_fkey`;

-- DropIndex
DROP INDEX `book_authorId_fkey` ON `book`;

-- AlterTable
ALTER TABLE `book` MODIFY `authorId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `book` ADD CONSTRAINT `book_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `author`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
