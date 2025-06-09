import { Controller, Post, Body, NotFoundException, Param, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransferTypeLabel } from 'src/shared/enum/enum';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @Post()
  async create(@Body() dto: CreateTransactionDto): Promise<void> {
    await this.transactionService.create(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const transaction = await this.transactionService.findById(id);
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return {
      transactionExternalId: transaction.id,
      transactionType: {
        name: TransferTypeLabel[transaction.tranferTypeId],
      },
      transactionStatus: {
        name: transaction.status,
      },
      value: transaction.value,
      createdAt: transaction.createdAt,
    };
  }
}