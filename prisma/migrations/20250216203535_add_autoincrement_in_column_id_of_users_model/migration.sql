-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE user_id_seq OWNED BY "user"."id";
