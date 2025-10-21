import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FieldsService } from '../fields.service';
import { CreateFieldDto } from '../dto/create-field.dto';
import { UpdateFieldDto } from '../dto/update-field.dto';

@Controller('admin/fields')
export class AdminFieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Post()
  create(@Body() createFieldDto: CreateFieldDto) {
    return this.fieldsService.create(createFieldDto);
  }

  @Get()
  findAll(
    @Query('active') active?: boolean,
    @Query('sportId') sportId?: number
  ) {
    return this.fieldsService.findAll(active, sportId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fieldsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFieldDto: UpdateFieldDto) {
    return this.fieldsService.update(+id, updateFieldDto);
  }

  @Delete('bulk')
  removeMany(@Body() ids: number[]) {
    return this.fieldsService.removeMany(ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fieldsService.remove(+id);
  }

  @Post('reorder')
  reorder(@Body() orders: { [key: number]: number }[]) {
    return this.fieldsService.reorder(orders);
  }
}
