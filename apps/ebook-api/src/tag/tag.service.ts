import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    // check if tag already exists
    const tag = await this.prisma.tag.findFirst({
      where: {
        name: createTagDto.name,
      },
    });

    if (tag) {
      throw new Error('Tag already exists');
    }

    return this.prisma.tag.create({
      data: createTagDto,
    });
  }

  findAll() {
    return this.prisma.tag.findMany();
  }

  findOne(name: string) {
    return this.prisma.tag.findFirst({
      where: {
        name,
      },
    });
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return this.prisma.tag.update({
      where: { id },
      data: updateTagDto,
    });
  }

  remove(id: number) {
    return this.prisma.tag.delete({
      where: { id },
    });
  }
}
