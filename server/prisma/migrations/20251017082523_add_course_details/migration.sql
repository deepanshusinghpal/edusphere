-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "duration" TEXT,
ADD COLUMN     "whatYouWillLearn" TEXT[] DEFAULT ARRAY[]::TEXT[];
