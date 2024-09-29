-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "comments" DROP NOT NULL,
ALTER COLUMN "comments" SET DEFAULT 0,
ALTER COLUMN "comments" DROP DEFAULT;
DROP SEQUENCE "Task_comments_seq";
