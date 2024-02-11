import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/clientes/:id/transacoes')
  async createTransacao(
    @Body() postData: { valor: number; tipo: string; descricao: string },
    @Param('id') id: string,
  ): Promise<{
    limite: number;
    saldo: number;
  }> {
    const { descricao, tipo, valor } = postData;

    const clienteExiste = await this.appService.findCliente({
      where: {
        id: Number(id),
      },
    });

    if (!clienteExiste) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
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

    await this.appService.updateCliente({
      data: {
        limite: novoLimite,
        saldo: novoSaldo,
      },
      where: {
        id: Number(id),
      },
    });

    await this.appService.createTransacao({
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

  @Get('/clientes/:id/extrato')
  async getExtrato(@Param('id') id: string): Promise<IExtratoResponse> {
    const clienteExiste = await this.appService.findCliente({
      where: {
        id: Number(id),
      },
    });

    if (!clienteExiste) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const ultimasTransacoes = await this.appService.listTransacoes({
      client_id: Number(id),
    });

    return {
      saldo: {
        data_extrato: new Date(),
        limite: clienteExiste.limite,
        total: clienteExiste.saldo,
      },
      ultimas_transacoes: ultimasTransacoes,
    } as IExtratoResponse;
  }
}

interface IExtratoResponse {
  saldo: {
    total: number;
    data_extrato: Date;
    limite: number;
  };
  ultimas_transacoes: {
    valor: number;
    tipo: 'c' | 'd';
    descricao: string;
    realizada_em: Date;
  }[];
}
