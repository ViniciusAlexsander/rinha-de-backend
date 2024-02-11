import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/cliente.module';
import { PrismaService } from './prisma.service';
import { TransacoesModule } from './transacoes/transacoes.module';

@Module({
  imports: [ConfigModule.forRoot(), TransacoesModule, ClientesModule],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
