import { IsEnum, IsPositive, IsUUID } from 'class-validator';
import { TransferType } from 'src/shared/enum/enum';

export class CreateTransactionDto {
  @IsUUID()
  accountExternalIdDebit: string;

  @IsUUID()
  accountExternalIdCredit: string;

  @IsEnum(TransferType)
  tranferTypeId: number;

  @IsPositive()
  value: number
}