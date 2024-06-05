import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEbookDto } from './dto/create-ebook.dto';
import { UpdateEbookDto } from './dto/update-ebook.dto';

@Injectable()
export class EbookService {
  constructor(private prisma: PrismaService) {}

  async create(createEbookDto: CreateEbookDto) {
    console.log('create ebook dto:', createEbookDto);
    const { title, author, description, cover, downloadLinks, tags } =
      createEbookDto;
    const data: any = {
      title,
      author,
      description,
      cover,
      downloadLinks: {
        create: downloadLinks.map((link) => ({
          url: link.url,
          description: link.description,
        })),
      },
      tags: {
        connectOrCreate: tags?.map((name) => ({
          Tag: {
            connectOrCreate: {
              where: { name },
              create: { name },
            },
          },
        })),
      },
    };
    return this.prisma.eBook.create({ data });
  }

  findAll() {
    return `This action returns all ebook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ebook`;
  }

  update(id: number, updateEbookDto: UpdateEbookDto) {
    return `This action updates a #${id} ebook`;
  }

  remove(id: number) {
    return `This action removes a #${id} ebook`;
  }
}
