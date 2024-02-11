import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Cliente, Prisma } from '@prisma/client';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

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
