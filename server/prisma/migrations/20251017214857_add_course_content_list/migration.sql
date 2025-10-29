-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "courseContent" TEXT[] DEFAULT ARRAY[]::TEXT[];
