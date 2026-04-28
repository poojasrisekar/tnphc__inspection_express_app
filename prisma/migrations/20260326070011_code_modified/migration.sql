-- AlterTable
CREATE SEQUENCE roles_code_seq;
ALTER TABLE "Roles" ALTER COLUMN "code" SET DEFAULT nextval('roles_code_seq');
ALTER SEQUENCE roles_code_seq OWNED BY "Roles"."code";
