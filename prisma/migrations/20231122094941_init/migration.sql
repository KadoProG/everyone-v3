-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "githubAccountId" TEXT NOT NULL,
    "firstStudentNo" INTEGER NOT NULL,
    "studentFavorites" INTEGER[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_githubAccountId_key" ON "User"("githubAccountId");
