-- CreateTable
CREATE TABLE "material" (
    "id" VARCHAR(36) NOT NULL,
    "code" SERIAL NOT NULL,
    "material_name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brand" (
    "id" VARCHAR(36) NOT NULL,
    "code" SERIAL NOT NULL,
    "brand_name" VARCHAR(255) NOT NULL,
    "materialId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grade" (
    "id" VARCHAR(36) NOT NULL,
    "code" SERIAL NOT NULL,
    "grade_name" VARCHAR(255) NOT NULL,
    "brandId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "grade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "material_code_key" ON "material"("code");

-- CreateIndex
CREATE INDEX "material_code_idx" ON "material"("code");

-- CreateIndex
CREATE UNIQUE INDEX "brand_code_key" ON "brand"("code");

-- CreateIndex
CREATE INDEX "brand_code_idx" ON "brand"("code");

-- CreateIndex
CREATE INDEX "brand_materialId_idx" ON "brand"("materialId");

-- CreateIndex
CREATE INDEX "grade_code_idx" ON "grade"("code");

-- CreateIndex
CREATE INDEX "grade_brandId_idx" ON "grade"("brandId");

-- AddForeignKey
ALTER TABLE "brand" ADD CONSTRAINT "brand_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grade" ADD CONSTRAINT "grade_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
