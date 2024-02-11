import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ClientesService } from './cliente.service';

@Module({
  imports: [],
  providers: [PrismaService, ClientesService],
  exports: [ClientesService],
})
export class ClientesModule {}
