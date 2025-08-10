import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { AppointmentService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  async findAll() {
    return await this.appointmentService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateAppointmentDto) {
    return await this.appointmentService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const result = await this.appointmentService.delete(id);
    if (!result) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return { message: 'Appointment deleted successfully' };
  }
}
