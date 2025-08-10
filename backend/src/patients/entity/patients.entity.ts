import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from '../../appointments/entity/appointment.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @OneToMany(() => Appointment, appointment => appointment.patient)
  appointments: Appointment[];
}
