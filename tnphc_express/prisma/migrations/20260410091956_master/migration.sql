-- CreateTable
CREATE TABLE "Master" (
    "id" VARCHAR(36) NOT NULL,
    "code" SERIAL NOT NULL,
    "brandId" TEXT NOT NULL,
    "gradeId" TEXT NOT NULL,
    "material_name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Master_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Master_code_key" ON "Master"("code");

-- CreateIndex
CREATE INDEX "Master_brandId_idx" ON "Master"("brandId");

-- CreateIndex
CREATE INDEX "Master_gradeId_idx" ON "Master"("gradeId");

-- AddForeignKey
ALTER TABLE "Master" ADD CONSTRAINT "Master_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Master" ADD CONSTRAINT "Master_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
