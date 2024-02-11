import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Cliente, Prisma, Transacao } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async createTransacao(data: Prisma.TransacaoCreateInput): Promise<Transacao> {
    return this.prisma.transacao.create({
      data,
    });
  }

  async listTransacoes(
    where: Prisma.TransacaoWhereInput,
  ): Promise<
    { valor: number; realizada_em: Date; descricao: string; tipo: string }[]
  > {
    return this.prisma.transacao.findMany({
      select: {
        valor: true,
        tipo: true,
        descricao: true,
        realizada_em: true,
      },
      orderBy: {
        realizada_em: 'desc',
      },
      take: 10,
      where,
    });
  }

  async updateCliente(params: {
    where: Prisma.ClienteWhereUniqueInput;
    data: Prisma.ClienteUpdateInput;
  }): Promise<Cliente> {
    const { data, where } = params;
    return this.prisma.cliente.update({
      data,
      where,
    });
  }

  async findCliente(params: {
    where: Prisma.ClienteWhereUniqueInput;
  }): Promise<Cliente> {
    const { where } = params;
    return this.prisma.cliente.findFirst({
      where,
    });
  }
}
