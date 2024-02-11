import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Transacao, Prisma } from '@prisma/client';

@Injectable()
export class TransacoesService {
  constructor(private prisma: PrismaService) {}

  async createTransacao(data: Prisma.TransacaoCreateInput): Promise<Transacao> {
    return this.prisma.transacao.create({
      data,
    });
  }
}
