import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from '../../appointments/entity/appointment.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 10 })
  gender: string;

  @Column({ length: 15 })
  phone: string;

  @OneToMany(() => Appointment, appointment => appointment.patient)
  appointments: Appointment[];
}
