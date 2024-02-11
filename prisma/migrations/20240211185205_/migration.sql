-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "limite" INTEGER NOT NULL,
    "saldo" INTEGER NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transacao" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "valor" INTEGER NOT NULL,
    "realizada_em" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Transacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
