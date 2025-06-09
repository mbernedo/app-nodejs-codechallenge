export enum TransferType {
  TRANSFER = 1,
  PAYMENT = 2,
  REFUND = 3,
  WITHDRAWAL = 4
}

export const TransferTypeLabel = {
  [TransferType.TRANSFER]: 'transfer',
  [TransferType.PAYMENT]: 'payment', 
  [TransferType.REFUND]: 'refund',
  [TransferType.WITHDRAWAL]: 'withdrawal',
} as const;