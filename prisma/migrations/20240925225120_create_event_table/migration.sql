-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "allDay" BOOLEAN,
ADD COLUMN     "end" TIMESTAMP(3),
ADD COLUMN     "start" TIMESTAMP(3);
