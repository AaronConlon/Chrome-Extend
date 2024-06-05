import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EbookController } from './ebook.controller';
import { EbookService } from './ebook.service';

@Module({
  controllers: [EbookController],
  providers: [PrismaService, EbookService],
})
export class EbookModule {}
