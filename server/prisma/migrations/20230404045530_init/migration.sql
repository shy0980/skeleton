/*
  Warnings:

  - Added the required column `atr1` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atr2` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atr3` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atr4` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `etc1` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `etc2` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `etc3` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "atr1" TEXT NOT NULL,
ADD COLUMN     "atr2" TEXT NOT NULL,
ADD COLUMN     "atr3" TEXT NOT NULL,
ADD COLUMN     "atr4" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "etc1" INTEGER NOT NULL,
ADD COLUMN     "etc2" TEXT NOT NULL,
ADD COLUMN     "etc3" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Intrest" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Intrest_pkey" PRIMARY KEY ("userId","postId")
);

-- AddForeignKey
ALTER TABLE "Intrest" ADD CONSTRAINT "Intrest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intrest" ADD CONSTRAINT "Intrest_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
