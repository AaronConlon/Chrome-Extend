import { Module } from '@nestjs/common';
import { EbookModule } from './ebook/ebook.module';


@Module({
  imports: [EbookModule],
})
export class AppModule {}
