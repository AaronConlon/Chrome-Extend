import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ParsePaginationPipe } from '../shared/pipe';
import { CreateEbookDto } from './dto/create-ebook.dto';
import { QueryEbookDto } from './dto/find-ebook.dto';
import { UpdateEbookDto } from './dto/update-ebook.dto';
import { EbookService } from './ebook.service';

@Controller('ebook')
export class EbookController {
  constructor(private readonly ebookService: EbookService) {}

  @Post()
  async create(@Body() createEbookDto: CreateEbookDto) {
    await this.ebookService.create(createEbookDto);
    return { message: 'Ebook created successfully' };
  }

  @Get()
  findAll(@Query(new ParsePaginationPipe()) pagination: QueryEbookDto) {
    return this.ebookService.findAll(pagination);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const ebook = await this.ebookService.findOne(+id);
    console.log('ebook:', id, ebook);
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
