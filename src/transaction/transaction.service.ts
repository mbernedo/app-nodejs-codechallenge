import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { KafkaProducerService } from 'src/shared/kafka/kafka.producer';
@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    readonly transactionRepository: Repository<Transaction>,
    readonly kafkaProducer: KafkaProducerService
  ) { }

  async create(dto: CreateTransactionDto): Promise<void> {
    const transaction = this.transactionRepository.create({
      ...dto
    });
    const savedTransaction = await this.transactionRepository.save(transaction);
    await this.kafkaProducer.emit('transaction.created', {
      id: savedTransaction.id,
      value: savedTransaction.value,
      accountExternalIdDebit: savedTransaction.accountExternalIdDebit,
      accountExternalIdCredit: savedTransaction.accountExternalIdCredit,
      tranferTypeId: savedTransaction.tranferTypeId,
    });
  }

  async findById(id: string) {
    return this.transactionRepository.findOneBy({ id });
  }

  async updateStatus(id: string, status: string): Promise<void> {
    await this.transactionRepository.update(id, { status });
  }
}