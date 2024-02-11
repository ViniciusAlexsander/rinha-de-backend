import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TransacaoController } from './transacoes.controller';
import { TransacoesService } from './transacoes.service';
import { ClientesService } from 'src/clientes/cliente.service';

@Module({
  imports: [],
  controllers: [TransacaoController],
  providers: [PrismaService, TransacoesService, ClientesService],
  exports: [TransacoesService],
})
export class TransacoesModule {}
