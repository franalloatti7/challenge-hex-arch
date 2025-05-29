-- CreateTable
CREATE TABLE "company" (
    "id" UUID NOT NULL,
    "cuit" VARCHAR(13) NOT NULL,
    "companyName" VARCHAR(50) NOT NULL,
    "adhesionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transfer" (
    "id" UUID NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "debitAccount" VARCHAR(22) NOT NULL,
    "creditAccount" VARCHAR(22) NOT NULL,
    "companyId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transfer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_cuit_key" ON "company"("cuit");

-- CreateIndex
CREATE UNIQUE INDEX "company_companyName_key" ON "company"("companyName");

-- AddForeignKey
ALTER TABLE "transfer" ADD CONSTRAINT "transfer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
