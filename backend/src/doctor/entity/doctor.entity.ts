import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from '../../appointments/entity/appointment.entity';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  specialization: string;

  @Column({ length: 10 })
  gender: string;

  @Column({ length: 10 })
  startTime: string; // HH:mm format

  @Column({ length: 10 })
  endTime: string; // HH:mm format

  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointments: Appointment[];
}
