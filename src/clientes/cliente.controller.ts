import { Controller } from '@nestjs/common';
import { ClientesService } from './cliente.service';

@Controller()
export class ClientesController {
  constructor(private readonly transacoesService: ClientesService) {}
}
