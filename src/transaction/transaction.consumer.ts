import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionService } from './transaction.service';

@Controller()
export class TransactionConsumer {
  constructor(private readonly transactionService: TransactionService) {}

  @MessagePattern('transaction.created')
  async handleTransactionCreated(@Payload() message: any) {
    console.log('[Kafka] Recibido:', message);
    const status = message.value > 1000 ? 'rejected' : 'approved';
    await this.transactionService.updateStatus(message.id, status);
    console.log(`[Kafka] Transacción ${message.id} ${status}`);
  }
}