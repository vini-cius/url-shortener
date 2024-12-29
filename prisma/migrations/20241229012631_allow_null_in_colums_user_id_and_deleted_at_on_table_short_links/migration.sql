-- DropForeignKey
ALTER TABLE "short_links" DROP CONSTRAINT "short_links_user_id_fkey";

-- AlterTable
ALTER TABLE "short_links" ALTER COLUMN "deleted_at" DROP NOT NULL,
ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "short_links" ADD CONSTRAINT "short_links_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
