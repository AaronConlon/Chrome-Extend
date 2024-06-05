import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEbookDto } from './dto/create-ebook.dto';
import { UpdateEbookDto } from './dto/update-ebook.dto';
import { EbookService } from './ebook.service';

@Controller('ebook')
export class EbookController {
  constructor(private readonly ebookService: EbookService) {}

  @Post()
  create(@Body() createEbookDto: CreateEbookDto) {
    return this.ebookService.create(createEbookDto);
  }

  @Get()
  findAll() {
    return this.ebookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const ebook = this.ebookService.findOne(+id);
    if (!ebook) {
      throw new NotFoundException(`EBook with ID ${id} not found`);
    }
    return ebook;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEbookDto: UpdateEbookDto) {
    return this.ebookService.update(+id, updateEbookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ebookService.remove(+id);
  }
}
