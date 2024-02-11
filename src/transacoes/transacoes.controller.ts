import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ClientesService } from 'src/clientes/cliente.service';
import { TransacoesService } from './transacoes.service';

@Controller()
export class TransacaoController {
  constructor(
    private readonly transacoesService: TransacoesService,
    private readonly clientesService: ClientesService,
  ) {}

  @Post('/clientes/:id/transacoes')
  async createTransacao(
    @Body() postData: { valor: number; tipo: string; descricao: string },
    @Param('id') id: string,
  ): Promise<{
    limite: number;
    saldo: number;
  }> {
    const { descricao, tipo, valor } = postData;

    const clienteExiste = await this.clientesService.findCliente({
      where: {
        id: Number(id),
      },
    });

    if (!clienteExiste) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    let novoLimite = clienteExiste.limite;
    let novoSaldo = clienteExiste.saldo;

    if (tipo === 'd') {
      if (clienteExiste.saldo + valor >= 0)
        novoSaldo = clienteExiste.saldo + valor;
      else
        throw new HttpException(
          'UNPROCESSABLE_ENTITY',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
    }

    if (tipo === 'c') {
      novoLimite = clienteExiste.limite + valor;
    }

    await this.clientesService.updateCliente({
      data: {
        limite: novoLimite,
        saldo: novoSaldo,
      },
      where: {
        id: Number(id),
      },
    });

    await this.transacoesService.createTransacao({
      cliente: {
        connect: {
          id: Number(id),
        },
      },
      realizada_em: new Date(),
      tipo,
      valor,
      descricao,
    });

    return {
      limite: novoLimite,
      saldo: novoSaldo,
    };
  }
}
