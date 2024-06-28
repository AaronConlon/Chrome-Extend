import { Module } from '@nestjs/common';
import { EbookModule } from './ebook/ebook.module';
import { TagModule } from './tag/tag.module';


@Module({
  imports: [EbookModule, TagModule],
})
export class AppModule {}
