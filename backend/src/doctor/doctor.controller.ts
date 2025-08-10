import { Controller, Get, Delete, Post, NotFoundException, ParseIntPipe, Param, Body,Patch } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto'

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }
  @Get()
  async findAll() {
    return await this.doctorService.findAll();
  }
  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    const doctor = await this.doctorService.create(createDoctorDto);
    return doctor;
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const result = await this.doctorService.delete(id);
    if (!result) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return { message: 'Doctor deleted successfully' };
  }
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDoctorDto: Partial<CreateDoctorDto>
  ) {
    const doctor = await this.doctorService.update(id, updateDoctorDto as any);
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return doctor;
  }


}