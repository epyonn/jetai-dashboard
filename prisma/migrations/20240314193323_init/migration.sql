-- CreateTable
CREATE TABLE "Jet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "wingspan" DOUBLE PRECISION NOT NULL,
    "engines" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Jet_pkey" PRIMARY KEY ("id")
);
