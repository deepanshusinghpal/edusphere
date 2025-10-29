
-- CreateEnum
CREATE TYPE "Level" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "level" "Level" NOT NULL DEFAULT 'BEGINNER';
