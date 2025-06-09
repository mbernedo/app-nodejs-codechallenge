import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { TransactionConsumer } from './transaction.consumer';
import { KafkaModule } from 'src/shared/kafka/kafka.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    KafkaModule
  ],
  controllers: [
    TransactionController,
    TransactionConsumer
  ],
  providers: [TransactionService]
})
export class TransactionModule { }
